# Refocus on Product Ingredient Scanning (OCR)

Shift the entire scan flow away from facial recognition language/visuals toward product label OCR, while preserving the glassmorphism style, blue/white palette, and Playfair/Inter typography.

## 1. Scanner Screen (`src/skintra/CameraScreen.tsx`)
- Replace caption "POSITION FACE" → "POSITION PRODUCT LABEL".
- Keep heading "Scan in progress" and the top "Scan label" badge.
- Remove the spherical mesh "face globe" (radial gradient, ellipse meridians, rotating ring, pulse ring).
- Add a **rectangular OCR focus frame** in its place:
  - Tall rectangle (aspect ~3:4) with 4 corner brackets (reuse bracket styling, rounded corners).
  - Inside: faint horizontal "ingredient lines" (3–4 light skeleton bars) suggesting a label.
  - Animated horizontal **scan line** sweeping top → bottom (CSS animation, primary gradient, soft blur).
  - Subtle viewfinder grid (2 vertical + 2 horizontal hairlines) for camera feel.
- Keep the centered scan trigger button overlapping the frame's bottom-center (or place it below the frame).
- Keep the Clarity / Light metric tiles, "AI is ready to scan…", Take Photo, Upload buttons unchanged.

## 2. Confirmation Modal (in `CameraScreen.tsx`)
- Remove the inner preview tile entirely (the `glass-inner aspect-video` block containing the 🧴 emoji).
- Keep only "Is the image clear?" title + description paragraph.
- Vertically center the text content within the modal (flex column, `items-center text-center`, comfortable padding above the action row).
- Keep Retake / Yes, analyze action buttons unchanged.

## 3. Processing Screen (`src/skintra/ProcessingScreen.tsx`) — OCR animation
- Replace caption "Position face" → "Position product label" (or remove and use only the heading).
- Change heading to "Decoding ingredients".
- Replace the spherical mesh visual with an **OCR decode animation**:
  - Same rectangular bracketed frame as the scanner.
  - Inside: stacked skeleton "text lines" of varying widths.
  - Each line reveals sequentially with a typewriter / shimmer effect (staggered opacity + width animation).
  - A primary-colored horizontal scan line continuously sweeps over the lines.
  - Small monospace ticker at the bottom of the frame cycling sample tokens (e.g., `NIACINAMIDE · GLYCERIN · HYALURONIC ACID …`).
- Update step copy to OCR-focused:
  1. "Reading label text…"
  2. "Extracting ingredient list…"
  3. "Matching to your skin profile…"
- Replace footer line "AI is analyzing skin layers…" → "AI is decoding ingredients…".

## 4. Verdict Screen (`src/skintra/VerdictScreen.tsx`)
- Keep title "Today's Skintra adjustment" and product subtitle.
- Relabel the ring's contextual meaning: change the small badge above (currently "Today's verdict") to "Product match", and add a tiny caption under the percentage: "Product match for your profile".
- Replace the three metric pills (Hydration / Sensitivity / Barrier — which read like skin metrics) with **product properties**:
  - Hydrating — high
  - Soothing — medium
  - Active intensity — 10%
  - Use existing icons (Droplet, Snowflake/Sparkles, Sparkles/Zap from lucide-react).
- Replace the three "adjustment" tiles (Boost / Calm / Night) with **product usage guidance**:
  - Apply — AM + PM
  - Pair with — moisturizer
  - Avoid — strong acids
- Keep the Risks & Usage collapsible, View routine + See Alternatives buttons, and the add-to-routine confirm modal as-is.

## Technical Notes
- New CSS keyframes in `src/index.css`: `scan-sweep` (translateY 0→100% loop) and `ocr-reveal` (width 0→100% with stagger via inline `animationDelay`). Add corresponding `.animate-scan-sweep` utility.
- No new dependencies. Reuse `glass`, `glass-inner`, `glass-soft`, `font-display`, gradient tokens.
- All existing navigation handlers (`onBack`, `onConfirm`, `onAdd`, `onAlternatives`, `onDone`) stay intact — pure visual + copy refactor.

## Out of Scope
- Real OCR / camera APIs.
- Changes to Splash, Dashboard, Home, Alternatives screens.
