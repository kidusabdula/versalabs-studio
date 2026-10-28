import Hero from '@/components/sections/Hero';
import { ClientsSection, HowWeWork, ProductsSection, ServicesSection } from '@/components/sections/HomeSections';
import CallToAction from '@/components/sections/CallToAction';
import { getProjectsInSection, toCard } from '@/content/projects';
import { HOW_WE_WORK, SERVICES, clientLinks, serviceExamples } from '@/content/services';

// The home page reads like a product studio's front door: what we do, the
// products we sell, the services we offer with clients as examples, who we've
// worked with, how we work, and how to reach us
// (docs/05-CONTENT-TONE-GUIDE.md, "Home").
export default function Home() {
  const products = getProjectsInSection('products').map(toCard);
  const services = SERVICES.map((service) => ({ ...service, exampleLinks: serviceExamples(service) }));

  return (
    <>
      <Hero />
      <ProductsSection products={products} />
      <ServicesSection services={services} />
      <ClientsSection clients={clientLinks()} />
      <HowWeWork steps={HOW_WE_WORK} />
      <CallToAction />
    </>
  );
}
