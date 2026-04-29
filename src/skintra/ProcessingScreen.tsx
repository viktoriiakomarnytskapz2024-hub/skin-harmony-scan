import { useEffect, useState } from "react";

const steps = [
  "Reading label text…",
  "Extracting ingredient list…",
  "Matching to your skin profile…",
];

const tokens = [
  "NIACINAMIDE",
  "GLYCERIN",
  "HYALURONIC ACID",
  "PANTHENOL",
  "ZINC PCA",
  "ALLANTOIN",
];

const lineWidths = [88, 72, 94, 65, 80, 58];

export const ProcessingScreen = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const [tokenIdx, setTokenIdx] = useState(0);

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

  useEffect(() => {
    const i = setInterval(() => setTokenIdx((v) => (v + 1) % tokens.length), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-full glow-bg flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Position product label</p>
      <h2 className="font-display text-3xl text-foreground mt-2">Decoding ingredients</h2>

      <div className="relative mt-10 w-60 h-72 max-w-[72%]">
        {/* corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
        ].map((c, i) => (
          <span key={i} className={`absolute w-9 h-9 border-primary/60 ${c}`} />
        ))}

        {/* OCR frame interior */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden glass-soft">
          <div className="absolute inset-0 px-5 py-6 flex flex-col justify-center gap-2.5">
            {lineWidths.map((w, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full bg-gradient-to-r from-primary/70 to-primary/30 animate-ocr-reveal"
                style={{
                  ["--ocr-w" as string]: `${w}%`,
                  animationDelay: `${i * 220}ms`,
                  width: 0,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-x-2 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_2px_hsl(var(--primary)/0.6)] animate-scan-sweep" />
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[10px] tracking-[0.25em] text-primary/80 font-mono">
              {tokens[tokenIdx]}
            </span>
          </div>
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

      <p className="text-xs text-muted-foreground mt-6 italic">AI is decoding ingredients…</p>
    </div>
  );
};
