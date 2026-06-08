import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { DEMO_PROJECTS } from "@/lib/data";
import type { Project } from "@/lib/data";

async function getProjects(): Promise<Project[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === "your-supabase-url") {
      return DEMO_PROJECTS;
    }
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEMO_PROJECTS;
    }
    return data as Project[];
  } catch {
    return DEMO_PROJECTS;
  }
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
