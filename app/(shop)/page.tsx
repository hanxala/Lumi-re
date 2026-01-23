import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturesSection from '@/components/FeaturesSection';
import CategoriesSection from '@/components/CategoriesSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturesSection />
    </>
  );
}
