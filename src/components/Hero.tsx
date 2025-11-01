import CA from "../data/CA.png";

const Hero = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-8 py-8">
      <div className="flex justify-between items-start">
        <img
          src={CA}
          alt="CA logo"
          className="inline-block w-40 h-40 -mt-20 md:-mt-14 -ml-8"
        />
      </div>
    </header>
  );
};

export default Hero;
