import { Bell, Grid3x3, Search, ScanLine, Sparkles, Droplet, Sun, Moon } from "lucide-react";
import { Product } from "./types";

const categories = ["All", "Cleanser", "Serum", "Moisturizer", "SPF", "Mask"];

export const HomeScreen = ({
  routine,
  onScan,
}: {
  routine: Product[];
  onScan: () => void;
}) => {
  return (
    <div className="min-h-full glow-bg pb-28">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground flex items-center justify-center font-semibold shadow-lg">
            H
          </div>
          <div className="glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            78% Skin Health
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70">
            <Grid3x3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-5 mt-2 animate-slide-up">
        <p className="text-sm text-muted-foreground">Hello, Helen</p>
        <h1 className="font-display text-3xl leading-tight text-foreground mt-1">
          Your skin routine<br />plan is ready.
        </h1>
      </div>

      <div className="px-5 mt-5 grid grid-cols-3 gap-2.5 animate-slide-up">
        {[
          { icon: Moon, label: "Sleep", value: "6.5h" },
          { icon: Sparkles, label: "Stress", value: "Low" },
          { icon: Droplet, label: "Cycle", value: "Day 22" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-3 flex flex-col items-start gap-1">
            <s.icon className="w-4 h-4 text-primary" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="px-5 mt-6 animate-fade-in">
        <div className="glass rounded-full flex items-center gap-2 px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search ingredients or products"
            className="bg-transparent border-0 outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-5 px-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
              i === 0
                ? "bg-foreground text-background"
                : "glass text-foreground/70 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-5 mt-6 flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">My Products</h2>
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