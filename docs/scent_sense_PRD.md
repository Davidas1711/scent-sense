# 📄 Product Requirement Document — Scent Sense v1.1
**Author:** David Santos  
**Version:** 1.1  
**Type:** Mobile App (iOS/Android)  
**Stack Assumption:** React Native + Expo (or swap for your preferred framework)

---

## 0. Project Vision

Scent Sense is a high-end, data-centric fragrance discovery utility. It replaces marketing fluff with chemical-note precision and verified global review data. Think: Tinder for perfume, backed by Metacritic-style aggregation.

---

## 1. Visual Identity & Design System

### 1.1 Design Language
- **Style:** "Apple Liquid Glass 2026" — dynamic refraction, background blur, specular highlights.
- **Feel:** Premium, minimal, tactile.

### 1.2 Color Palette
| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#F4F1EA` (Muted Eggshell) | App background — matte, non-distracting |
| `accent-gold` | Gold/Platinum gradient | High-value interactions, CTAs |
| `glass-white` | `rgba(255,255,255,0.30)` | Frosted glass surfaces |
| `border-hairline` | `rgba(255,255,255,0.50)` | 0.5px borders on glass elements |

### 1.3 Glass Component Spec (reusable)
```
blur: 20px (backdropFilter)
background: rgba(255, 255, 255, 0.30)
border: 0.5px solid rgba(255, 255, 255, 0.50)
border-radius: 24px (capsule) or 16px (card)
shadow: 0 4px 24px rgba(0,0,0,0.08)
```

### 1.4 Navigation Bar
- **Type:** Floating frosted-glass capsule, pinned bottom.
- **Blur:** 20px background blur, 30% white opacity, 0.5px white hairline border.
- **Icons (outline style):**
  - 🃏 Discovery (Stacked Cards)
  - 🏠 Home (House)
  - 🔍 Search (Loupe)
  - 👤 Profile (Person)

---

## 2. Onboarding — "Scent DNA Test"

### 2.1 Anchor Scents
- User selects **1–5 fragrances** they already love.
- These seed the initial recommendation weights.

### 2.2 Scent Lane (Gender Preference)
- Options: `Feminine-Leaning` | `Masculine-Leaning` | `Unisex`
- Multi-select allowed.
- **Unisex Rule:** Unisex scents are "Universal" — always appear in all feeds regardless of lane.
- **Open Discovery Rule:** Cross-gender scents surface automatically if chemical similarity score > 90%.

### 2.3 First 20 Swipes — "Tasting Flight" (DNA Baseline)
Prevent early "Blue-Scent Lockout" with a hard-coded, curated flight:

| Metric | Value |
|---|---|
| Chosen gender lane | 65% |
| Unisex | 35% |

**Forced Family Distribution (20 cards):**
| Family | Count |
|---|---|
| Blue | 3 |
| Woody | 3 |
| Floral | 3 |
| Gourmand | 3 |
| Spicy | 2 |
| Citrus | 2 |
| Musky | 2 |
| Niche / Wildcard | 2 |

---

## 3. Discovery Engine — "The Swipe Deck"

### 3.1 Swipe Interaction Logic
| Gesture | Weight Delta |
|---|---|
| Swipe Right (Yes) | +2.0 |
| Swipe Left (No) | −1.0 |

### 3.2 Card Architecture

**Front Face:**
- High-res bottle image
- Fragrance Name + Brand
- Gender Logo badge: `M` / `W` / `U`
- Scent Profile chip (e.g., Woody, Floral, Musky)

**Back Face (revealed on tap):**
- Olfactory Pyramid: Top Notes / Mid Notes / Base Notes
- Seasonality Icons (Spring 🌸 / Summer ☀️ / Fall 🍂 / Winter ❄️)
- Official brand bio / description

### 3.3 Momentum-Based Discovery

#### Bridge Notes (Pivot Logic)
- App tracks "Bridge Notes" shared between liked and disliked scents.
- **Example:** User likes Blue scent, dislikes "Blue + Seaweed" → app identifies shared note (Ambroxan) and pivots to Ambroxan in a new family (e.g., Woody) rather than staying in Blue.

#### No-U-Turn Rule
- If user swipes `No` on a discovery category (e.g., Floral):
  - App must serve **2 neutral/different categories** before returning to the user's highest-weighted "Safe" category.
  - Prevents algorithm tunnel-vision.

### 3.4 Undo Mechanic — "The U-Turn Button"
- **Location:** Bottom-right of the swipe screen.
- **Icon:** Back/undo arrow.
- **Function:** Reverses the most recent swipe.
- **Algorithm behavior:** Reverts the last weight change (±2.0 or ±1.0) and returns the previous card to the top of the deck.
- **Limit:** 1 undo per swipe (no multi-step undo).

### 3.5 Weight Decay
- All global weights decay by **1% every 100 swipes** OR every **7 days** (whichever comes first).
- Ensures the user profile stays elastic and evolves over time.

---

## 4. Precision Rating System

### 4.1 Interaction
- **Component:** Horizontal slider, range `0.0 – 5.0`, step `0.5`.
- **Haptic feedback:** Triggered at each 0.5 increment.
- **Tooltip:** A frosted numerical bubble (e.g., `"4.5"`) pops up to the right of the user's finger while sliding.

