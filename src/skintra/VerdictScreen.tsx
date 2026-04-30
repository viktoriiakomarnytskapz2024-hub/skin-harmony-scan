import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Droplet, Sparkles, Zap, Sun, Moon, Layers, Ban, AlertTriangle, Clock } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProgress(product.match), 100);
    return () => clearTimeout(t);
  }, [product.match]);

  const offset = RING_C - (progress / 100) * RING_C;

  return (
    <div className="min-h-full glow-bg pb-10">
      <div className="px-5 pt-12 flex items-center justify-between animate-fade-in">
        <button onClick={onBack} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80">
          Product match
        </div>
        <div className="w-10" />
      </div>

      <div className="text-center mt-5 px-6 animate-slide-up">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Scan complete</p>
        <h1 className="font-display text-3xl text-foreground leading-tight mt-2">
          Today's Skintra<br />adjustment
        </h1>
        <p className="text-xs text-muted-foreground mt-2">{product.brand} · {product.name}</p>
      </div>

      <div className="mt-6 flex flex-col items-center animate-scale-in">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={RING_R} stroke="hsl(0 0% 100% / 0.7)" strokeWidth="10" fill="none" />
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{product.match}<span className="text-xl font-medium">%</span></span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">Product match for your profile</p>
      </div>

      {/* metric pills */}
      <div className="mt-6 px-5 grid grid-cols-3 gap-2">
        {[
          { icon: Droplet, label: "Hydrating", value: "high" },
          { icon: Sparkles, label: "Soothing", value: "medium" },
          { icon: Zap, label: "Active", value: "10%" },
        ].map((c) => (
          <div key={c.label} className="glass rounded-2xl p-3">
            <div className="flex items-center gap-1.5 text-foreground/70">
              <c.icon className="w-3 h-3 text-primary" />
              <p className="text-[10px] tracking-wide">{c.label}:</p>
            </div>
            <p className="text-sm font-semibold text-foreground mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* adjustments */}
      <div className="mt-3 px-5 grid grid-cols-3 gap-2">
        {[
          { icon: Clock, label: "Apply", sub: "AM + PM" },
          { icon: Layers, label: "Pair with", sub: "moisturizer" },
          { icon: Ban, label: "Avoid", sub: "strong acids" },
        ].map((c) => (
          <div key={c.label} className="glass rounded-2xl p-3 flex flex-col items-start gap-1.5">
            <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <c.icon className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{c.label}</p>
              <p className="text-[10px] text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* details collapsible */}
      <div className="mt-4 px-5">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full glass rounded-2xl px-4 py-3 flex items-center justify-between text-sm font-medium text-foreground"
        >
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Risks & Usage
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="mt-2 glass rounded-2xl p-4 space-y-3 animate-fade-in">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Contains fragrance (low irritation). Comedogenic 1/5 — safe for combination skin during cycle day 22.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="glass-inner p-2.5 flex items-center gap-2">
                <Sun className="w-4 h-4 text-warning" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Morning</p>
                  <p className="text-xs font-medium text-foreground">Daily</p>
                </div>
              </div>
              <div className="glass-inner p-2.5 flex items-center gap-2">
                <Moon className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Night</p>
                  <p className="text-xs font-medium text-foreground">3× / week</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 px-5 space-y-2">
        <button
          onClick={() => setConfirm(true)}
          className="w-full h-14 rounded-full text-primary-foreground font-semibold shadow-[0_10px_30px_-8px_hsl(218_60%_50%/0.5)] active:scale-[0.98] transition"
          style={{ background: "var(--gradient-primary)" }}
        >
          View routine
        </button>
        <button
          onClick={onAlternatives}
          className="w-full h-12 rounded-full glass text-foreground font-medium"
        >
          See Alternatives
        </button>
      </div>

      {confirm && (
        <div className="absolute inset-0 z-20 bg-foreground/10 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
          <div className="w-full rounded-3xl p-8 sm:p-10 text-left bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-20px_hsl(218_40%_30%/0.25)] animate-scale-in">
            <h3 className="font-sans font-semibold text-2xl tracking-tight text-[hsl(220_45%_18%)]">Add to routine?</h3>
            <p className="text-sm font-medium text-[hsl(220_25%_35%)] mt-3">
              {product.name} will appear in your daily routine.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                onClick={() => { setConfirm(false); onAlternatives(); }}
                className="h-12 rounded-full bg-[hsl(214_45%_94%)] hover:bg-[hsl(214_45%_90%)] text-[hsl(220_45%_22%)] font-semibold border border-[hsl(214_35%_86%)] transition-colors"
              >
                No
              </button>
              <button
                onClick={() => { setConfirm(false); onAdd(); }}
                className="h-12 rounded-full text-white font-bold shadow-[0_8px_20px_-6px_hsl(218_60%_50%/0.45)]"
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
