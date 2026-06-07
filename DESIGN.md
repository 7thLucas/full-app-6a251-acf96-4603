# Vault — Design System

## Visual Identity
- **App name displayed as**: Vault
- **Aesthetic**: Premium fintech — dark navy backgrounds, clean white cards, crisp typography, confident spacing
- **Mood**: Trust, calm, precision. Think Revolut meets Apple Card — minimal but warm.

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0f172a` | Main dark navy background |
| `--color-bg-card` | `#1e293b` | Card/panel surfaces |
| `--color-bg-elevated` | `#334155` | Elevated elements, hover states |
| `--color-accent` | `#2563eb` | CTAs, active tabs, interactive highlights |
| `--color-accent-light` | `#3b82f6` | Lighter accent for gradients |
| `--color-positive` | `#22c55e` | Income, positive indicators, success |
| `--color-warning` | `#f59e0b` | Pending, caution states |
| `--color-danger` | `#ef4444` | Negative balance, errors, freeze state |
| `--color-text-primary` | `#f1f5f9` | Primary white-ish text |
| `--color-text-secondary` | `#94a3b8` | Secondary/muted labels |
| `--color-text-tertiary` | `#64748b` | Placeholder, inactive |
| `--color-border` | `#1e293b` | Dividers and borders |

## Typography
- **Font family**: `Inter` (Google Fonts) — clean, legible, modern sans-serif
- **Balance display**: 42–48px, font-weight 700, letter-spacing -0.02em
- **Section headings**: 20–22px, font-weight 600
- **Body / transaction rows**: 14–16px, font-weight 400–500
- **Labels / tags**: 11–12px, font-weight 500, uppercase tracking

## Layout & Spacing
- Mobile-first: max-width 390px, centered in viewport, full height
- Base spacing unit: 8px
- Card padding: 20–24px
- Section gap: 24px
- Bottom nav height: 64px with safe-area padding
- Rounded corners: cards `border-radius: 16px`, buttons `border-radius: 12px`, tags `border-radius: 20px`

## Component Specs

### Payment Card Component
- Aspect ratio: 1.586:1 (standard card ratio)
- Background: gradient — `linear-gradient(135deg, #1e40af, #7c3aed)` for debit; `linear-gradient(135deg, #0f172a, #334155)` for credit
- Card number: masked as `•••• •••• •••• 4291`
- White text throughout
- Chip icon (SVG or emoji) top-left
- Network logo (VISA / Mastercard wordmark) bottom-right
- Subtle glassmorphism overlay or noise texture optional

### Transaction Row
- Left: 40px circle avatar with category emoji/icon, background `#1e293b`
- Center: Merchant name (bold 15px) + category label (muted 12px)
- Right: Amount (green for positive, white for negative) + date (muted 12px)
- Tap state: subtle background highlight

### Analytics Charts
- Use a lightweight chart library (Chart.js or Recharts)
- Donut chart: stroke width ~20px, gap between segments, center label shows total
- Bar chart: rounded top corners on bars, royal blue for current month, muted slate for last month
- No gridlines on dark bg — use faint opacity lines if needed

### Bottom Navigation
- Background: `#0f172a` with top border `1px solid #1e293b`
- Icon + label for each tab
- Active: royal blue icon + label, optional indicator dot or underline
- Inactive: slate-400 icon + label
- Height: 64px + env(safe-area-inset-bottom)

### Quick Action Buttons (Home screen)
- 4 buttons in a row: Send, Receive, Pay, Top Up
- Each: circular icon container (52px) in `#1e293b`, label below in 11px
- Active/tap: accent blue background on icon container

## Elevation & Shadows
- Cards: `box-shadow: 0 4px 24px rgba(0,0,0,0.4)`
- Modals/overlays: `box-shadow: 0 8px 40px rgba(0,0,0,0.6)`
- Buttons: no shadow — rely on color contrast

## Motion & Interaction
- Tab transitions: instant or 150ms fade
- Freeze card toggle: 300ms scale + color animation
- Transaction list: no animation needed — prioritize performance
- Chart entrance: 600ms ease-in draw animation on first render

## Iconography
- Use Lucide React icon set (already in most React setups) or emoji fallbacks
- Keep icons at 20–24px in the bottom nav, 18–20px inline

## Accessibility
- Minimum contrast ratio 4.5:1 for all text on backgrounds
- Touch targets minimum 44x44px
- Avoid color-only state indicators — pair with text or iconography
