
# Restructure flow: Splash → Dashboard → Products

## New screen order

```text
1. Splash (NEW)        →  tap anywhere / Enter
2. Dashboard (NEW)     →  top-right menu button
3. Products (existing Home, simplified)
4. Camera → 5. Processing → 6. Verdict → 7. Alternatives
```

Add to `Screen` type: `"splash" | "dashboard"`. Initial screen = `splash`.

## Screen 1 — Splash (`SplashScreen.tsx`, new)
Aesthetic full-bleed background (soft sky-blue gradient + subtle blurred portrait-style glow, matching the "Beauty Inspired" reference).
- Centered: **Skintra** in Playfair Display Italic (very large, ~6xl).
- Below: **Track. Analyze. Glow.** in Inter, tracked-out uppercase, smaller.
- Bottom: a thin "Enter →" pill button (whole screen also tappable) → `dashboard`.

## Screen 2 — Dashboard (`DashboardScreen.tsx`, new)
Mirrors the reference (image-3.png):
- Top bar: avatar "H" + "78% Skin Health" pill on left; bell + **grid menu button** on right.
- Greeting "Hello, Helen" + italic "Your *skin routine plan* is ready."
- 3 stat cards: Sleep 6.5h · Stress Low · Cycle Day 22.
- Large glass card "SKINTRA — Today's routine" with "Read Plan" chip, 0/4 Steps grid (4 mini icon tiles), and Skin Health 78% mini ring (+4% this week).
- Bottom CTA: **Start AI Scan** → `camera`.
- **Top-right grid icon** opens a small glass dropdown menu: *My Products*, *Scan*, *Home* → navigate to `home` / `camera` / `splash`.

## Screen 3 — Products (existing `HomeScreen.tsx`, simplified)
Remove:
- "Hello, Helen" + "Your skin routine plan is ready." block.
- Three Sleep/Stress/Cycle stat cards.

Keep: top bar (add a back arrow → `dashboard`), italic title **"My Products"**, search bar, category chips, products list, bottom **Scan New Product** CTA.

## Remove all scrollbars (mobile feel)
- Add a global `.scrollbar-hide` rule in `src/index.css` (already used inline) and apply `overflow-y: auto; scrollbar-width: none;` + `::-webkit-scrollbar { display: none; }` to:
  - `PhoneFrame` inner scroll container
  - any horizontal chip rows
- Hide visible scrollbars across all screens while keeping scroll functional.

## Wiring (`src/pages/Index.tsx`)
- Initial state: `screen = "splash"`.
- Routes:
  - splash → dashboard
  - dashboard → camera (Start AI Scan), or via menu → home / splash
  - home (Products) → camera (Scan New Product), back → dashboard
  - camera → processing → verdict → (add → dashboard) / (alternatives → … → dashboard or camera)
- After "Add to routine" / "Finish" loops, return to **dashboard** instead of products list (products list reachable via menu).

## Files
- **New**: `src/skintra/SplashScreen.tsx`, `src/skintra/DashboardScreen.tsx`
- **Edit**: `src/skintra/types.ts` (extend `Screen`), `src/pages/Index.tsx` (router + initial), `src/skintra/HomeScreen.tsx` (strip greeting + stats, add back nav), `src/index.css` (global scrollbar-hide), `src/skintra/PhoneFrame.tsx` (apply scrollbar-hide)
