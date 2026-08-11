import Navbar from "@/components/Navbar";
import StackSection from "@/components/StackSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <StackSection id="home" index={0}>
          <Hero />
        </StackSection>
        <StackSection id="about" index={1}>
          <About />
        </StackSection>
        <StackSection id="stack" index={2}>
          <Stack />
        </StackSection>
        <StackSection id="services" index={3} overflowHidden={false}>
          <Services />
        </StackSection>
        <StackSection id="projects" index={4}>
          <Projects />
        </StackSection>
        <StackSection id="contact" index={5}>
          <Contact />
        </StackSection>
      </main>
    </>
  );
}
