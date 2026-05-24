# Timeouts — Visual Language

Validated 2026-05-01. This is the canonical visual formula for Timeouts. Every photographic asset (marketing, social, app store, in-app moments, hero) derives from this formula.

## The concept

A real photograph of a mundane moment, annotated by hand in lime marker — as if a coach reviewed tape with a Sharpie. The photo carries the witness; the annotation carries the voice.

The formula is intentionally *not* an illustration system. Illustrations are invented. Photographs are witnessed. Timeouts is anti-wellness because we *show* the moment instead of *symbolizing* it.

Reference: see `visual-language/01_phone-down.png` (a hand placing a phone face-down on a wet bar counter, lime circle + arrow, white "down" with lime underlines).

## The rule

**Palette split — strict:**
- `#000000` (DS `--color-bg`) — dominant ground, crushed shadow, every dark area
- `#FFFFFF` (DS `--color-fg`) — photographic highlights AND the *message word* (the handwritten phrase itself, e.g. "down")
- `#A6FF00` (DS `--color-earned`) — *emphasis marks only*: circle, arrow, asterisk, underline, slash, cross-out

**Critical:** the message word is white. The marks pointing to or emphasizing it are lime. Never the reverse. Never both lime. Never a colored phrase.

**Photograph style:**
- Real photograph aesthetic — disposable film camera, harsh on-camera flash, heavy 35mm grain
- Desaturated to near-monochrome (skin tones drained, no warm wood-amber, no neon-bar-glow)
- Direct flash from upper-left, blowing highlights, crushing shadows to true `#000000`
- Background falls off to pure black where unlit
- Composition: subject in center-third or lower-third, generous black negative space
- Cropping: tight on the subject — partial body only (a hand, a forearm, a shoulder, a knee). **Never a face. Never a smile. Never a full body.**

**Subject rule:**
- Mundane indoor / sidewalk / urban-adjacent moments. A hand, a phone face-down, scuffed sneakers, a kettle, a kitchen counter, a friend's elbow at a picnic, a bus seat, a borrowed lighter.
- **Forbidden subjects** (these are wellness/outdoor cliché): mountain, forest, sunset, sunrise, campfire, cactus, palm, ocean wave, river, hot-air balloon, compass, bear, tent, lotus, candle, crystal, smiling person doing yoga, person meditating.

**Annotation style:**
- Hand-drawn, NOT vector. Stroke uneven, slightly bleeding, looks like Sharpie on a printed photo.
- One emphasis cluster per image: typically `circle around subject + arrow + handwritten word with 1-2 underlines`.
- Word vocabulary: plain-speak, lowercase or all-caps, never sentence-case. Examples: "down", "33 min", "phone face down", "didn't post", "ran into M.", "two hours", "not today", "outside", "borrowed".
- **One annotation cluster per image.** Never multiple competing marks.

## Validated prompt (template)

This is the prompt that produced `01_phone-down.png`. Use as the canonical template — substitute `[SUBJECT]` and `[ANNOTATION]` only. Do NOT loosen any other constraint.

```
Generate ONE photograph. Square 1:1 aspect ratio.

Hard color rule: the image contains only three colors. Pure black #000000 dominates as the background and as crushed shadow. Pure white #FFFFFF appears only as a small handwritten word. Bloomberg lime green #A6FF00 (a harsh, electric, near-fluorescent yellow-green — NOT olive, NOT kelly, NOT forest, NOT sage) appears only as one hand-drawn marker annotation. No other colors. No browns, no beiges, no creams, no warm tones, no navy, no rust, no orange, no earth tones of any kind.

Forbidden subjects, do not include any of these: mountains, trees, forest, sunset, sunrise, campfire, cactus, palm, ocean, wave, river, hot-air balloon, compass, bear, tent, sky, clouds, sun, moon, stars, landscape scenery of any kind. This is not an outdoor scene.

Style: a real documentary photograph taken with a disposable film camera. Heavy 35mm grain. Direct harsh on-camera flash from upper-left, blowing out highlights and crushing shadows to true black. Slightly cold color cast. NOT cinematic. NOT moody-bokeh. NOT lifestyle. The photograph looks ugly and honest, like a friend took it without thinking.

Subject, tightly cropped: [SUBJECT — partial body only, no face, mundane indoor/urban moment].

On top of the photograph, drawn after the fact in marker (uneven stroke, slightly bleeding ink, hand-drawn — NOT vector, NOT clean): [ANNOTATION — describe the marks in lime #A6FF00 (circle/arrow/underline) and the message word in white #FFFFFF].

Reject any output that looks like: a vintage outdoor brand illustration, a flat vector scene, a cozy bar with warm amber light, a stylized illustration of a hand. This must look like a real photograph with grain, harsh flash, and crushed black shadows.
```

## Scene starters (canonical pack)

