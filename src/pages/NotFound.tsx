import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );

    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff9f0] px-6 text-gray-800">
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-8xl font-light tracking-tighter text-gray-300">
          404
        </h1>
        <p className="mt-4 text-2xl font-light tracking-tight">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-600 transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;