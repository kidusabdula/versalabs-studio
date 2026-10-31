import Link from 'next/link';
import { CONTACT_EMAIL, pageMetadata } from '@/lib/site';
import { CONTAINER, EYEBROW, H1, INLINE_LINK, LEAD } from '@/components/ui/styles';

export const metadata = pageMetadata({
  title: 'Privacy',
  description:
    'What VersaLabs Studio collects through this website, why, where it goes and how to reach us about it.',
  path: '/privacy',
});

// This notice describes what the code in this repository actually does: the
// contact form (src/app/api/contact/route.ts), analytics (src/app/layout.tsx),
// the theme switch (src/components/layout/ThemeToggle.tsx) and hosting. When
// any of them change, update this page in the same commit.
// Google Analytics only loads when NEXT_PUBLIC_GA_ID is set at build time, so
// its paragraph appears only then.
const LAST_UPDATED = '31 October 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
      <h2 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-foreground md:col-span-4">{title}</h2>
      <div className="flex flex-col gap-4 text-[16px] leading-[1.7] text-fg-3 md:col-span-8">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const googleAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <div className={`${CONTAINER} pt-12 pb-16 md:pt-20 md:pb-28`}>
      <article className="mx-auto max-w-4xl">
        <p className={EYEBROW}>Last updated {LAST_UPDATED}</p>
        <h1 className={`${H1} mt-5`}>Privacy Notice</h1>
        <p className={`${LEAD} mt-6 mb-14`}>
          This page explains what VersaLabs Studio, a software studio in Addis Ababa, Ethiopia, collects through
          www.versalabs-studio.com, what we do with it and how to reach us about it. We keep it short because the site
          collects very little.
        </p>

        <Section title="The Contact Form">
          <p>
            When you send a message through the <Link href="/contact" className={INLINE_LINK}>contact page</Link>,
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
              ? 'Apart from the Google Analytics cookies above, the site sets no cookies.'
              : 'The site sets no cookies.'}
          </p>
          <p>
            If you use the switch at the top of the page to choose the light or dark theme, your browser remembers that
            choice in its local storage, on your device, so the next page opens the same way. It holds only the word
            &ldquo;light&rdquo; or &ldquo;dark&rdquo;, it is never sent to us, and clearing your browser&apos;s site data
            removes it.
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
            <a href={`mailto:${CONTACT_EMAIL}`} className={INLINE_LINK}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </article>
    </div>
  );
}
