import Hero from '@/components/sections/Hero';
import { HowWeWork, ProductsSection, ServicesSection, WorkSection } from '@/components/sections/HomeSections';
import CallToAction from '@/components/sections/CallToAction';
import { getProducts, toCard } from '@/content/projects';
import { featuredWork, moreWork } from '@/content/home';
import { HOW_WE_WORK, SERVICES, serviceExamples } from '@/content/services';

// Products first (Kidus, 2026-10-31): the products and where each stands, then the client work that proves we ship,
// then what we build to order, how we work, and how to reach us (docs/05-CONTENT-TONE-GUIDE.md, "Home").
export default function Home() {
  const products = getProducts().map(toCard);
  const services = SERVICES.map((service) => ({ ...service, exampleLinks: serviceExamples(service) }));

  return (
    <>
      <Hero products={products} />
      <ProductsSection products={products} />
      <WorkSection featured={featuredWork()} more={moreWork()} />
      <ServicesSection services={services} />
      <HowWeWork steps={HOW_WE_WORK} />
      <CallToAction secondary={{ href: '/work', label: 'See Client Work' }} />
    </>
  );
}
