import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import highringImg from "../data/highring-b.webp";

const projects = [
  {
    id: 1,
    number: "001 ",
    title: " HIGHRING PLATFORM",
    client: " RECRUITMENT AGENCY",
    image: highringImg,
  },
  {
    id: 2,
    number: "002",
    title: "RESCUE QUIZ",
    client: "PROJECT",
    image:
      "https://images.pexels.com/photos/28271058/pexels-photo-28271058.jpeg",
  },
  {
    id: 3,
    number: "003",
    title: "MEAL RECIPES",
    client: "PROJECT",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  },
  {
    id: 4,
    number: "004",
    title: "WEB SUMMARY",
    client: "CHROME EXTENSION",
    image: "https://images.pexels.com/photos/7439124/pexels-photo-7439124.jpeg",
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
        <h2 className="text-[10px] tracking-[0.3em] uppercase mb-6 mt-12 text-[#f6f6f6] font-bold">
          PROJECTS
        </h2>
        <nav className="-space-y-0">
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
                  className={`text-2xl font-medium tracking-wider transition-all duration-500 ${
                    activeProject === index ? "scale-110" : ""
                  }`}
                >
                  {project.number}
                </span>
                <div className="flex-1">
                  <span
                    className={`block text-sm tracking-[0.15em] uppercase font-medium transition-all duration-500 ${
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
                <span className="text-xl font-medium tracking-wider text-gray-400">
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
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-24 w-[90%] max-w-md mx-auto object-cover transition-all duration-700 brightness-50 ${
                        activeProject === index ? "grayscale-0" : "grayscale"
                      }`}
                      loading="lazy"
                    />
                    {/* Overlay noir toujours présent */}
                    <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" />
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                    activeProject === index ? "opacity-0" : "opacity-20"
                  }`}
                />

                {/* Minimalist Circle with Arrow */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                    activeProject === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  {/* SVG Circle that draws itself */}
                  <div className="relative w-20 h-20">
                    <svg
                      className="absolute inset-0 -rotate-90"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="1"
                        className={`text-[#f6f6f6] transition-[stroke-dashoffset,opacity] duration-1000 ease-in-out [stroke-dasharray:240] ${
                          activeProject === index
                            ? "[stroke-dashoffset:0] opacity-30"
                            : "[stroke-dashoffset:240] opacity-0"
                        }`}
                      />
                    </svg>

                    {/* Arrow in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`transition-all duration-500 delay-300 ${
                          activeProject === index
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90"
                        }`}
                      >
                        <span className="text-[#f6f6f6] text-xs leading-none flex items-center justify-center">
                          ⊹
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Number Overlay (large) */}
              <div
                className={`hidden md:block absolute -top-8 -left-8 text-[120px] font-medium leading-none transition-all duration-700 pointer-events-none text-[#f6f6f6] ${
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
          className="flex flex-col items-center gap-4"
          style={{ writingMode: "vertical-rl" }}
        >
          <div>
            SCROLL TO EXPLORE
            <span className="inline-block animate-bounce m-3" aria-hidden>
              <ArrowDown size={12} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
