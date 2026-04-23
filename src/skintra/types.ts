export type Screen = "home" | "camera" | "processing" | "verdict" | "alternatives";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  emoji: string;
  match: number;
  tags: string[];
};