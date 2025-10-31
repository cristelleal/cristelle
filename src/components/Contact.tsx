import { useEffect, useState } from "react";

const Contact = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 px-6 md:px-12 py-8 pointer-events-none">
      <div className="flex justify-between items-center text-xs tracking-widest uppercase">
        <span className="opacity-60">♠ {now.getFullYear()}</span>
        <span className="opacity-60">
          {now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </div>
    </footer>
  );
};

export default Contact;
