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
      className="min-h-screen flex items-center px-6 md:px-12 pt-0 md:pt-24 pb-16 md:pb-24 bg-[#f6f6f6]"
    >
      <div className="max-w-3xl mx-auto w-full text-center md:text-left">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-xs md:text-sm tracking-widest uppercase mb-6 md:mb-16 opacity-60">
            About
          </h2>

          <div className="space-y-6 md:space-y-12">
            <p className="text-lg sm:text-xl md:text-4xl font-light tracking-tight leading-relaxed">
              I’m a fullstack developer who believes great web experiences come
              from simplicity, precision, and empathy for the user. I focus on
              clean code, elegant interfaces, and performance that feels
              effortless.
            </p>

            <div className="flex justify-center md:block">
              <div className="grid grid-cols-2 gap-8 md:gap-0 pt-6 md:pt-8 border-t border-border w-full max-w-sm md:max-w-none">
                <div className="text-left">
                  <h3 className="text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 opacity-60">
                    Skills
                  </h3>
                  <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm tracking-wide">
                    <li>React & TypeScript</li>
                    <li>Next.js & Tailwind CSS</li>
                    <li>NestJS & Node.js</li>
                    <li>PostgreSQL & REST APIs</li>
                  </ul>
                </div>

                <div className="text-left">
                  <h3 className="text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 opacity-60">
                    Contact
                  </h3>
                  <div className="space-y-1.5 md:space-y-2">
                    {socials.map((social) => {
                      const displayUrl = social.href.startsWith("mailto:")
                        ? social.href.replace("mailto:", "")
                        : social.href
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "");

                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm hover:opacity-60 transition-opacity"
                        >
                          <social.icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span>{social.label}</span>
                          <span className="sr-only">{displayUrl}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
