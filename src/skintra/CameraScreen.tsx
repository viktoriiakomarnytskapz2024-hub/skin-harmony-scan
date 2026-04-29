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
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Position product label</p>
        <h1 className="font-display text-3xl text-foreground mt-2 leading-tight">
          Scan in progress
        </h1>
      </div>

      {/* OCR focus frame */}
      <div className="relative z-10 mt-6 px-8 flex flex-col items-center">
        <div className="relative w-60 h-72 max-w-[72%]">
          {/* Corner brackets */}
          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((c, i) => (
            <span key={i} className={`absolute w-10 h-10 border-primary/60 ${c}`} />
          ))}

          {/* Frame interior */}
          <div className="absolute inset-4 rounded-2xl overflow-hidden glass-soft">
            {/* viewfinder grid */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-1/3 left-0 right-0 h-px bg-primary/15" />
              <span className="absolute top-2/3 left-0 right-0 h-px bg-primary/15" />
              <span className="absolute left-1/3 top-0 bottom-0 w-px bg-primary/15" />
              <span className="absolute left-2/3 top-0 bottom-0 w-px bg-primary/15" />
            </div>
            {/* faint ingredient skeleton lines */}
            <div className="absolute inset-0 px-5 py-6 flex flex-col justify-center gap-2.5">
              {[85, 70, 92, 60, 78].map((w, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full bg-foreground/15"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            {/* sweeping scan line */}
            <div className="absolute inset-x-2 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_2px_hsl(var(--primary)/0.6)] animate-scan-sweep" />
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
          <div className="w-full rounded-3xl p-8 sm:p-10 text-center glass-modal animate-scale-in relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 text-[hsl(220_30%_40%)] hover:text-[hsl(220_45%_18%)]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="py-6 flex flex-col items-center text-center">
              <h3 className="font-display text-3xl text-[hsl(220_45%_18%)]">Is the image clear?</h3>
              <p className="font-editorial text-base text-[hsl(220_30%_25%)] mt-3 max-w-[20rem] mx-auto">
                We'll analyze the ingredients list. Make sure the label is sharp and fully visible.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="h-12 rounded-full bg-white/40 hover:bg-white/55 text-[hsl(220_45%_22%)] font-ui font-semibold border border-white/60 backdrop-blur-md transition-colors"
              >
                Retake
              </button>
              <button
                onClick={onConfirm}
                className="h-12 rounded-full text-white font-ui font-bold shadow-[0_8px_20px_-6px_hsl(218_60%_50%/0.45)]"
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
