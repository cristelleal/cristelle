import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    number: "001 ",
    title: " E-COMMERCE PLATFORM",
    client: " RETAIL CO",
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
  const [showNavigation, setShowNavigation] = useState(true);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionBottom = sectionRect.bottom;
      const windowHeight = window.innerHeight;

      if (sectionBottom < windowHeight * 0.7) {
        setShowNavigation(false);
      } else {
        setShowNavigation(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-black text-[#f6f6f6]"
    >
      {/* Sidebar Navigation with mix-blend-mode for auto color inversion */}
      <aside
        className={`hidden md:block fixed left-12 top-32 w-72 transition-opacity duration-500 ${
          showNavigation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <h2 className="text-[10px] tracking-[0.3em] uppercase mb-6 mt-12 text-[#f6f6f6] font-light">
          PROJECTS
        </h2>
        <nav className="space-y-0">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
              className={`group text-left w-full transition-all duration-500 text-[#f6f6f6] ${
                activeProject === index
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={`text-2xl font-light tracking-wider transition-all duration-500 ${
                    activeProject === index ? "scale-110" : ""
                  }`}
                >
                  {project.number}
                </span>
                <div className="flex-1">
                  <span
                    className={`block text-sm tracking-[0.15em] uppercase font-light transition-all duration-500 ${
                      activeProject === index ? "translate-x-2" : ""
                    }`}
                  >
                    {project.title}
                  </span>
                  <span className="block text-[10px] tracking-[0.2em] uppercase opacity-70 mt-1">
                    {project.client}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content - Images */}
      <div className="flex flex-col items-center justify-center mx-auto max-w-2xl space-y-2 md:ml-96 mt-20">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`transition-all duration-1000 w-full ${
              visibleImages.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Mobile number display */}
              <div className="md:hidden flex items-center gap-3 mb-3">
                <span className="text-xl font-light tracking-wider text-gray-400">
                  {project.number}
                </span>
                <div>
                  <span className="block text-xs tracking-[0.15em] uppercase text-gray-300">
                    {project.title}
                  </span>
                  <span className="block text-[9px] tracking-[0.2em] uppercase text-gray-500 mt-0.5">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div
                  className={`transition-all duration-700 ease-out ${
                    activeProject === index ? "scale-105" : "scale-100"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`h-24 w-[90%] max-w-md mx-auto object-cover transition-all duration-700 ${
                      activeProject === index
                        ? "grayscale-0 brightness-100"
                        : "grayscale brightness-75"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                    activeProject === index ? "opacity-0" : "opacity-20"
                  }`}
                />

                {/* Hover Info */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    activeProject === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center">
                    <span className="inline-block px-6 py-2 border border-[#f6f6f6] text-[#f6f6f6] text-[10px] tracking-[0.3em] uppercase hover:bg-[#f2f2f2] hover:text-black transition-colors duration-300">
                      VIEW PROJECT
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Number Overlay (large) */}
              <div
                className={`hidden md:block absolute -top-8 -left-8 text-[120px] font-light leading-none transition-all duration-700 pointer-events-none text-[#f6f6f6] ${
                  activeProject === index
                    ? "opacity-20 scale-100"
                    : "opacity-0 scale-90"
                }`}
              >
                {project.number}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`hidden xl:block fixed right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.5em] uppercase text-[#f6f6f6] transition-opacity duration-500 ${
          showNavigation ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col gap-1 items-center"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL TO EXPLORE ➢
        </div>
      </div>
    </section>
  );
};

export default Projects;
