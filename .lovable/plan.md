
# Skintra — AI Skincare Scanner Prototype

A multi-screen mobile-first prototype that walks through the full scan-to-verdict loop, styled with glassmorphism, light blue & white palette, Playfair Display Italic for titles and Inter for data.

## Design System
- **Palette**: Soft sky-blue gradient backgrounds (#EAF1FB → #FFFFFF), frosted glass cards (white/40 + backdrop-blur), accent blue #4A7BD8, subtle violet glow.
- **Typography**: Playfair Display Italic for headings ("Today's routine", "Analyze in progress"), Inter for body, labels, percentages.
- **Components**: Rounded-3xl glass cards, soft shadows, thin borders (white/60), animated rings & pulses, iPhone-style frame for preview.

## Screens & Flow

**1. Home / Product List**
- Top bar: avatar "H", "78% Skin Health" pill, bell + grid icons.
- Greeting "Hello, Helen" + italic title "Your skin routine plan is ready."
- Three glass stat cards: Sleep 6.5h · Stress Low · Cycle Day 22.
- Search bar + horizontal category chips (Cleanser, Serum, Moisturizer, SPF, Mask).
- "My Products" list (3–4 mock items with mini compatibility badges).
- Prominent bottom CTA: **Scan New Product** → Screen 2.

**2. Camera / Upload**
- Full-bleed viewfinder mock with corner brackets and a centered product-label frame.
- Helper text "Position label inside the frame".
- Two buttons: **Take Photo** / **Upload from Gallery**.
- After tap → glass modal "Is the image clear?" with **Retake** (→ reset) or **Yes, analyze** (→ Screen 3).

**3. AI Processing**
- Blurred home background, centered animated face-mesh ring with pulsing core.
- Sequential status lines fading in:
  - "AI is analyzing ingredients…"
  - "Syncing with your Health Data (Sleep · Stress · Cycle)…"
  - "Cross-checking with your skin profile…"
- Auto-advances to Screen 4 after ~2.5s.

**4. Product Verdict**
- Italic title "Today's Skintra verdict".
- Large circular progress with **Compatibility Score** (e.g., 85%).
- Status pill: **Need it** or **Don't need it** (randomized/scenario-driven).
- Three info chips: Hydration, Sensitivity, Barrier impact.
- Sections: **Irritation & Comedogenic risks**, **Usage Guidelines** (morning/night, frequency).
- Primary button **Add to My Routine** → confirm prompt "Want to add to routine?" → Yes returns to Screen 1 with toast "Added to routine".
- Secondary link **See Alternatives** (always visible; emphasized when score < 70) → Screen 5.

**5. Alternatives**
- Italic title "Better matches for you".
- Curated list (3–4 cards) with name, match %, key benefit tags tied to user's sleep/stress/cycle.
- Each card → tap shows quick detail sheet with **Add to Routine** (→ Screen 1).
- Bottom decision card "Found an alternative?" with **Yes, done** (→ Screen 1) and **No** → secondary prompt "Scan more items?" → **Scan more** (→ Screen 2) or **Finish** (→ Screen 1).

## Interaction & State
- Single-page app with in-memory router (screen state) — no URL routing needed for the demo loop.
- Mock "My Routine" list updates when products are added; toast confirmations via Sonner.
- All transitions animated (fade/slide) for a polished feel.
- Mobile frame wrapper on desktop so the prototype feels like a phone preview; full-screen on small viewports.

## Out of Scope
- Real camera access, real AI calls, authentication, persistence across reloads.
