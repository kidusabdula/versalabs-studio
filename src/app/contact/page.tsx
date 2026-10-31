import ContactClient, { type ContactTopic } from '@/components/contact/ContactClient';
import { getAllProjects } from '@/content/projects';
import type { Project } from '@/content/schema';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Tell us about your business. Ask VersaLabs Studio for a product demo, or about a custom ERP, an online store, a website or an AI tool, and we will reply by email.',
  path: '/contact',
});

// The form's project type that fits a page's "Request a Demo", "Get Notified"
// or "Start a Similar Project" link. Anything unclear is "Custom / Other".
function projectTypeFor(project: Project): ContactTopic['projectType'] {
  if (project.industry.includes('E-Commerce')) return 'ecommerce';
  if (project.industry.some((industry) => industry === 'Cybersecurity' || industry === 'Online Safety')) return 'ai';
  if (project.section === 'products' && project.industry.some((i) => ['Made to Order', 'Import & Trade', 'Finance', 'Real Estate'].includes(i))) {
    return 'erp';
  }
  return 'custom';
}

export default function ContactPage() {
  const topics = Object.fromEntries(
    getAllProjects().map((project) => [project.slug, { title: project.title, projectType: projectTypeFor(project) }]),
  );
  return <ContactClient topics={topics} />;
}
