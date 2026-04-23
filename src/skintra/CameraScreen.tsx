import { useState } from "react";
import { Camera, Image as ImageIcon, X, ArrowLeft } from "lucide-react";

export const CameraScreen = ({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-full bg-foreground/95 text-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(218_40%_25%),hsl(220_50%_8%))]" />

      <div className="relative pt-12 px-5 flex items-center justify-between z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-sm font-medium">Scan label</p>
        <div className="w-10" />
      </div>

      <div className="relative z-10 mt-16 px-8 flex flex-col items-center">
        <div className="relative w-full aspect-[3/4] max-w-xs">
          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((c, i) => (
            <span key={i} className={`absolute w-12 h-12 border-primary-glow ${c}`} />
          ))}

          <div className="absolute inset-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-2">
            <div className="text-5xl">🧴</div>
            <p className="text-xs text-white/60 text-center px-4">Position label inside the frame</p>
          </div>

          <div className="absolute left-6 right-6 top-1/2 h-px bg-primary-glow/70 animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-10 px-5 pb-8 pt-6 space-y-3">
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-14 rounded-full bg-white text-foreground font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <Camera className="w-5 h-5" />
          Take Photo
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-medium flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Upload from Gallery
        </button>
      </div>

      {showModal && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-5 animate-fade-in">
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
            <div className="mt-5 aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/60 flex items-center justify-center text-4xl">
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