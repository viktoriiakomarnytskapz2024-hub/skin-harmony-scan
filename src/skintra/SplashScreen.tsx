import { ArrowRight } from "lucide-react";

export const SplashScreen = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <button
      onClick={onEnter}
      className="relative w-full min-h-full text-left overflow-hidden block"
    >
      {/* Aesthetic layered background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-sky)" }} />
      <div className="absolute inset-0 glow-bg" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-glow/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent" />

      {/* Centerpiece */}
      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-8 text-center">
        <h1 className="font-display text-7xl sm:text-8xl text-foreground leading-none tracking-tight">
          Skintra
        </h1>
        <div className="mt-6 h-px w-16 bg-foreground/30" />
        <p className="mt-6 text-xs sm:text-sm tracking-[0.4em] uppercase text-foreground/70 font-medium">
          Track. Analyze. Glow.
        </p>
      </div>

      {/* Enter affordance */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3 z-10">
        <span className="glass rounded-full px-5 py-2.5 text-xs font-medium text-foreground inline-flex items-center gap-2">
          Tap to enter <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
};