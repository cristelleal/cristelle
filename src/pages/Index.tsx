import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero />
      <main>
        <Projects />
        <About />
      </main>
      <Contact />
    </div>
  );
};

export default Index;
