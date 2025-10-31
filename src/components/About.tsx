import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
  { icon: Github, label: "Github", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" }
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
      className="min-h-screen flex items-center px-6 md:px-12 py-24"
    >
      <div className="max-w-3xl mx-auto w-full">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-sm tracking-widest uppercase mb-16 opacity-60">
            About
          </h2>
          
          <div className="space-y-12">
            <p className="text-3xl md:text-4xl font-light tracking-tight leading-relaxed">
              I'm a frontend developer specialized in creating minimal, elegant and performant web experiences. I focus on clean code, attention to detail, and user-centric design.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-border">
              <div>
                <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">
                  Expertise
                </h3>
                <ul className="space-y-2 text-sm tracking-wide">
                  <li>React & TypeScript</li>
                  <li>Next.js & Tailwind CSS</li>
                  <li>NestJS & NodeJS</li>
                  <li>Responsive design</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">
                  Contact
                </h3>
                <div className="space-y-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
                    >
                      <social.icon className="w-4 h-4" />
                      <span>{social.label}</span>
                    </a>
                  ))}
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