### 4.2 Algorithmic Weight Mapping (1:1)
| Stars | Weight |
|---|---|
| 5.0 | +5.0 |
| 4.5 | +4.5 |
| ... | ... |
| 0.5 | −4.5 |
| 0.0 | −5.0 (Hard Avoid) |

### 4.3 Profile Toggle
- **Checkbox:** "Add to Scent Profile" — default **ON**.
- When ON: rating influences the Discovery Engine weights.
- When OFF: rating is saved to the user's library but does not affect discovery.

---

## 5. Search & Library

### 5.1 Smart Autocomplete
- Handles shorthand input and typos (fuzzy search).
- Suggestions appear as frosted-glass chips below the search bar.

### 5.2 Empty Search State
- Displays a randomized **"Top 100" button**.
- On tap: surfaces **5 random scents** from the top-100 database entries.
- Resets on each tap (re-randomizes).

### 5.3 Request Scent (Missing Entry)
- Form with two fields:
  1. Fragrance Name (text input)
  2. Photo Upload (camera or gallery)
- Submitted to a moderation queue.

---

## 6. Review Hub — "The Metacritic"

### 6.1 Verified Sources Only
Aggregated from:
- Fragrantica
- Parfumo
- Basenotes
- Sephora
- Nordstrom
- Luckyscent
- Saks Fifth Avenue
- Neiman Marcus
- FragranceNet

> ❌ No Reddit. No social media. No unverified sources.

### 6.2 Global Scent Score
- Calculated as a **weighted average** of stars across all active platforms.
- Displayed as a single numerical score (e.g., `4.2 / 5.0`).

### 6.3 Deduplication
- **Method:** Hash-matching of review text body.
- **Purpose:** Prevents "cross-post" inflation when the same review text appears on multiple platforms.

### 6.4 Review Feed
- **Infinite scroll.**
- **Filter options:** `Recent` | `Highest` | `Lowest` | `Relevant`

---

## 7. The Wardrobe (User Profile)

The Wardrobe is the user's personal fragrance library and management hub.

### 7.1 Layout Toggle
| View | Description |
|---|---|
| Shelf View | High-res vertical scrolling cards, bottle art prominent |
| List View | Compact, text-heavy — for power users |

### 7.2 Library Tabs
- **Owned** — Scents currently in the user's physical collection.
- **Wishlist** — Scents saved for future purchase.

### 7.3 Contextual Discovery Filter
- **Component:** Dropdown menu.
- **Filter dimensions:**
  - By **Season:** Spring / Summer / Fall / Winter
  - By **Scent Profile:** Woody / Floral / Musky / etc.
- **Purpose:** "Scent of the Day" selection based on current weather or mood.

### 7.4 "The Vanishing" Interaction
- When a filter is applied, non-matching cards disappear via a **"frosted poof" animation** — glass dissipating effect.
- High-end, physics-based feel. Not a simple fade.

### 7.5 History Log
- Secondary, subtle section.
- Tracks all past swipes (Yes / No) with timestamps.
- Allows users to review and reconsider previously dismissed fragrances.

### 7.6 Direct Rating Access
- Users can adjust their `0.0–5.0` star rating directly from the Wardrobe view.
- Rating update instantly propagates to global Scent Profile weights.

---

## 8. Data Models (Reference)

### Fragrance
```ts
{
  id: string
  name: string
  brand: string
  gender: 'M' | 'W' | 'U'
  family: 'Blue' | 'Woody' | 'Floral' | 'Gourmand' | 'Spicy' | 'Citrus' | 'Musky' | 'Niche'
  notes: {
    top: string[]
    mid: string[]
    base: string[]
  }
  seasons: ('Spring' | 'Summer' | 'Fall' | 'Winter')[]
  imageUrl: string
  officialBio: string
  globalScore: number // aggregated
}
```

### UserProfile
```ts
{
  userId: string
  scentLane: ('Feminine' | 'Masculine' | 'Unisex')[]
  anchorScents: string[] // fragrance IDs
  weights: Record<string, number> // noteId → weight
  familyWeights: Record<string, number>
  swipeCount: number
  lastDecayTimestamp: Date
  owned: string[] // fragrance IDs
  wishlist: string[] // fragrance IDs
  ratings: Record<string, number> // fragranceId → 0.0–5.0
  swipeHistory: { fragranceId: string; direction: 'yes' | 'no'; timestamp: Date }[]
}
```

---

## 9. Key Business Rules (Summary)

| Rule | Value |
|---|---|
| Open Discovery threshold | Chemical similarity > 90% |
| Tasting flight size | 20 cards |
| Gender ratio in flight | 65% chosen lane / 35% Unisex |
| Swipe Right weight | +2.0 |
| Swipe Left weight | −1.0 |
| Rating weight range | −5.0 to +5.0 |
| No-U-Turn buffer | 2 neutral categories before returning to safe |
| Weight decay rate | 1% per 100 swipes or 7 days |
| Max undo depth | 1 swipe |

---

## 10. Out of Scope (v1.1)
- Social features (following, sharing)
- In-app purchases / e-commerce
- Push notifications
- Offline mode
- AR try-on
