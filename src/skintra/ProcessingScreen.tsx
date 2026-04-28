import { useEffect, useState } from "react";

const steps = [
  "AI is analyzing ingredients…",
  "Syncing with your Health Data (Sleep · Stress · Cycle)…",
  "Cross-checking with your skin profile…",
];

export const ProcessingScreen = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 1900);
    const t3 = setTimeout(onDone, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="min-h-full glow-bg flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Position face</p>
      <h2 className="font-display text-3xl text-foreground mt-2">Analyze in progress</h2>

      <div className="relative mt-10 w-64 h-64">
        {/* corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
        ].map((c, i) => (
          <span key={i} className={`absolute w-9 h-9 border-primary/60 ${c}`} />
        ))}

        <div className="absolute inset-5 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, hsl(0 0% 100% / 0.95), hsl(214 60% 92% / 0.6) 55%, hsl(218 60% 80% / 0.3) 85%)",
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 100 100">
            {[20, 35, 50, 65, 80].map((cx) => (
              <ellipse key={cx} cx="50" cy="50" rx={Math.abs(50 - cx) || 4} ry="46"
                fill="none" stroke="hsl(218 60% 55%)" strokeOpacity="0.22" strokeWidth="0.4" />
            ))}
            {[20, 35, 50, 65, 80].map((cy) => (
              <ellipse key={cy} cx="50" cy="50" rx="46" ry={Math.abs(50 - cy) || 4}
                fill="none" stroke="hsl(218 60% 55%)" strokeOpacity="0.22" strokeWidth="0.4" />
            ))}
          </svg>
          <span className="absolute inset-2 rounded-full border-2 border-primary/40 border-t-transparent border-r-transparent animate-spin-slow" />
          <span className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring" />
        </div>

        {/* center icon */}
        <div className="absolute inset-0 m-auto w-14 h-14 rounded-2xl glass flex items-center justify-center">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-glow" />
        </div>
      </div>

      <div className="mt-8 space-y-2 min-h-[80px] w-full max-w-xs">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`text-center text-xs transition-all duration-500 ${
              i <= step ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            {s}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6 italic">AI is analyzing skin layers…</p>
    </div>
  );
};
