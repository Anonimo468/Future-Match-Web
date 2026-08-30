import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import HowItWorks from "@/components/home/HowItWorks";
import ExploreAreas from "@/components/home/ExploreAreas";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import CTABanner from "@/components/home/CTABanner";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="h-[130px]" />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <ExploreAreas />
      <About />
      <Testimonials />
      <Blog />
      <CTABanner />
      <Footer />
    </div>
  );
}
