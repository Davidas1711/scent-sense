# 🛠️ Scent Sense — AI Implementation Prompt
**Paste this prompt into Cursor / Windsurf / Antigravity to begin building.**  
Reference `scent_sense_PRD.md` throughout every step.

---

## SYSTEM CONTEXT (paste at top of every session)

```
You are a senior React Native / Expo engineer building "Scent Sense" — a high-end fragrance discovery app.
Your design reference is the PRD file: scent_sense_PRD.md.
Always read the relevant PRD section before writing any code for a feature.
Use TypeScript. Use NativeWind or StyleSheet for styling. Prefer functional components with hooks.
The visual language is "Apple Liquid Glass 2026": frosted glass, blur, gold gradients, eggshell background (#F4F1EA).
```

---

## PHASE 1 — Project Foundation

### Step 1.1 — Initialize Project
```
Read PRD Section 1 (Visual Identity).

Initialize a new Expo project with TypeScript template.
Install dependencies:
- expo-blur (for glass effects)
- react-native-reanimated (for animations)
- react-native-gesture-handler (for swipe deck)
- @shopify/flash-list (for infinite scroll)
- zustand (for global state)
- react-navigation (tabs + stack)

Create a global design token file at /constants/theme.ts with:
- Colors from PRD Section 1.2
- GlassStyle object from PRD Section 1.3
- Typography scale
- Spacing scale
```

### Step 1.2 — Navigation Shell
```
Read PRD Section 1.4 (Navigation Bar).

Build a custom bottom tab navigator using a floating frosted-glass capsule component.
Specs:
- backdropFilter blur: 20px
- background: rgba(255,255,255,0.30)
- border: 0.5px solid rgba(255,255,255,0.50)
- border-radius: 9999 (pill shape)
- 4 tabs: Discovery, Home, Search, Profile (outline icons)
- Positioned with absolute bottom: 24, centered horizontally
- Use expo-blur BlurView as the base container
```

---

## PHASE 2 — Onboarding Flow

### Step 2.1 — Anchor Scent Picker
```
Read PRD Section 2.1.

Build an onboarding screen: OnboardingAnchorScreen.
- Display a searchable grid of 30–50 seed fragrances (use mock data for now).
- User can select 1–5 items. Selected items show a gold checkmark badge.
- "Continue" CTA activates once ≥1 is selected.
- Persist selections to Zustand store as anchorScents: string[].
```

### Step 2.2 — Scent Lane Selection
```
Read PRD Section 2.2.

Build OnboardingLaneScreen.
- 3 toggle buttons: Feminine-Leaning | Masculine-Leaning | Unisex
- Multi-select allowed.
- Unisex is pre-selected by default and cannot be the sole deselected option.
- Add a subtle info tooltip: "Unisex scents always appear in your feed."
- Persist to Zustand: scentLane: ('Feminine' | 'Masculine' | 'Unisex')[]
```

### Step 2.3 — Tasting Flight Seed Logic
```
Read PRD Section 2.3.

Write a utility function: buildTastingFlight(scentLane, fragranceDb) → Fragrance[20]

Rules:
- 65% from chosen gender lane, 35% Unisex
- Forced family distribution (exact counts from PRD table): Blue:3, Woody:3, Floral:3, Gourmand:3, Spicy:2, Citrus:2, Musky:2, Niche:2
- If a family has insufficient entries, backfill from the closest related family.
- Return exactly 20 cards in shuffled order.

Write unit tests for this function covering edge cases (e.g., only Unisex lane selected).
```

---

## PHASE 3 — Discovery Engine (Swipe Deck)

### Step 3.1 — Swipe Card Component
```
Read PRD Section 3.2.

Build a <FragranceCard /> component with two faces:

FRONT:
- High-res bottle image (full bleed)
- Frosted glass footer strip with: Name, Brand, Gender badge (M/W/U), Family chip

BACK (revealed on tap with a flip animation):
- Olfactory Pyramid section: Top / Mid / Base notes as horizontal pill lists
- Seasonality icons row
- Official bio text (scrollable if long)

Use react-native-reanimated for the card flip (rotateY, 300ms, ease-in-out).
```

