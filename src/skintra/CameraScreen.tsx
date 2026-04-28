import { useState } from "react";
import { Camera, Image as ImageIcon, X, ArrowLeft, ScanLine, Info } from "lucide-react";

export const CameraScreen = ({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-full glow-bg pb-6 overflow-hidden">
      {/* Top bar */}
      <div className="relative pt-12 px-5 flex items-center justify-between z-10 animate-fade-in">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 inline-flex items-center gap-1.5">
          <ScanLine className="w-3 h-3 text-primary" /> Scan label
        </div>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70">
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Caption */}
      <div className="relative z-10 mt-6 text-center px-6 animate-slide-up">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Position face</p>
        <h1 className="font-display text-3xl text-foreground mt-2 leading-tight">
          Scan in progress
        </h1>
      </div>

      {/* Sphere with corner brackets */}
      <div className="relative z-10 mt-6 px-8 flex flex-col items-center">
        <div className="relative w-72 h-72 max-w-[78%]">
          {/* Corner brackets */}
          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((c, i) => (
            <span key={i} className={`absolute w-10 h-10 border-primary/60 ${c}`} />
          ))}

          {/* Mesh sphere */}
          <div className="absolute inset-6 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, hsl(0 0% 100% / 0.9), hsl(214 60% 92% / 0.6) 50%, hsl(218 60% 80% / 0.3) 80%)",
              }}
            />
            {/* dotted mesh */}
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="fade" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="hsl(218 60% 55%)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(218 60% 55%)" stopOpacity="0" />
                </radialGradient>
                <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.5" fill="url(#fade)" />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#dots)" />
              {/* meridians */}
              {[20, 35, 50, 65, 80].map((cx) => (
                <ellipse
                  key={cx}
                  cx="50"
                  cy="50"
                  rx={Math.abs(50 - cx) || 4}
                  ry="46"
                  fill="none"
                  stroke="hsl(218 60% 55%)"
                  strokeOpacity="0.18"
                  strokeWidth="0.4"
                />
              ))}
              {[20, 35, 50, 65, 80].map((cy) => (
                <ellipse
                  key={cy}
                  cx="50"
                  cy="50"
                  rx="46"
                  ry={Math.abs(50 - cy) || 4}
                  fill="none"
                  stroke="hsl(218 60% 55%)"
                  strokeOpacity="0.18"
                  strokeWidth="0.4"
                />
              ))}
            </svg>
            {/* rotating ring */}
            <span className="absolute inset-2 rounded-full border-2 border-primary/30 border-t-transparent border-r-transparent animate-spin-slow" />
          </div>

          {/* Center scan button */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary shadow-lg active:scale-95 transition"
            style={{ background: "linear-gradient(135deg, hsl(218 80% 92% / 0.9), hsl(0 0% 100% / 0.9))" }}
          >
            <ScanLine className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="relative z-10 mt-6 px-5 grid grid-cols-2 gap-3 animate-fade-in">
        {[
          { label: "Clarity", value: "good" },
          { label: "Light", value: "bright" },
        ].map((m) => (
          <div key={m.label} className="glass rounded-2xl p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="text-lg font-semibold text-foreground mt-0.5">{m.value}</p>
            <svg viewBox="0 0 80 20" className="w-full h-4 mt-1">
              <path
                d="M0 12 Q10 4 20 10 T40 8 T60 12 T80 6"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.5"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        ))}
      </div>

      <p className="relative z-10 text-center text-xs text-muted-foreground mt-5">
        AI is ready to scan…
      </p>

      {/* CTAs */}
      <div className="relative z-10 mt-3 px-5 space-y-2.5">
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-14 rounded-full text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_hsl(218_60%_50%/0.5)] active:scale-[0.98] transition"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Camera className="w-5 h-5" />
          Take Photo
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-12 rounded-full glass text-foreground font-medium flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Upload from Gallery
        </button>
      </div>

      {/* Confirm modal */}
      {showModal && (
        <div className="absolute inset-0 z-20 bg-foreground/10 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
          <div className="w-full glass rounded-3xl p-6 text-foreground animate-scale-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl">Is the image clear?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll analyze the ingredients list. Make sure the label is sharp and fully visible.
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-5 aspect-video glass-inner flex items-center justify-center text-4xl">
              🧴
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowModal(false)}
                className="h-12 rounded-full glass-soft text-foreground font-medium"
              >
                Retake
              </button>
              <button
                onClick={onConfirm}
                className="h-12 rounded-full text-primary-foreground font-semibold"
                style={{ background: "var(--gradient-primary)" }}
              >
                Yes, analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
