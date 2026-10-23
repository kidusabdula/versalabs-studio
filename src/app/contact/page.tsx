import ContactClient from '@/components/contact/ContactClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell us about your project. Send VersaLabs Studio a message about custom software, ERP, e-commerce or a website, and we will reply by email.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}
