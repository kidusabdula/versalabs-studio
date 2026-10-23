import { getAllProjects } from '@/config/project-database';
import ServicesClient from '@/components/services/ServicesClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Custom software, ERP implementation, e-commerce, AI tools and websites, designed and built by VersaLabs Studio in Addis Ababa.',
  path: '/services',
});

export default function ServicesPage() {
  const projects = getAllProjects();

  return <ServicesClient projects={projects} />;
}