### Step 3.2 — Swipe Deck Logic
```
Read PRD Section 3.1 and 3.3.

Build <SwipeDeck /> using react-native-gesture-handler PanGestureHandler.

Swipe mechanics:
- Swipe Right → call onSwipeRight(fragrance): apply +2.0 weight delta to all notes/family
- Swipe Left → call onSwipeLeft(fragrance): apply −1.0 weight delta
- Show a green "YES" badge on right swipe, red "NO" badge on left swipe (opacity tied to drag distance)
- Card rotation: rotate proportionally to horizontal drag (max ±15deg)

Deck renders top 3 cards stacked (z-index), others are pre-loaded off-screen.
After each swipe, pull next card from the recommendation queue.
```

### Step 3.3 — Undo (U-Turn) Button
```
Read PRD Section 3.4.

Add a U-Turn button (bottom-right, frosted pill shape) to the SwipeDeck screen.

Logic:
- Store last swipe in Zustand: lastSwipe: { fragrance, direction, weightDelta } | null
- On press: reverse the weight delta, re-insert the fragrance at position 0 of the deck queue
- Animate the card flying back to center from its exit direction
- Disable button (grey out) if lastSwipe is null
- Reset lastSwipe to null after undo is used (1 undo only)
```

### Step 3.4 — Recommendation Algorithm
```
Read PRD Sections 3.3 and 3.5.

Write the core recommendation engine: getNextCard(userProfile, fragranceDb) → Fragrance

Rules to implement in order:
1. No-U-Turn Rule: if the last 1 swipe was "No" on a family, block that family for next 2 draws
2. Bridge Note Pivot: find notes shared between liked and disliked frags; prioritize those notes in new families
3. Score each candidate fragrance: sum(noteWeights * notePresence) + familyWeight
4. Filter out already-swiped fragrances
5. Return highest-scoring eligible fragrance

Weight Decay job (run on app foreground): if swipeCount % 100 === 0 OR daysSinceDecay >= 7 → multiply all weights by 0.99
```

---

## PHASE 4 — Rating System

### Step 4.1 — Precision Slider
```
Read PRD Section 4.

Build a <RatingSlider /> component:
- Horizontal slider, 0.0 to 5.0, step 0.5, using react-native-reanimated
- Haptic pulse at each 0.5 increment (expo-haptics impactAsync LIGHT)
- Frosted tooltip bubble showing current value (e.g., "4.5") appears to the right of thumb during drag
- Below slider: "Add to Scent Profile" checkbox (default ON)

On submit:
- Save rating to userProfile.ratings[fragranceId]
- If checkbox ON: apply weight delta (mapped 1:1 from PRD Section 4.2) to all notes/family of that fragrance
```

---

## PHASE 5 — Search & Library

### Step 5.1 — Search Screen
```
Read PRD Section 5.

Build SearchScreen with:
- Fuzzy search input (debounced 300ms, uses fuse.js or similar)
- Results as a scrollable list of FragranceCard mini variants
- Empty state: show a "Surprise Me (Top 100)" button that picks 5 random top-100 frags on each tap

Request Scent form (accessible via a "+" button):
- Two fields: Name (TextInput) + Photo (ImagePicker)
- Submit queues to a mock API endpoint (placeholder)
```

---

## PHASE 6 — Review Metacritic Hub

### Step 6.1 — Global Score Display
```
Read PRD Section 6.

On each FragranceCard back face and on a dedicated FragranceDetailScreen:
- Display Global Scent Score as a large number + star visual
- Show breakdown by source (Fragrantica: 4.3, Parfumo: 4.1, etc.)

Build a mock data layer: reviewAggregator.ts
- Input: array of {source, rating, reviewText} objects
- Deduplication: hash reviewText (use SHA-1 or MD5), discard duplicates before averaging
- Output: { globalScore: number, bySource: Record<string, number>, reviews: Review[] }
```

