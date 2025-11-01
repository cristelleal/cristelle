import CA from "../data/CA.png";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-8 py-8">
      <div className="flex justify-between items-start">
        <img
          src={CA}
          alt="CA logo"
          className="inline-block w-40 h-40 -mt-20 md:-mt-14 -ml-8"
        />
        <Link
          to={isAboutPage ? "/" : "/about"}
          className="md:hidden text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-65 transition-all duration-300 mt-1 mr-4 font-semibold"
        >
          {isAboutPage ? "Home" : "About"}
        </Link>
      </div>
    </header>
  );
};

export default Hero;
