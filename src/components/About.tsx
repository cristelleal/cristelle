import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { TwitterIcon } from "./icons/Twitter";

const socials = [
  { icon: MailIcon, label: "Email", href: "mailto:cristelleal@gmail.com" },
  { icon: GithubIcon, label: "Github", href: "https://github.com/cristelleal" },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cristelle-almodar/",
  },
  { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com/" },
];

const skills = [
  "React & TypeScript",
  "Next.js & Tailwind CSS",
  "NestJS & Node.js",
  "PostgreSQL & REST APIs",
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center px-6 py-12"
    >
      <div
        className={`w-full max-w-3xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-12">
          <h2 className="hidden md:block font-mono text-xs tracking-wider text-neutral-400">~/about</h2>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Bio */}
          <p className="text-xl lg:text-2xl font-light leading-relaxed tracking-tight text-neutral-800">
            I'm a fullstack developer who believes great web experiences come
            from simplicity, precision, and empathy for the user. I focus on
            clean code, elegant interfaces, and performance that feels
            effortless.
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-56 lg:gap-64 pt-8 border-t border-neutral-200">
            {/* Skills */}
            <div>
              <h3 className="font-mono text-xs tracking-wider mb-4 text-neutral-500">
                STACK
              </h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-sm text-neutral-700"
                  >
                    <span className="font-mono text-xs text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-mono text-xs tracking-wider mb-4 text-neutral-500">
                CONNECT
              </h3>
              <div className="space-y-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors group"
                  >
                    <social.icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;