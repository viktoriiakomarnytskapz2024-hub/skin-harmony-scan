# Modal Restyle — "Is the image clear?" & "Scan more items?"

Apply changes ONLY to these two pop-ups. Other screens, modals (e.g. product detail), and the global `.glass` token remain untouched.

## Scope
- `src/skintra/CameraScreen.tsx` → "Is the image clear?" modal (lines ~132–165)
- `src/skintra/AlternativesScreen.tsx` → "Scan more items?" modal (lines ~132–154)

## Visual spec

**Modal container**
- Replace `glass` (translucent grayish-blue) with a clean white panel:
  `bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-20px_hsl(218_40%_30%/0.25)]`
- Keep the outer overlay's blur (`backdrop-blur-sm`) so the scene behind stays softly blurred.
- Increase padding: `p-8 sm:p-10` (more breathing room).
- Center all content (`text-center`, buttons grid stays 2-col).

**Typography (no italics)**
- Titles: drop `font-display` (which is Playfair Italic). Use `font-sans font-semibold text-2xl tracking-tight` with color `text-[hsl(220_45%_18%)]` (deep navy/slate).
- Descriptions: `text-sm font-medium text-[hsl(220_25%_35%)]` (dark slate, not muted gray) with `mt-3` and `max-w-[20rem] mx-auto`.

**Buttons (keep pill shape, large radius)**
- Primary ("Yes, analyze" / "Scan more"): keep `var(--gradient-primary)` background, `text-white font-bold`, `h-12 rounded-full`, add subtle shadow `shadow-[0_8px_20px_-6px_hsl(218_60%_50%/0.45)]`.
- Secondary ("Retake" / "Finish"): replace `glass-soft` with `bg-[hsl(214_45%_94%)] hover:bg-[hsl(214_45%_90%)] text-[hsl(220_45%_22%)] font-semibold border border-[hsl(214_35%_86%)]`.
- Grid: `mt-8 grid grid-cols-2 gap-3`.

**Camera modal specifics**
- Reduce the empty `py-10` block to `py-6` (padding is now on the container).
- Keep the close (X) button top-right, but recolor to `text-[hsl(220_30%_40%)]`.

## Out of scope
- Do not change the product-detail modal in `AlternativesScreen.tsx`.
- Do not modify global `.glass`, `.glass-soft`, or `font-display` utilities.
- No layout/flow changes elsewhere.

## Result
Two pop-ups with a crisp white surface, upright semibold navy headlines, high-contrast dark descriptions, vivid blue primary CTA, and a soft ice-blue secondary button — consistent with the requested "Modern Clarity" aesthetic.
