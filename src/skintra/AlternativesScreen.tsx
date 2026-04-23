import { useState } from "react";
import { ArrowLeft, X, Sparkles } from "lucide-react";
import { Product } from "./types";

const ALTS: Product[] = [
  { id: "a1", name: "Hydra Calm Serum", brand: "Lumea", category: "Serum", emoji: "💧", match: 94, tags: ["Sleep recovery", "Hydration"] },
  { id: "a2", name: "Barrier Repair Cream", brand: "Soft Skin Co.", category: "Moisturizer", emoji: "🌿", match: 89, tags: ["Stress relief", "Barrier"] },
  { id: "a3", name: "Cycle Glow Mask", brand: "Lunara", category: "Mask", emoji: "🌙", match: 86, tags: ["Cycle Day 22", "Glow"] },
  { id: "a4", name: "Gentle Cleansing Milk", brand: "Pure Note", category: "Cleanser", emoji: "🥛", match: 82, tags: ["Low irritation"] },
];

export const AlternativesScreen = ({
  onBack,
  onAdd,
  onScanMore,
  onFinish,
}: {
  onBack: () => void;
  onAdd: (p: Product) => void;
  onScanMore: () => void;
  onFinish: () => void;
}) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [askScan, setAskScan] = useState(false);

  return (
    <div className="min-h-full glow-bg pb-10">
      <div className="px-5 pt-12 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-xs text-muted-foreground">Alternatives</p>
        <div className="w-10" />
      </div>

      <div className="px-6 mt-3 animate-fade-in">
        <h1 className="font-display text-3xl text-foreground leading-tight">
          Better matches<br />for you
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tuned to your sleep, stress and cycle today.
        </p>
      </div>

      <div className="px-5 mt-5 space-y-2.5">
        {ALTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="w-full glass rounded-3xl p-4 flex items-center gap-3 text-left active:scale-[0.99] transition animate-fade-in"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center text-2xl">
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground truncate">{p.brand} · {p.category}</p>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-success/15 text-success shrink-0">
              {p.match}%
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 mt-6">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-display text-lg text-foreground">Found an alternative?</h3>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              onClick={onFinish}
              className="h-12 rounded-full text-primary-foreground font-semibold"
              style={{ background: "var(--gradient-primary)" }}
            >
              Yes, done
            </button>
            <button
              onClick={() => setAskScan(true)}
              className="h-12 rounded-full glass-soft text-foreground font-medium"
            >
              No
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="absolute inset-0 z-20 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
          <div className="w-full glass rounded-3xl p-6 animate-scale-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.brand} · {selected.category}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/15 flex items-center justify-center text-5xl">
              {selected.emoji}
            </div>
            <div className="mt-3 flex gap-1.5 flex-wrap">
              {selected.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
              ))}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success font-bold">{selected.match}% Match</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              A great fit for tonight: supports barrier recovery while you sleep and balances oil with cycle-aware actives.
            </p>
            <button
              onClick={() => { onAdd(selected); setSelected(null); }}
              className="mt-5 w-full h-12 rounded-full text-primary-foreground font-semibold"
              style={{ background: "var(--gradient-primary)" }}
            >
              Add to Routine
            </button>
          </div>
        </div>
      )}

      {askScan && (
        <div className="absolute inset-0 z-20 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
          <div className="w-full glass rounded-3xl p-6 animate-scale-in">
            <h3 className="font-display text-2xl text-foreground">Scan more items?</h3>
            <p className="text-sm text-muted-foreground mt-1">Keep refining today's routine.</p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setAskScan(false); onFinish(); }}
                className="h-12 rounded-full glass-soft text-foreground font-medium"
              >
                Finish
              </button>
              <button
                onClick={() => { setAskScan(false); onScanMore(); }}
                className="h-12 rounded-full text-primary-foreground font-semibold"
                style={{ background: "var(--gradient-primary)" }}
              >
                Scan more
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};