### Step 6.2 — Review Feed
```
Build an infinite-scroll review list using FlashList.
- Filter bar at top: Recent | Highest | Lowest | Relevant (tab style)
- Each review card: source badge, star rating, review text, date
- "Relevant" sort = cosine similarity of reviewer's noted notes vs. user's weight profile (approximate)
```

---

## PHASE 7 — The Wardrobe

### Step 7.1 — Layout & Tabs
```
Read PRD Section 7.

Build WardrobeScreen with:
- Top-right toggle: Shelf View ↔ List View (icon button)
- Shelf View: vertical scroll, large bottle art cards (2-column grid)
- List View: compact rows with name, brand, rating, season chips
- Two primary tabs: "Owned" | "Wishlist" (pill tabs, gold underline on active)
```

### Step 7.2 — Contextual Filter + Vanishing Animation
```
Read PRD Sections 7.3 and 7.4.

Add a filter dropdown to WardrobeScreen:
- Filter by Season (Spring/Summer/Fall/Winter) and/or Scent Profile (Woody/Floral/etc.)
- Multi-select supported

Vanishing animation:
- When filter is applied, non-matching cards animate out with:
  - Scale: 1.0 → 0.0 (200ms)
  - Opacity: 1.0 → 0.0 (200ms)  
  - Blur: 0 → 20px (200ms)
  - Stagger: 30ms delay between each card
- This simulates the "frosted poof" / glass-dissipating effect from PRD
- Matching cards remain in place (no animation)
```

### Step 7.3 — History Log & Direct Rating
```
Read PRD Sections 7.5 and 7.6.

Add a collapsible "Swipe History" section at the bottom of WardrobeScreen:
- Shows all past swipes: bottle thumbnail, name, Yes/No chip, date
- Tap any entry → open FragranceDetailScreen where user can re-rate or add to Owned/Wishlist

Inline rating: each Owned/Wishlist card has a small star icon; tap → RatingSlider bottom sheet appears.
On slider submit, update userProfile.ratings and propagate weight changes immediately.
```

---

## PHASE 8 — Polish & QA

### Step 8.1 — Animation & Haptics Pass
```
Audit all screens for:
- Missing haptic feedback (add expo-haptics where interactions feel "important")
- Transitions between screens (use react-navigation shared element transitions where possible)
- Ensure the frosted glass GlassStyle from theme.ts is applied consistently on: NavBar, Cards, Tooltips, Modals, Filter dropdowns

Run the app on a physical iOS device to verify blur rendering (BlurView does not render in simulator).
```

### Step 8.2 — State & Edge Cases
```
Review all Zustand stores and verify:
- Weight decay runs correctly on foreground resume
- Undo correctly reverts weight AND re-inserts card
- No-U-Turn rule fires correctly after a No swipe
- Rating with "Add to Scent Profile" OFF does not mutate weights
- Tasting flight exactly 20 cards with correct family distribution
- Deduplication hashing in reviewAggregator removes cross-posted reviews

Write integration tests for the recommendation engine and rating weight mapper.
```

### Step 8.3 — Mock Data & API Prep
```
Replace all mock data files with a typed API client layer (apiClient.ts).
Use placeholder base URL: https://api.scentsense.app/v1

Endpoints to stub:
- GET /fragrances (paginated, filterable by family/gender)
- GET /fragrances/:id/reviews
- POST /ratings
- POST /swipes
- POST /scent-requests
- GET /top100

Add environment variable support (.env): EXPO_PUBLIC_API_URL
```

---

## ✅ Build Order Summary

| Phase | Feature | Est. Complexity |
|---|---|---|
| 1 | Project setup + design system + nav | Medium |
| 2 | Onboarding + tasting flight | Medium |
| 3 | Swipe deck + algorithm + undo | High |
| 4 | Rating slider | Low |
| 5 | Search + library | Medium |
| 6 | Review Metacritic hub | Medium |
| 7 | Wardrobe + vanishing animation | High |
| 8 | Polish + QA + API layer | Medium |

**Always reference `scent_sense_PRD.md` before implementing any step.**
