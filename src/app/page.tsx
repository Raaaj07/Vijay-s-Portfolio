import Navbar from "@/components/Navbar";
import { ScrollRefresh } from "@/components/ScrollRefresh"; // ADD THIS IMPORT
import StackSection from "@/components/StackSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollRefresh />
      <main className="relative">
        <StackSection id="home" index={0}>
          <Hero />
        </StackSection>
        <StackSection id="about" index={1}>
          <About />
        </StackSection>
        <StackSection id="experience" index={2} overflowHidden={false}>
          <Experience />
        </StackSection>
        <StackSection id="stack" index={3}>
          <Stack />
        </StackSection>
        <StackSection id="services" index={4} overflowHidden={false}>
          <Services />
        </StackSection>
        <StackSection id="projects" index={5}>
          <Projects />
        </StackSection>
        <StackSection id="contact" index={6}>
          <Contact />
        </StackSection>
      </main>
    </>
  );
}