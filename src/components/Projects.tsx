import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    number: "001",
    title: "E-COMMERCE PLATFORM",
    client: "RETAIL CO",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    number: "002",
    title: "AGENCY PORTFOLIO",
    client: "CREATIVE STUDIO",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    number: "003",
    title: "SAAS DASHBOARD",
    client: "TECH STARTUP",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    number: "004",
    title: "BLOG PLATFORM",
    client: "MEDIA COMPANY",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    number: "005",
    title: "MOBILE APP",
    client: "FITNESS BRAND",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = imageRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12">
      {/* Sidebar */}
      <aside className="hidden md:block fixed left-12 top-32 w-64">
        <h2 className="text-xs tracking-widest uppercase mb-8 flex items-center gap-2">
          PROJECTS
          <span className="text-muted-foreground">→</span>
        </h2>

        <ul className="space-y-2">
          {projects.map((project, index) => (
            <li key={project.id}>
              <button
                onClick={() => setActiveProject(index)}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
                className={`text-left w-full transition-opacity duration-300 ${
                  activeProject === index
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <span className="block text-xs tracking-wider mb-1">
                  {project.number}
                </span>
                <span className="block text-sm tracking-wide uppercase font-medium">
                  {project.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Centred images column */}
      <div className="flex flex-col items-center justify-center mx-auto max-w-md space-y-3 mt-24">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`transition-all duration-1000 w-full max-w-md ${
              visibleImages.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div
              className="relative w-full h-24 overflow-hidden"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <img
                src={project.image}
                alt={project.title}
                className={`h-full object-cover grayscale transition-all duration-700 ease-out transform mx-auto ${
                  activeProject === index ? "scale-x-110" : "scale-x-100"
                }`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;