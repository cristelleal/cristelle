import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import highringImg from "../data/highring-b.webp";

const projects = [
  {
    id: 1,
    number: "001",
    title: "HIGHRING PLATFORM",
    client: "RECRUITMENT AGENCY",
    image: highringImg,
    color: "#C4B5A0",
  },
  {
    id: 2,
    number: "002",
    title: "RESCUE QUIZ",
    client: "PROJECT",
    image:
      "https://images.pexels.com/photos/28271058/pexels-photo-28271058.jpeg",
    color: "#7B9FAD",
  },
  {
    id: 3,
    number: "003",
    title: "MEAL RECIPES",
    client: "PROJECT",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    color: "#8B9BA3", // Gris-bleu
  },
  {
    id: 4,
    number: "004",
    title: "WEB SUMMARY",
    client: "CHROME EXTENSION",
    image: "https://images.pexels.com/photos/7439124/pexels-photo-7439124.jpeg",
    color: "#6B5D56", // Marron
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
      className="relative min-h-screen h-full pt-28 md:pt-32 pb-16 md:pb-24 px-0 md:px-12 bg-[#f6f6f6] md:bg-black text-black md:text-[#f6f6f6] overflow-hidden"
    >
      {/* Sidebar Navigation Desktop */}
      <aside
        className={`hidden md:block fixed left-12 top-32 w-72 transition-opacity duration-500 ${
          showNavigation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <h2 className="text-[10px] tracking-[0.3em] uppercase mb-6 mt-14 text-[#f6f6f6] font-bold">
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

      {/* Main Content */}
      <div className="flex flex-col w-full md:max-w-2xl md:mx-auto space-y-0 md:space-y-2 md:ml-96 md:mt-32 px-4 md:px-0">
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
              onClick={() =>
                setActiveProject(activeProject === index ? null : index)
              }
            >
              {/* Mobile Header */}
              <div className="md:hidden px-4 sm:px-6 mb-1.5">
                <div className="flex items-center gap-2">
                  {/* Carré de couleur - plus petit */}
                  <div
                    className="w-4 h-4 flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Numéro - plus petit */}
                  <span className="text-base font-light tracking-wide text-gray-600">
                    {project.number}
                  </span>

                  {/* Ligne horizontale - plus fine */}
                  <div className="flex-1 h-[0.5px] bg-gray-300" />

                  {/* Titre - plus petit et compact */}
                  <h3 className="text-[11px] font-medium tracking-tight uppercase text-black whitespace-nowrap">
                    {project.title}
                  </h3>
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
                      className={`w-full md:h-24 md:w-[90%] md:max-w-md md:mx-auto object-cover transition-all duration-700 
                        ${
                          activeProject === index
                            ? "grayscale-0 brightness-100"
                            : "grayscale brightness-75"
                        }
                        h-24 sm:h-28`}
                      loading="lazy"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-20 md:opacity-40 pointer-events-none" />
                  </div>
                </div>

                {/* Hover Overlay - Desktop only */}
                <div
                  className={`hidden md:block absolute inset-0 bg-black transition-opacity duration-700 ${
                    activeProject === index ? "opacity-0" : "opacity-20"
                  }`}
                />

                {/* Circle with Arrow - Desktop only */}
                <div
                  className={`hidden md:flex absolute inset-0 items-center justify-center transition-all duration-700 ${
                    activeProject === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
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

              {/* Project Number Overlay - Desktop only */}
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

            {/* Espacement entre les projets - Mobile only */}
            {index < projects.length - 1 && (
              <div className="md:hidden h-6 sm:h-8" />
            )}
          </div>
        ))}
      </div>

      {/* Scroll Indicator - Desktop */}
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

      {/* Mobile Scroll Indicator */}
      <div
        className={`md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          showNavigation && visibleImages.length < projects.length
            ? "opacity-40"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.4em] uppercase text-black">
            SCROLL
          </span>
          <div className="animate-bounce">
            <ArrowDown size={14} className="text-black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
