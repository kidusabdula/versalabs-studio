import AboutClient from '@/components/about/AboutClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'VersaLabs Studio is a small software studio in Addis Ababa. Meet the team and see how we design, build and ship business software.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
