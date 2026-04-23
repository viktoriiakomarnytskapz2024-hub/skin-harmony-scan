import { useEffect, useState } from "react";

const steps = [
  "AI is analyzing ingredients…",
  "Syncing with your Health Data (Sleep · Stress · Cycle)…",
  "Cross-checking with your skin profile…",
];

export const ProcessingScreen = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1700);
    const t3 = setTimeout(onDone, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="min-h-full glow-bg flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-2xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring" />
          <span className="absolute inset-4 rounded-full border border-primary/40 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
          <span className="absolute inset-8 rounded-full border-2 border-primary/50 animate-spin-slow" style={{ borderRightColor: "transparent", borderBottomColor: "transparent" }} />
          <div className="relative w-32 h-32 rounded-full glass flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_60px_hsl(218_60%_60%/0.6)] animate-pulse" />
          </div>
        </div>

        <h2 className="font-display text-3xl text-foreground mt-10">Analyze in progress</h2>

        <div className="mt-6 space-y-3 min-h-[120px] w-full max-w-xs">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`text-center text-sm transition-all duration-500 ${
                i <= step ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};