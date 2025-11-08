import { useState } from "react";
import CA from "../data/CA.png";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-8 py-8">
        <div className="flex justify-between items-start">
          <img
            src={CA}
            alt="CA logo"
            className="inline-block w-40 h-40 -mt-20 md:-mt-14 -ml-8"
          />
          
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={toggleMenu}
            className="md:hidden mr-4 w-8 flex flex-col justify-center items-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-px bg-neutral-600 transition-all duration-300 ${
                isMenuOpen
                  ? "rotate-45 translate-y-[5px]"
                  : "group-hover:w-6"
              }`}
            />
            <span
              className={`w-5 h-px bg-neutral-600 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "group-hover:w-6"
              }`}
            />
            <span
              className={`w-5 h-px bg-neutral-600 transition-all duration-300 ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[5px]"
                  : "group-hover:w-6"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-neutral-50/95 backdrop-blur-md transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full flex items-center justify-center">
          <div
            className={`space-y-8 text-center transition-all duration-700 delay-100 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/"
              onClick={closeMenu}
              className={`block font-mono text-2xl tracking-wider transition-colors duration-300 ${
                !isAboutPage
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              ~/work
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`block font-mono text-2xl tracking-wider transition-colors duration-300 ${
                isAboutPage
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              ~/about
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Hero;