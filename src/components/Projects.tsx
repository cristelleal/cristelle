import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import highringImg from "../data/highring-b.webp";

const projects = [
  {
    id: 1,
    number: "01",
    title: "Highring Platform",
    type: "Recruitment SaaS",
    year: "2024",
    image: highringImg,
  },
  {
    id: 2,
    number: "02",
    title: "Rescue Quiz",
    type: "Educational App",
    year: "2024",
    image:
      "https://images.pexels.com/photos/28271058/pexels-photo-28271058.jpeg",
  },
  {
    id: 3,
    number: "03",
    title: "Meal Recipes",
    type: "Content Platform",
    year: "2023",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  },
  {
    id: 4,
    number: "04",
    title: "Web Summary",
    type: "Browser Extension",
    year: "2023",
    image: "https://images.pexels.com/photos/7439124/pexels-photo-7439124.jpeg",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-baseline justify-between pb-3">
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-xs tracking-wider text-neutral-400"></h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Projects List - Compact */}
        <div className="space-y-3">
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div
                key={project.id}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      {project.number}
                    </span>
                  </div>

                  {/* Title & Type */}
                  <div className="col-span-6 lg:col-span-7">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-base lg:text-lg font-light tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono ml-auto">
                          {project.year}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Image - Compact */}
                  <div className="col-span-5 lg:col-span-4">
                    <div className="relative h-20 overflow-hidden bg-neutral-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isActive ? "grayscale-0 scale-105" : "grayscale scale-100"
                        }`}
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div
                        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${
                          isActive ? "opacity-20" : "opacity-30"
                        }`}
                      />

                      {/* Hover Circle Effect */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-12 h-12">
                          {/* Background circle for better contrast */}
                          <div
                            className={`absolute inset-0 rounded-full bg-white/5 backdrop-blur-[2px] transition-opacity duration-300 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />

                          {/* SVG Circle with animation */}
                          <div
                            className={`absolute inset-0 transition-all duration-300 ${
                              isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                            }`}
                          >
                            <svg
                              className="absolute inset-0 -rotate-90"
                              viewBox="0 0 48 48"
                              fill="none"
                            >
                              <circle
                                cx="24"
                                cy="24"
                                r="22"
                                stroke="white"
                                strokeWidth="0.75"
                                strokeDasharray="138"
                                strokeDashoffset={isActive ? 0 : 138}
                                className="opacity-70 transition-[stroke-dashoffset] duration-700 ease-out"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-sm font-light tracking-wider">
                                ⊹
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < projects.length - 1 && (
                  <div className="h-px bg-neutral-200 mt-3" />
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator - Desktop only */}
        <div className="hidden lg:flex justify-center mt-12">
          <div className="animate-bounce text-neutral-400/60">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 6 L10 11 L15 6" />
              <path d="M5 10 L10 15 L15 10" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;