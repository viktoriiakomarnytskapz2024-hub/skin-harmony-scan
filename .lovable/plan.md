
# Adapt visual style to the reference (light, airy glass + light scan screen)

Three reference phones share the same DNA: soft sky-blue background everywhere (no dark mode), highly translucent white cards (~30–45% white) with very thin white borders and soft blue shadows, Playfair Italic titles ("Today's routine", "Analyze in progress", "Today's Skintra adjustment"). Most importantly, the **scan/analyze screen is light, not dark**, and shows a translucent face-mesh sphere with corner brackets and a centered glass scan button — not a dark camera viewfinder.

## 1. Global glass tokens (`src/index.css`)
Make the glass lighter and more transparent to match the reference:
- `.glass` → `bg-white/35 backdrop-blur-2xl border border-white/50`, softer blue shadow.
- `.glass-soft` → `bg-white/25 backdrop-blur-xl border border-white/40`.
- New `.glass-inner` for nested tiles (e.g. step icons, metric chips): `bg-white/55 border-white/70`, slightly more opaque so they read on the translucent parent.
- Soften `--shadow-glass` to a more diffuse, lower-opacity sky-blue glow.

## 2. Scan screen — fully redesigned (`CameraScreen.tsx`)
Replace the dark viewfinder with the reference's light "Analyze" composition, but kept as the pre-scan state:

```text
┌─────────────────────────────┐
│  ← Scan label        ⓘ      │  ← top bar on light bg
│                             │
│      Position label         │  small caption, italic
│   Scan your product         │  Playfair Italic title
│                             │
│   ┌─┐               ┌─┐     │  4 corner brackets (primary)
│   │   ░ face/sphere ░ │     │  translucent mesh sphere
│   │     ╭───╮         │     │  centered glass scan button
│   │     │ ▣ │         │     │
│   │     ╰───╯         │     │
│   └─┘               └─┘     │
│                             │
│  ┌────────┐ ┌────────┐      │  two metric glass tiles
│  │Clarity │ │ Light  │      │  ("good", "bright")
│  │ good   │ │ bright │      │
│  └────────┘ └────────┘      │
│                             │
│  AI is ready to scan…       │
│  [   Take Photo    ]        │  primary gradient pill
│  [ Upload Gallery  ]        │  glass pill
└─────────────────────────────┘
```

- Background: same `glow-bg` sky gradient as Dashboard (no dark overlay).
- Sphere: layered translucent radial-gradient circle with a faint dotted SVG mesh overlay and animated rotating ring; centered glass square button with scan icon.
- Corner brackets in `primary-glow` color, thin.
- Two small glass metric tiles below mimic the reference's "Moisture / Oil / Redness" row but adapted to scanning context (Clarity / Light).
- Keep the existing "Is the image clear?" confirmation modal but restyle it with the new lighter glass.

## 3. Processing screen (`ProcessingScreen.tsx`)
Align with the middle reference phone:
- Use light `glow-bg`, remove the `backdrop-blur-2xl` dark veil.
- Replace solid blue orb with a translucent glass sphere + faint mesh dots (reuse sphere component from CameraScreen).
- Title "Analyze in progress" stays, add small caption "AI is analyzing skin layers…" at bottom in muted text.
- Keep the 3 step lines but make them fade-in sequentially under the title in lighter type.

## 4. Verdict screen (`VerdictScreen.tsx`)
Match the third reference phone's lighter look:
- Title: "Today's Skintra adjustment" (instead of "verdict") — keep two-line Playfair Italic.
- Caption above the ring: small "Scan complete" centered.
- Ring: lighter track (`white/60`), gradient stroke unchanged, big bold percentage centered.
- Replace 3-column generic chips with reference's exact trio: **Hydration / Sensitivity / Barrier** with values "good / mild / stable", each as a small pill-style glass row with an icon dot on the left (matching the reference exactly).
- Add a 3-tile glass row below for adjustments: "Boost hydration", "Calm redness", "Night repair" (icon + label).
- Primary CTA becomes "View routine" (renamed from "Add to My Routine") in the same gradient pill.
- Keep "See Alternatives" as secondary.
- Remove the bulky Irritation/Usage Guidelines cards on the main view (they made it dense and off-style); move them into a collapsible "Details" section opened by a small chevron — keeps the screen as clean as the reference.

## 5. Dashboard polish (`DashboardScreen.tsx`)
Small alignment tweaks to match the reference photo more closely:
- Reduce stat-card opacity using new lighter `.glass`.
- "Today's routine" card: add a tiny "24 DEC" date chip on the top-left (matching reference) next to "Read Plan" on the right.
- The 0/4 Steps grid tiles use the new `.glass-inner` for more visible icons.

## 6. Products screen (`HomeScreen.tsx`)
- Apply lighter glass automatically through token changes.
- Make product row cards use `.glass` (now lighter) + thinner divider feel.
- Active category chip: switch from solid black to a soft primary-tinted glass pill to stay on-palette with the reference.

## Files to edit
- `src/index.css` — glass tokens, shadows, add `.glass-inner`.
- `src/skintra/CameraScreen.tsx` — full rewrite to light scan composition.
- `src/skintra/ProcessingScreen.tsx` — light bg + translucent sphere.
- `src/skintra/VerdictScreen.tsx` — restyle, rename CTA, add adjustments row, collapsible details.
- `src/skintra/DashboardScreen.tsx` — date chip, lighter tiles.
- `src/skintra/HomeScreen.tsx` — active chip restyle.

## Out of scope
Routing, screen order, new screens, real camera/AI — only visual adaptation.
