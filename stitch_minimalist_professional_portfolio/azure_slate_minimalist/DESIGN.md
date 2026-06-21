---
name: Azure Slate Minimalist
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#444653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#757684'
  outline-variant: '#c5c5d5'
  surface-tint: '#3c55bf'
  primary: '#3953bd'
  on-primary: '#ffffff'
  primary-container: '#546cd7'
  on-primary-container: '#fffbff'
  inverse-primary: '#b9c3ff'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#4e5d70'
  on-tertiary: '#ffffff'
  tertiary-container: '#66768a'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#1f3ba6'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d4e4fb'
  tertiary-fixed-dim: '#b8c8de'
  on-tertiary-fixed: '#0c1d2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  slate-deep: '#2D3748'
  electric-teal: '#4FD1C5'
  warning-amber: '#FECA57'
  error-coral: '#FF6B6B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 120px
---

## Brand & Style

This design system is engineered for a high-end, professional portfolio that balances technical precision with creative flair. The brand personality is sophisticated, calm, and hyper-modern, targeting an audience that values clarity, performance, and attention to detail.

The visual direction follows a **Modern Minimalist** approach with subtle **Glassmorphism** accents. It relies on extreme negative space to create a "gallery" feel, where content is the protagonist. The interface should feel "cool" to the touch—achieved through a desaturated base palette interrupted by high-energy, sharp-focus interactive elements. Expect crisp edges, refined typography, and purposeful motion that emphasizes a tech-forward identity.

## Colors

The color strategy utilizes a high-contrast foundation to ensure professional readability. The background is a "Crisp White" (`#F8FAFC`), providing a cooler temperature than pure white. 

- **Primary:** A vibrant Periwinkle-Blue (`#667EEA`) used for primary actions and active states.
- **Secondary:** Deep Charcoal (`#1A1A1A`) reserved for primary headings and heavy structural elements to anchor the design.
- **Tertiary:** A muted Slate Blue (`#B9C9DF`) used for secondary backgrounds, borders, and decorative elements to soften the transition between light and dark.
- **Accents:** Electric Teal is introduced for success states or subtle highlights, while Coral and Amber handle functional feedback.

## Typography

The typography system is built on **Inter** for its neutral, systematic clarity and excellent legibility at all scales. To reinforce the "tech-forward" and professional nature of a portfolio, **JetBrains Mono** is introduced as a secondary typeface for labels, tags, and small metadata.

Hierarchies are established through significant weight changes rather than just size. Display headings use a Tight letter-spacing (`-0.02em`) to feel more impactful and editorial. Body text is kept spacious with a 1.5x line-height ratio to ensure a relaxed reading experience amidst the generous layout whitespace.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop to maintain a premium, curated feel. Content is centered within a 1280px container, utilizing a 12-column structure with generous 32px gutters.

The spacing rhythm follows an 8px base unit. A "Section Gap" of 120px is mandated between major content blocks to ensure the minimalist narrative remains uncrowded. On mobile, the 12-column grid collapses to a 4-column fluid layout with reduced margins, while maintaining the vertical rhythm to emphasize the professional hierarchy.

## Elevation & Depth

Visual hierarchy is conveyed through **Glassmorphism** and **Tonal Layers** rather than heavy shadows.

1.  **Level 0 (Base):** Crisp light gray (`#F8FAFC`).
2.  **Level 1 (Cards/Floating Elements):** White surfaces with a very soft, high-diffusion shadow (0px 4px 20px, 5% opacity of Secondary color). 
3.  **Level 2 (Overlays/Navigation):** Semi-transparent white (`rgba(255, 255, 255, 0.7)`) with a 12px backdrop-blur filter. This creates a "frosted" effect that allows background colors to bleed through subtly.
4.  **Interaction:** Hover states should not use shadows; instead, use a subtle "lift" via scale (1.02x) or a transition to the Primary color for borders.

## Shapes

The shape language is **Soft** and precise. A 0.25rem (4px) base radius is used for small elements like checkboxes and inputs. For larger components like project cards and buttons, use a 0.5rem (8px) radius. 

Avoid fully rounded "pill" shapes except for purely decorative tags or status indicators. The goal is to maintain a professional, slightly architectural structure that feels "built" rather than organic.

## Components

### Buttons
- **Primary:** Solid `#667EEA` with white text. High-contrast, no shadow, 8px corner radius.
- **Ghost:** Transparent background with a 1px border of `#B9C9DF`. Text in `#1A1A1A`.

### Project Cards
- Use Level 1 elevation (soft shadow). 
- Images should have a subtle greyscale filter that transitions to full color on hover.
- Metadata is styled in **JetBrains Mono** at `label-sm`.

### Input Fields
- Underlined or subtly bordered (1px `#B9C9DF`). 
- Focus state switches the border to Primary color with a 2px thickness.
- Labels are always positioned above the input in `label-md` weight.

### Navigation
- Sticky header using the Glassmorphism effect (backdrop-blur).
- Active links are indicated by a 2px horizontal bar in Primary color centered beneath the text, rather than a color change.

### Chips & Tags
- Rectangular with a 4px radius. 
- Background: `#B9C9DF` at 20% opacity. 
- Text: `#2D3748` in `label-sm`.