Each entry: `[SUBJECT] / [ANNOTATION]`. Mix and remix.

1. **Phone face-down on bar counter** (validated as `01_phone-down.png`) — a hand placing a black smartphone face-down on a wet wooden bar counter, condensation rings visible / lime circle around phone, lime arrow from right edge, white word "down" with two lime underlines below
2. **Scuffed sneakers on a curb** — top-down view of two scuffed white court sneakers on concrete with a piece of gum nearby / lime rectangle around the left shoe, white word "33 min" inside it, lime arrow pointing to the gum
3. **Kettle mid-pour** — a kettle pouring water into a mug on a kitchen counter, frozen mid-stream, harsh flash / lime asterisk top-left, white word "morning" small, lime underline
4. **Hand placing phone in jacket pocket** — a hand sliding a phone into the inside pocket of a jacket, jacket lining textured / lime circle around the pocket, white word "away" with lime underline
5. **Friend's elbow at a picnic table** — a partial elbow leaning on a wooden picnic table, plastic cup blurry in foreground / lime circle around elbow, white word "ran into M." in cursive, lime arrow
6. **Bus seat empty, window light** — an empty bus seat with the back-of-someone's-head partially in frame, harsh window light, grain heavy / lime arrow pointing to the empty seat, white word "outside" with lime underline
7. **Half-eaten apple on a desk** — an apple with one bite taken on a dark wood desk beside a closed laptop / lime circle around the apple, white word "two hours" with two lime underlines
8. **Sweat on a forehead** — extreme close crop on a forehead and temple with a single bead of sweat / lime small circle near the bead, white timestamp "17:42"
9. **A hand turning a key in a door** — a hand mid-turn on a brass door key, harsh flash, the rest crushes black / lime circle around the keyhole, white word "home" with one lime underline
10. **Borrowed lighter mid-pass** — two partial hands, one passing a Bic to the other, flash on the lighter / lime curved arrow between hands, white word "borrowed"
11. **Crumpled receipt in a hand** — a hand holding a crumpled paper receipt, harsh flash on the paper / lime circle around the receipt, white word "didn't post"
12. **Wet sneakers from rain** — top-down on two soaked sneakers on a wet sidewalk, raindrops still landing / lime asterisk, white word "rain walk", lime underline

## Where to apply

| Surface | How |
|---|---|
| App store screenshots | Hero image uses one validated scene; UI overlays the lower portion |
| Instagram / TikTok grid | Pure photo-with-annotation as feed posts; carry the `#A6FF00 + #000000 + #FFFFFF` rule across the grid for cohesion |
| Landing page hero | Full-bleed photo, annotation positioned to lead the eye to the CTA below |
| In-app empty / success / streak moments | Smaller crops (4:5 or 1:1), annotation tied to the user's actual milestone ("33 min", "two hours") |
| Onboarding screens | One photo per concept screen; annotation is the headline, not a separate type element |
| Press / brand kit | Full pack of scene starters as PNG + the validated prompt as a `.txt` |
| Merch | The `circle + arrow + handwritten word` annotation system survives without the photo — works as a sticker, t-shirt, hoodie back print on plain black |

## Anti-list (short, sharp)

The image is wrong if any of these appear:

1. Earth-tone color creep (brown, beige, cream, sage, olive, navy, rust, warm amber bar light)
2. A face, a smile, or a full-body figure
3. Outdoor landscape (mountain, tree, sun, sky, water, campfire, hot-air balloon)
4. Vector-flat aesthetic, smooth gradient, no grain, no flash hardness
5. Multiple competing annotation clusters, decorative lime use (lime as fill, lime in the photo itself, lime borders)
6. Sentence-case or wellness-vocabulary annotation ("Mindful moment", "Take a breath", "You earned it") — the voice is curt and witnessed, not cheerful
7. The handwritten word in lime instead of white (palette split inverted)

## How to extend

When a new scene is needed:

1. Pick a mundane indoor/urban moment from real life (not from a moodboard of nature)
2. Strip the body to a partial — hand, knee, elbow, back of head
3. Pick ONE plain-speak annotation phrase, lowercase, ≤4 words
4. Run the validated prompt with `[SUBJECT]` and `[ANNOTATION]` filled in
5. Validate against anti-list before using
6. If output drifts to outdoor cliché, add the scene-specific forbidden term to the prompt (e.g. `do not include warm bar amber light` if it keeps generating Bourbon Bar Cinematic)

## Source files

- DS palette: [packages/tokens/src/color.json](../../packages/tokens/src/color.json)
- Brand doctrine: [doctrine.md](doctrine.md)
- Brand voice: [BRAND.md](BRAND.md)
- Reference image (save manually from chat): `visual-language/01_phone-down.png`
- Exploratory illustration brief (deprecated layers L2/L3): [illustrations/PROMPT.md](illustrations/PROMPT.md)
