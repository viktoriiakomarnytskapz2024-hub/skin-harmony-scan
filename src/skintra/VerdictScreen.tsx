import { useState, useEffect } from "react";
import { ArrowLeft, Sun, Moon, AlertTriangle, Check, X } from "lucide-react";
import { Product } from "./types";

const RING_R = 70;
const RING_C = 2 * Math.PI * RING_R;

export const VerdictScreen = ({
  product,
  onBack,
  onAdd,
  onAlternatives,
}: {
  product: Product;
  onBack: () => void;
  onAdd: () => void;
  onAlternatives: () => void;
}) => {
  const [confirm, setConfirm] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(product.match), 100);
    return () => clearTimeout(t);
  }, [product.match]);

  const needIt = product.match >= 70;
  const offset = RING_C - (progress / 100) * RING_C;

  return (
    <div className="min-h-full glow-bg pb-10">
      <div className="px-5 pt-12 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-xs text-muted-foreground">Today's verdict</p>
        <div className="w-10" />
      </div>

      <div className="px-6 mt-3 animate-fade-in">
        <h1 className="font-display text-3xl text-foreground leading-tight">
          Today's Skintra<br />verdict
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{product.brand} · {product.name}</p>
      </div>

      <div className="mt-6 flex flex-col items-center animate-scale-in">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={RING_R} stroke="hsl(var(--border))" strokeWidth="10" fill="none" />
            <circle
              cx="80" cy="80" r={RING_R}
              stroke="url(#grad)"
              strokeWidth="10" fill="none" strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{product.match}%</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Match</span>
          </div>
        </div>

        <div
          className={`mt-4 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
            needIt ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}
        >
          {needIt ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          {needIt ? "Need it" : "Don't need it"}
        </div>
      </div>

      <div className="mt-6 px-5 grid grid-cols-3 gap-2">
        {[
          { label: "Hydration", value: "+High" },
          { label: "Sensitivity", value: "Low" },
          { label: "Barrier", value: "Boost" },
        ].map((c) => (
          <div key={c.label} className="glass rounded-2xl p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 px-5 space-y-3">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Irritation & Comedogenic risks</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Contains fragrance (low irritation). Comedogenic rating 1/5 — safe for combination skin during cycle day 22.
          </p>
        </div>

        <div className="glass rounded-3xl p-4">
          <h3 className="text-sm font-semibold text-foreground">Usage Guidelines</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/40 p-3 flex items-center gap-2">
              <Sun className="w-4 h-4 text-warning" />
              <div>
                <p className="text-[10px] text-muted-foreground">Morning</p>
                <p className="text-xs font-medium text-foreground">Daily</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/40 p-3 flex items-center gap-2">
              <Moon className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Night</p>
                <p className="text-xs font-medium text-foreground">3× / week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-5 space-y-2">
        <button
          onClick={() => setConfirm(true)}
          className="w-full h-14 rounded-full text-primary-foreground font-semibold shadow-[0_10px_30px_-8px_hsl(218_60%_50%/0.5)] active:scale-[0.98] transition"
          style={{ background: "var(--gradient-primary)" }}
        >
          Add to My Routine
        </button>
        <button
          onClick={onAlternatives}
          className={`w-full h-12 rounded-full font-medium ${
            needIt ? "text-foreground/70 underline underline-offset-4" : "glass text-foreground"
          }`}
        >
          See Alternatives
        </button>
      </div>

      {confirm && (
        <div className="absolute inset-0 z-20 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
          <div className="w-full glass rounded-3xl p-6 animate-scale-in">
            <h3 className="font-display text-2xl text-foreground">Want to add to routine?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.name} will appear in your daily routine.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setConfirm(false); onAlternatives(); }}
                className="h-12 rounded-full glass-soft text-foreground font-medium"
              >
                No
              </button>
              <button
                onClick={() => { setConfirm(false); onAdd(); }}
                className="h-12 rounded-full text-primary-foreground font-semibold"
                style={{ background: "var(--gradient-primary)" }}
              >
                Yes, add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};