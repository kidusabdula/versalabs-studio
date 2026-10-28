import Link from 'next/link';
import { CONTACT_EMAIL, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy',
  description:
    'What VersaLabs Studio collects through this website, why, where it goes and how to reach us about it.',
  path: '/privacy',
});

// This notice describes what the code in this repository actually does: the
// contact form (src/app/api/contact/route.ts), analytics (src/app/layout.tsx)
// and hosting. When any of them change, update this page in the same commit.
// Google Analytics only loads when NEXT_PUBLIC_GA_ID is set at build time, so
// its paragraph appears only then.
const LAST_UPDATED = '26 October 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="flex flex-col gap-4 text-[16px] leading-[1.8] text-zinc-400">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const googleAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <div className="min-h-screen bg-[#0A0A0C] px-6 pt-40 pb-32">
      <article className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mb-4">Last updated {LAST_UPDATED}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Privacy Notice</h1>
        <p className="text-lg leading-relaxed text-zinc-400 mb-16">
          This page explains what VersaLabs Studio, a software studio in Addis Ababa, Ethiopia, collects through
          www.versalabs-studio.com, what we do with it and how to reach us about it. We keep it short because the site
          collects very little.
        </p>

        <Section title="The Contact Form">
          <p>
            When you send a message through the <Link href="/contact" className="text-white underline underline-offset-4 hover:text-zinc-300">contact page</Link>,
            we receive what you type: your name, your email address and your project details, plus your phone number,
            company, project type, budget range and how you heard about us if you fill those in.
          </p>
          <p>
            The site doesn&apos;t keep a copy. It sends your message as one email to the studio&apos;s own mailbox through
            our email provider, and the email stays in that mailbox. We read it to reply to you about your project. The
            site has no mailing list, and it passes your message to no other service.
          </p>
          <p>
            To stop the form being flooded, the server briefly keeps your IP address in memory to count how many
            messages come from it in 10 minutes. It isn&apos;t written to disk or stored in a database.
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            We use Vercel Web Analytics to count page views and see which pages people visit. It doesn&apos;t use cookies,
            and it doesn&apos;t identify you or follow you across other websites.
          </p>
          {googleAnalytics && (
            <p>
              We also use Google Analytics to understand how visitors use the site. Google Analytics sets cookies and
              sends data about your visit to Google.
            </p>
          )}
        </Section>

        <Section title="Cookies and Storage">
          <p>
            {googleAnalytics
              ? 'Apart from the Google Analytics cookies above, the site sets no cookies and stores nothing in your browser.'
              : 'The site sets no cookies and stores nothing in your browser.'}
          </p>
        </Section>

        <Section title="Hosting">
          <p>
            The site runs on Vercel. Like any web host, Vercel processes technical details of each request, such as your
            IP address and browser type, to deliver the pages and keep the service secure.
          </p>
        </Section>

        <Section title="Links to Other Sites">
          <p>
            Our pages link to live client sites, demos and our profiles on LinkedIn and Telegram. Those
            sites have their own privacy practices, which this notice doesn&apos;t cover.
          </p>
        </Section>

        <Section title="Your Questions and Requests">
          <p>
            To ask about a message you sent us, or to have it deleted, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-4 hover:text-zinc-300">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </article>
    </div>
  );
}
