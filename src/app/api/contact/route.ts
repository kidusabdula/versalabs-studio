import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema, HONEYPOT_FIELD, PROJECT_TYPES, BUDGETS } from '@/lib/contact-schema';

// Best-effort rate limit: 5 messages per IP per 10 minutes. The map lives in
// one serverless instance, so a burst spread across instances can get past it;
// it stops casual repeat submissions, not a determined attacker.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Header values must stay on one line.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many messages from your network. Please wait a few minutes and try again.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots fill every field. Answer as if it worked, and send nothing.
  const trap = body?.[HONEYPOT_FIELD];
  if (typeof trap === 'string' && trap.trim() !== '') {
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      fields[key] ??= issue.message;
    }
    return NextResponse.json({ error: 'Please check the highlighted fields.', fields }, { status: 400 });
  }

  const { name, email, phone, enterprise, projectType, budget, scope, referral } = parsed.data;
  const projectLabel = projectType ? PROJECT_TYPES[projectType] : 'General';
  const budgetLabel = budget ? BUDGETS[budget] : 'Not specified';

  try {
    // Nodemailer transporter with the Yegara SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.versalabs-studio.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = (value: string) => escapeHtml(value || 'N/A');

    await transporter.sendMail({
      from: { name: oneLine(name), address: process.env.SMTP_USER ?? '' }, // Send FROM the authenticated user
      replyTo: { name: oneLine(name), address: email },
      to: process.env.SMTP_USER, // Send TO the authenticated user (or another inbox)
      subject: oneLine(`New Project Inquiry: ${projectLabel} - ${name} (${enterprise || 'No Company'})`),
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Enterprise/Company: ${enterprise || 'N/A'}
Project Type: ${projectLabel}
Budget Range: ${budgetLabel}
Referral: ${referral || 'N/A'}

Project Scope/Details:
${scope}
      `,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${html(name)}</p>
        <p><strong>Email:</strong> ${html(email)}</p>
        <p><strong>Phone:</strong> ${html(phone)}</p>
        <p><strong>Company:</strong> ${html(enterprise)}</p>
        <p><strong>Project Type:</strong> ${html(projectLabel)}</p>
        <p><strong>Budget Range:</strong> ${html(budgetLabel)}</p>
        <p><strong>Referral:</strong> ${html(referral)}</p>
        <br/>
        <h3>Project Scope/Details:</h3>
        <p>${escapeHtml(scope).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
