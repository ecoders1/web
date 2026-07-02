import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default async function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
