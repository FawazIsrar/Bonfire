---
name: Ember & Hearth
colors:
  surface: '#fdf9ef'
  surface-dim: '#dddad0'
  surface-bright: '#fdf9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3e9'
  surface-container: '#f1eee4'
  surface-container-high: '#ece8de'
  surface-container-highest: '#e6e2d8'
  on-surface: '#1c1c16'
  on-surface-variant: '#5a413b'
  inverse-surface: '#31312a'
  inverse-on-surface: '#f4f0e7'
  outline: '#8e7069'
  outline-variant: '#e2bfb6'
  surface-tint: '#b22b06'
  primary: '#af2903'
  on-primary: '#ffffff'
  primary-container: '#d2421d'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a2'
  secondary: '#845400'
  on-secondary: '#ffffff'
  secondary-container: '#ffb13e'
  on-secondary-container: '#6f4600'
  tertiary: '#5f5b5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#787372'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a2'
  on-primary-fixed: '#3c0700'
  on-primary-fixed-variant: '#8a1c00'
  secondary-fixed: '#ffddb5'
  secondary-fixed-dim: '#ffb958'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#e8e1df'
  tertiary-fixed-dim: '#ccc5c3'
  on-tertiary-fixed: '#1e1b1a'
  on-tertiary-fixed-variant: '#4a4645'
  background: '#fdf9ef'
  on-background: '#1c1c16'
  surface-variant: '#e6e2d8'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Anybody
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  price-display:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 20px
  container-max: 1200px
---

## Brand & Style

The design system for this brand is built around a **Modern Gastropub** aesthetic, blending the high-energy warmth of a wood-fired kitchen with a clean, contemporary digital experience. The brand personality is social, flavorful, and artisanal. It aims to evoke an immediate appetite through rich, tactile visuals and a "hearth-side" warmth.

The visual style is a hybrid of **Minimalism** and **Tactile Design**. We utilize expansive whitespace (or in this case, "cream-space") to allow high-resolution food photography to dominate the visual hierarchy. Subtle depth is added through soft shadows and layered paper-like surfaces, nodding to traditional physical menus while maintaining the speed and clarity of a modern SaaS-level interface.

## Colors

The palette is rooted in the thermodynamics of a bonfire. 

- **Primary & Secondary:** We use a fiery gradient of deep orange-red and sunset amber. These are used for primary actions, price highlights, and "Hot" deal badges.
- **Background:** A warm off-white (`#F9F5EB`) replaces pure white to reduce eye strain and mimic the texture of artisanal parchment or heavy menu cardstock.
- **Typography:** A dark charcoal (`#2B2827`) is used instead of pure black to maintain a softer, more organic feel against the cream background.
- **Semantic:** Use the accent red specifically for urgent promotions, "spicy" indicators, and high-value discount alerts.

## Typography

The typographic system balances impact with utility. 

**Anybody** is the voice of the brand—bold, slightly condensed, and highly energetic. It should be used for all major section headers and promotional "hooks." 

**Manrope** provides a clean, neutral counter-balance for ingredient lists and descriptions, ensuring maximum readability even at small sizes on mobile devices. 

**Space Grotesk** is reserved for technical and numerical data—prices, quantity counts (e.g., "10 Pieces"), and navigational labels. Its geometric nature adds a modern, "kitchen-tech" edge to the system.

For mobile, `display-lg` should scale down to `36px` to ensure titles do not wrap awkwardly.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

**Rhythm:** We use an 8px base grid, but allow for 4px increments for tight component internals (like label-to-input spacing).

**Menu Logic:** Food items are displayed in a responsive grid. On desktop, use a 3-column layout for standard menu items and a 2-column layout for "Combos" or "Deals" to allow larger imagery. On mobile, transition to a single-column stack with horizontal scrolling for "Featured Deals."

**Negative Space:** Large `2xl` (64px) vertical gaps should be used between major sections (e.g., between "Appetizers" and "Signature Pizzas") to allow the design to "breathe" and prevent the information density from becoming overwhelming.

## Elevation & Depth

Hierarchy is established using a **Tonal Layering** approach combined with **Ambient Shadows**.

1.  **Base Layer:** The off-white background (`#F9F5EB`).
2.  **Surface Level:** Cards and containers use a pure white (`#FFFFFF`) background with a very soft, diffused shadow (`0px 4px 20px rgba(43, 40, 39, 0.05)`). This makes the food items appear to rest on top of the menu.
3.  **Raised Level:** Floating action buttons or active "Deal" banners use a slightly more aggressive shadow and a thin 1px border using the secondary color.
4.  **Imagery:** Food photos should be treated with a subtle drop shadow or isolated on transparent backgrounds to create a "pop-out" 3D effect, making the products feel reachable.

## Shapes

The shape language is **Rounded**, reflecting the organic curves of pizzas, burgers, and bowls. 

- **Standard Cards:** Use 1rem (16px) corner radius to feel friendly and modern.
- **Buttons:** Use fully rounded (pill-shaped) corners for primary actions to distinguish them from informational cards.
- **Badges:** Use a smaller 4px radius for tags like "Spicy," "New," or "Vegan."
- **Checkers:** The traditional red-and-white checkered pattern can be used as a decorative "footer" or "divider" element, but should be strictly restricted to these areas to avoid cluttering the clean UI.

## Components

### Buttons
- **Primary:** Solid Primary Orange-Red with white `Space Grotesk` text. Pill-shaped.
- **Secondary:** Outlined in Primary Orange-Red with a 2px stroke.
- **Ghost:** No border, Primary Orange-Red text, used for "See More" or "View Details."

### Food Cards
- **Structure:** Top-aligned image (aspect ratio 4:3), followed by `headline-sm` for the title, `body-sm` for ingredients, and `price-display` in the bottom right.
- **Interaction:** On hover/tap, the image should scale slightly (1.05x) to create a tactile feel.

### Promotional Banners
- **Style:** Full-width containers using a Secondary Amber background. Use `display-lg` typography for the offer and a clear Primary Button.
- **Imagery:** Use "splatter" or "flame" mask effects for high-quality food photography to integrate with the background.

### Input Fields
- **Style:** Light cream background with a 1px border in a muted version of the neutral charcoal.
- **Focus State:** Border changes to Primary Orange-Red with a soft outer glow.

### Chips & Tags
- Used for dietary restrictions or "Deal Type" (e.g., "Family Fun"). Use low-saturation versions of the brand colors to ensure they don't compete with the main Call-To-Action.