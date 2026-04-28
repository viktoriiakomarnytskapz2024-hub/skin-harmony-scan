import { useState } from "react";
import {
  Bell,
  Grid3x3,
  Sparkles,
  Droplet,
  Moon,
  ScanLine,
  ArrowUpRight,
  Package,
  Home as HomeIcon,
  Sun,
  FlaskConical,
  Snowflake,
} from "lucide-react";

const RING_R = 28;
const RING_C = 2 * Math.PI * RING_R;

export const DashboardScreen = ({
  onScan,
  onOpenProducts,
  onOpenSplash,
}: {
  onScan: () => void;
  onOpenProducts: () => void;
  onOpenSplash: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const skinHealth = 78;
  const offset = RING_C - (skinHealth / 100) * RING_C;

  return (
    <div className="relative min-h-full glow-bg pb-28">
      {/* Top bar */}
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
        <div className="flex items-center gap-2 relative">
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70">
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`w-10 h-10 rounded-full glass flex items-center justify-center transition ${
              menuOpen ? "text-primary" : "text-foreground/70"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-52 glass rounded-2xl p-2 z-30 animate-scale-in origin-top-right">
              <MenuItem
                icon={Package}
                label="My Products"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenProducts();
                }}
              />
              <MenuItem
                icon={ScanLine}
                label="Scan a product"
                onClick={() => {
                  setMenuOpen(false);
                  onScan();
                }}
              />
              <MenuItem
                icon={HomeIcon}
                label="Splash"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSplash();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Greeting */}
      <div className="px-5 mt-2 animate-slide-up">
        <p className="text-sm text-muted-foreground">Hello, Helen</p>
        <h1 className="font-display text-3xl leading-tight text-foreground mt-1">
          Your <em className="font-display">skin routine plan</em> is<br />ready.
        </h1>
      </div>

      {/* Stat cards */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-2.5 animate-slide-up">
        {[
          { icon: Moon, label: "Sleep", value: "6.5h", sub: "last night" },
          { icon: Sparkles, label: "Stress", value: "Low", sub: "today" },
          { icon: Droplet, label: "Cycle", value: "Day 22", sub: "luteal" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-3 flex flex-col items-start gap-1">
            <s.icon className="w-4 h-4 text-primary" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's routine card */}
      <div className="px-5 mt-5 animate-fade-in">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 glass-soft rounded-full px-2.5 py-1 text-[10px] font-medium text-foreground/70">
                24 DEC
              </span>
              <h2 className="font-display text-2xl text-foreground leading-tight mt-1">
                Today's<br />routine
              </h2>
            </div>
            <button className="glass-soft rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground inline-flex items-center gap-1">
              Read Plan <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Steps */}
            <div className="glass-inner p-3">
              <p className="text-[11px] text-muted-foreground mb-2">0/4 Steps</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[Droplet, Sparkles, FlaskConical, Sun].map((Icon, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-white/70 border border-white/80 flex items-center justify-center text-foreground/70"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skin Health ring */}
            <div className="glass-inner p-3 flex flex-col items-center justify-center">
              <p className="text-[11px] text-muted-foreground self-start">Skin Health</p>
              <div className="relative w-20 h-20 mt-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r={RING_R} stroke="hsl(var(--border))" strokeWidth="5" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r={RING_R}
                    stroke="hsl(var(--primary))"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-foreground">{skinHealth}%</span>
                </div>
              </div>
              <p className="text-[10px] text-success font-medium mt-1">+4% this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 inset-x-0 px-5 pb-6 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <button
          onClick={onScan}
          className="w-full h-14 rounded-full text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_hsl(218_60%_50%/0.5)] active:scale-[0.98] transition"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ScanLine className="w-5 h-5" />
          Start AI Scan
        </button>
      </div>
    </div>
  );
};

const MenuItem = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-white/60 transition text-left"
  >
    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
      <Icon className="w-4 h-4" />
    </span>
    <span className="font-medium">{label}</span>
  </button>
);