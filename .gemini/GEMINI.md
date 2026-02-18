# Scent Sense — Agent Rules

## Project Overview
Scent Sense is a high-end fragrance discovery app built with React Native + Expo (TypeScript).
Design language: "Apple Liquid Glass 2026" — frosted glass, blur, gold gradients, eggshell background (#F4F1EA).
Always read the relevant PRD section (`docs/scent_sense_PRD.md`) before writing code for any feature.

---

## Git Commit Rules

Every commit must follow this format exactly: `<type>(<scope>): <short description>`

### Types
| Type | When to use |
|---|---|
| `feat` | A new feature or screen |
| `fix` | A bug fix |
| `style` | UI/visual changes, no logic change |
| `refactor` | Code restructure, no behavior change |
| `chore` | Setup, config, dependencies, tooling |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `perf` | Performance improvement |

### Scopes
Use the feature/module name, lowercase, no spaces:
`onboarding` | `swipe-deck` | `algorithm` | `rating` | `wardrobe` | `search` | `reviews` | `nav` | `auth` | `theme` | `api` | `config` | `deps` | `root`

### Short Description Rules
- Present tense: "add", "fix", "update" — not "added" or "fixed"
- Under 60 characters
- No period at the end
- Must explain the **purpose**, not just what changed

### Examples
```bash
feat(onboarding): add anchor scent picker with multi-select
fix(swipe-deck): prevent undo button firing when history is empty
style(theme): apply glass blur spec to nav bar capsule
feat(algorithm): implement no-u-turn rule for family blocking
feat(algorithm): add 1% weight decay job on foreground resume
chore(config): initialize expo project with typescript template
chore(deps): install reanimated, gesture-handler, expo-blur
refactor(wardrobe): extract vanishing animation into reusable hook
test(algorithm): add unit tests for tasting flight distribution
docs(root): add PRD and implementation prompt to project root
```

### Hard Rules
- Never commit `node_modules/`, `.env`, or build artifacts
- Never commit directly to `main` if a feature branch exists
- Always stage and review changes before committing

---

## Branching Convention

For each Phase in the implementation prompt, create a feature branch before starting work.

**Branch naming:** `feature/<scope>-<short-description>`

**Examples:**
- `feature/onboarding-anchor-picker`
- `feature/swipe-deck-core`
- `feature/algorithm-recommendation-engine`
- `feature/wardrobe-vanishing-animation`

**Workflow per Phase:**
1. `git checkout -b feature/<branch-name>`
2. Build the feature (commit regularly using the convention above)
3. `git checkout main`
4. `git merge feature/<branch-name> --no-ff`
5. `git push origin main`
6. `git branch -d feature/<branch-name>`

---

## Tech Stack
- **Framework:** React Native + Expo (SDK 54, TypeScript)
- **Animations:** `react-native-reanimated`
- **Gestures:** `react-native-gesture-handler`
- **Glass Effects:** `expo-blur`
- **Lists:** `@shopify/flash-list`
- **State:** `zustand`
- **Navigation:** `@react-navigation/native` + `@react-navigation/stack`
- **Design Tokens:** `constants/theme.ts`

## Code Style
- Functional components with hooks only
- TypeScript strict mode — no `any`
- StyleSheet or inline styles — no TailwindCSS unless explicitly requested
- Use `COLORS`, `GLASS`, `TYPOGRAPHY`, `SPACING` from `constants/theme.ts` for all styling
