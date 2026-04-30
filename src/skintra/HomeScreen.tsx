import { Search, ScanLine, ArrowLeft } from "lucide-react";
import { Product } from "./types";

const categories = ["All", "Cleanser", "Serum", "Moisturizer", "SPF", "Mask"];

export const HomeScreen = ({
  routine,
  onScan,
  onBack,
}: {
  routine: Product[];
  onScan: () => void;
  onBack: () => void;
}) => {
  return (
    <div className="min-h-full glow-bg pb-28">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between animate-fade-in">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="glass rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80 flex items-center">
          My Routine
        </div>
        <div className="w-10" />
      </div>

      <div className="px-5 mt-2 animate-slide-up">
        <h1 className="font-display text-3xl leading-tight text-foreground mt-1">
          My Products
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Everything in your current routine.</p>
      </div>

      <div className="px-5 mt-5 animate-fade-in">
        <div className="glass rounded-full flex items-center gap-2 px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search ingredients or products"
            className="bg-transparent border-0 outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-4 px-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
              i === 0
                ? "bg-primary/90 text-primary-foreground shadow-[0_6px_20px_-8px_hsl(218_60%_50%/0.6)]"
                : "glass text-foreground/70 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">In your routine</h2>
        <span className="text-xs text-muted-foreground">{routine.length} items</span>
      </div>

      <div className="px-5 mt-3 space-y-2.5">
        {routine.length === 0 && (
          <div className="glass rounded-3xl p-6 text-center text-sm text-muted-foreground">
            No products yet. Tap <span className="font-medium text-foreground">Scan New Product</span> to add one.
          </div>
        )}
        {routine.map((p, i) => (
          <div
            key={p.id + i}
            className="glass rounded-3xl p-3.5 flex items-center gap-3 animate-fade-in"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center text-2xl">
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground truncate">{p.brand} · {p.category}</p>
            </div>
            <div
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                p.match >= 80
                  ? "bg-success/15 text-success"
                  : p.match >= 60
                  ? "bg-warning/15 text-warning"
                  : "bg-destructive/15 text-destructive"
              }`}
            >
              {p.match}%
            </div>
          </div>
        ))}
      </div>

      <div className="fixed sm:absolute bottom-0 inset-x-0 px-5 pb-6 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <button
          onClick={onScan}
          className="w-full h-14 rounded-full text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_hsl(218_60%_50%/0.5)] active:scale-[0.98] transition"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ScanLine className="w-5 h-5" />
          Scan New Product
        </button>
      </div>
    </div>
  );
};