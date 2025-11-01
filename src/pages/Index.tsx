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
        <div className="hidden md:block">
          <About />
        </div>
      </main>
      <div className="hidden md:block">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
