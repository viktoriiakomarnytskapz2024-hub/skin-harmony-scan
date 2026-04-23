import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PhoneFrame } from "@/skintra/PhoneFrame";
import { HomeScreen } from "@/skintra/HomeScreen";
import { CameraScreen } from "@/skintra/CameraScreen";
import { ProcessingScreen } from "@/skintra/ProcessingScreen";
import { VerdictScreen } from "@/skintra/VerdictScreen";
import { AlternativesScreen } from "@/skintra/AlternativesScreen";
import { Product, Screen } from "@/skintra/types";

const SAMPLE_SCAN: Product[] = [
  { id: "s1", name: "Niacinamide 10% Serum", brand: "Glow Lab", category: "Serum", emoji: "🧪", match: 85, tags: ["Hydration"] },
  { id: "s2", name: "Vitamin C Booster", brand: "Aura", category: "Serum", emoji: "🍊", match: 62, tags: ["Brightening"] },
  { id: "s3", name: "Retinol Night Oil", brand: "Velvet", category: "Serum", emoji: "🌙", match: 48, tags: ["Renewal"] },
];

const STARTER: Product[] = [
  { id: "p1", name: "Ceramide Cleanser", brand: "Pure Note", category: "Cleanser", emoji: "🫧", match: 88, tags: [] },
  { id: "p2", name: "Hyaluronic Mist", brand: "Lumea", category: "Toner", emoji: "💦", match: 76, tags: [] },
  { id: "p3", name: "SPF 50 Daily Shield", brand: "Sunly", category: "SPF", emoji: "☀️", match: 92, tags: [] },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [routine, setRoutine] = useState<Product[]>(STARTER);
  const [scanIndex, setScanIndex] = useState(0);

  const currentScan = useMemo(() => SAMPLE_SCAN[scanIndex % SAMPLE_SCAN.length], [scanIndex]);

  const goHome = () => setScreen("home");
  const startScan = () => setScreen("camera");

  const addToRoutine = (p: Product) => {
    setRoutine((r) => [{ ...p, id: p.id + "-" + Date.now() }, ...r]);
    toast.success("Added to routine", { description: p.name });
    goHome();
  };

  return (
    <PhoneFrame>
      {screen === "home" && (
        <HomeScreen routine={routine} onScan={startScan} />
      )}
      {screen === "camera" && (
        <CameraScreen
          onBack={goHome}
          onConfirm={() => setScreen("processing")}
        />
      )}
      {screen === "processing" && (
        <ProcessingScreen onDone={() => setScreen("verdict")} />
      )}
      {screen === "verdict" && (
        <VerdictScreen
          product={currentScan}
          onBack={goHome}
          onAdd={() => { addToRoutine(currentScan); setScanIndex((i) => i + 1); }}
          onAlternatives={() => setScreen("alternatives")}
        />
      )}
      {screen === "alternatives" && (
        <AlternativesScreen
          onBack={() => setScreen("verdict")}
          onAdd={(p) => { addToRoutine(p); setScanIndex((i) => i + 1); }}
          onScanMore={() => { setScanIndex((i) => i + 1); setScreen("camera"); }}
          onFinish={() => { setScanIndex((i) => i + 1); goHome(); }}
        />
      )}
    </PhoneFrame>
  );
};

export default Index;
