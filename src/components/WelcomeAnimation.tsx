import { useState, useEffect } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cubicEaseInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const WelcomeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let running = true;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      setProgress(Math.floor(cubicEaseInOut(progressValue) * 100));
      if (progressValue < 1 && running) {
        requestAnimationFrame(animate);
        return;
      }
      (async () => {
        await sleep(300);
        setIsExiting(true);
        await sleep(800);
        onComplete();
      })();
    };
    animate();
    return () => {
      running = false;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#f6f6f6] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting
          ? "opacity-0 scale-110 blur-md"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#d0d0d0"
              strokeWidth="0.5"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#888"
              strokeWidth="1"
              strokeDasharray={339}
              strokeDashoffset={339 - (339 * progress) / 100}
              strokeLinecap="round"

            />
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-extralight text-neutral-700 tracking-[0.18em] select-none">
            {progress}
          </span>
        </div>
        <p className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase mt-2 select-none">
          Welcome
        </p>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
