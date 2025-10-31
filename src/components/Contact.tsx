const Contact = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 px-6 md:px-12 py-8 pointer-events-none">
      <div className="flex justify-between items-center text-xs tracking-widest uppercase">
        <span className="opacity-60">
          ♥ {new Date().getFullYear()}</span>
        <span className="opacity-60">Fullstack Developer</span>
      </div>
    </footer>
  );
};

export default Contact;
