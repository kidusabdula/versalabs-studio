import BlogClient from '@/components/blog/BlogClient';
import { pageMetadata } from '@/lib/site';

// Placeholder until the blog has posts: kept out of the index and the sitemap.
export const metadata = pageMetadata({
  title: 'Blog',
  description: 'Articles from VersaLabs Studio on software architecture, AI development and building products in Ethiopia. Coming soon.',
  path: '/blog',
  noindex: true,
});

export default function BlogPage() {
  return <BlogClient />;
}
