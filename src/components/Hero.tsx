const Hero = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-8 py-8">
      <div className="flex justify-between items-start">
        <img
          src="/public/CA.png"
          alt="CA logo"
          className="inline-block w-40 h-40 -mt-14 -ml-8"
        />

        <nav className="flex flex-col items-end gap-2 text-xs tracking-widest uppercase">
          <a href="#" className="hover:opacity-60 transition-opacity">
            DOWNLOAD RESUME
          </a>
          <a
            href="mailto:hello@example.com"
            className="hover:opacity-60 transition-opacity"
          >
            @YOURNAME.PRO
          </a>
          <a href="#about" className="hover:opacity-60 transition-opacity">
            ABOUT
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Hero;
