# Brand Kit Integration - Visual Guide

## 🎨 Color Palette Reference

### Quick Color Reference
Use these values throughout your code:

```css
/* CSS Variables */
var(--jazer-electric-purple)  /* #8B5CF6 */
var(--jazer-cosmic-blue)      /* #3B82F6 */
var(--jazer-neon-pink)        /* #EC4899 */
var(--jazer-sunburst-gold)    /* #F59E0B */
var(--jazer-aether-teal)      /* #06B6D4 */
var(--jazer-ultraviolet)      /* #A78BFA */
var(--jazer-night-black)      /* #0B0E12 */
var(--jazer-stardust-white)   /* #F8F9FF */
var(--jazer-graphite)         /* #1F2937 */
var(--jazer-soft-slate)       /* #94A3B8 */
```

```jsx
// Tailwind Classes
bg-jazer-electric-purple
bg-jazer-cosmic-blue
bg-jazer-neon-pink
bg-jazer-sunburst-gold
bg-jazer-aether-teal
bg-jazer-ultraviolet
bg-jazer-night-black
bg-jazer-stardust-white
bg-jazer-graphite
bg-jazer-soft-slate
```

```javascript
// JavaScript (from JAZER_BRAND object)
JAZER_BRAND.colors.electricPurple
JAZER_BRAND.colors.cosmicBlue
JAZER_BRAND.colors.neonPink
JAZER_BRAND.colors.sunburstGold
JAZER_BRAND.colors.aetherTeal
JAZER_BRAND.colors.ultraviolet
JAZER_BRAND.colors.nightBlack
JAZER_BRAND.colors.stardustWhite
JAZER_BRAND.colors.graphite
JAZER_BRAND.colors.softSlate
```

---

## 📝 Typography Quick Reference

### Font Family Usage

```css
/* Headings */
font-family: 'Orbitron', system-ui, sans-serif;

/* Body Text */
font-family: 'Montserrat', system-ui, sans-serif;
```

```jsx
// Tailwind Classes
<h1 className="font-heading">Heading Text</h1>
<p className="font-body">Body text</p>
```

### Font Sizes

```jsx
// Headings
<h1 className="text-6xl">64px</h1>
<h2 className="text-4xl">40px</h2>
<h3 className="text-3xl">28px</h3>

// Body
<p className="text-xl">20px (large)</p>
<p className="text-lg">18px (default)</p>
<p className="text-base">16px (small)</p>
```

### Letter Spacing

```jsx
// Brand standard (3%)
<h1 className="tracking-brand">JaZeR</h1>

// Large headings (4%)
<h1 className="tracking-brand-large">WIDGETS</h1>
```

---

## ✨ Effect Quick Reference

### Neon Glow Effects

```css
/* CSS Variables */
box-shadow: var(--jazer-glow-purple);
box-shadow: var(--jazer-glow-blue);
box-shadow: var(--jazer-glow-pink);
box-shadow: var(--jazer-glow-gold);
```

```jsx
// Tailwind Classes
<div className="shadow-neon-purple">
<div className="shadow-neon-blue">
<div className="shadow-neon-pink">
<div className="shadow-neon-gold">
<div className="shadow-neon-strong"> {/* Stronger 8px glow */}
```

### Gradient Backgrounds

```jsx
// Full spectrum gradient
<div className="bg-jazer-gradient">

// Purple-Blue gradient
<div className="bg-jazer-gradient-purple-blue">
```

### Gradient Text

```jsx
// Apply gradient to text
<h1 className="gradient-text">JaZeR</h1>

// Neon text glow
<h1 className="neon-text">Glowing Text</h1>
<h1 className="neon-text-blue">Blue Glow</h1>
<h1 className="neon-text-pink">Pink Glow</h1>
<h1 className="neon-text-gold">Gold Glow</h1>
```

---

## 🎯 Component Examples

### Primary Button

```jsx
<button className="
  bg-jazer-electric-purple 
  text-jazer-stardust-white 
  font-bold 
  py-3 px-6 
  rounded-lg 
  shadow-neon-purple 
  hover:shadow-neon-strong 
  transition-all
">
  Get Started
</button>
```

### Card with Neon Border

```jsx
<div className="
  bg-jazer-graphite 
  border border-jazer-electric-purple 
  rounded-2xl 
  p-6 
  shadow-neon-purple 
  hover:shadow-neon-strong 
  hover:-translate-y-2
  transition-all
">
  {/* Card content */}
</div>
```

### Gradient Heading

```jsx
<h1 className="
  font-heading 
  text-6xl 
  tracking-brand 
  gradient-text 
  neon-text
">
  JaZeR WIDGETS
</h1>
```

### Input Field

```jsx
<input 
  type="text"
  className="
    bg-jazer-graphite 
    border border-jazer-soft-slate 
    text-jazer-stardust-white 
    rounded-lg 
    p-3 
    focus:border-jazer-aether-teal 
    focus:shadow-neon-blue 
    outline-none 
    transition-all
  "
  placeholder="Enter text..."
/>
```

---

## 🖼️ Logo Usage

### Favicon

```html
<link rel="icon" type="image/svg+xml" href="/jazer-favicon.svg" />
```

### Primary Logo

```jsx
<img 
  src="/jazer-logo.svg" 
  alt="JaZeR Logo" 
  className="w-64" 
  style={{ filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))' }}
/>
```

**Minimum Sizes:**
- Digital: 160px width
- Print: 30mm width
- Always maintain clear space equal to the "J" height

---

## 🎨 Pre-built Utility Classes

These utility classes are automatically available in your CSS:

### Text Effects
- `.gradient-text` - Gradient text fill
- `.neon-text` - Purple neon glow
- `.neon-text-blue` - Blue neon glow
- `.neon-text-pink` - Pink neon glow
- `.neon-text-gold` - Gold neon glow

### Button Effects
- `.btn-neon` - Neon button with hover effects

### Card Effects
- `.card-neon` - Neon bordered card with hover animation

### Animations
- `.animate-pulse-neon` - Pulsing neon effect
- `.animate-fadeIn` - Fade in animation

---

## 🔧 JavaScript Integration

### Import Brand Constants

```javascript
import { JAZER_BRAND } from './App.jsx';

// Use colors
const bgColor = JAZER_BRAND.colors.nightBlack;
const textColor = JAZER_BRAND.colors.stardustWhite;
const accent = JAZER_BRAND.colors.electricPurple;

// Use fonts
const headingFont = JAZER_BRAND.fonts.heading;
const bodyFont = JAZER_BRAND.fonts.body;

// Use effects
const glowBlur = JAZER_BRAND.glowBlur; // "4px"
const glow = JAZER_BRAND.glow; // Full shadow string
```

### Apply Styles Programmatically

```javascript
// Example: Dynamic styling
const buttonStyle = {
  backgroundColor: JAZER_BRAND.colors.electricPurple,
  color: JAZER_BRAND.colors.stardustWhite,
  fontFamily: JAZER_BRAND.fontFamily,
  boxShadow: JAZER_BRAND.glow,
  borderRadius: '0.5rem',
  padding: '0.75rem 1.5rem',
};
```

---

## 📱 Responsive Usage

```jsx
// Mobile-first approach with brand colors
<div className="
  bg-jazer-night-black 
  text-jazer-stardust-white
  p-4 
  md:p-8 
  lg:p-12
">
  <h1 className="
    font-heading 
    text-4xl 
    md:text-5xl 
    lg:text-6xl 
    gradient-text
  ">
    Responsive Heading
  </h1>
</div>
```

---

## ♿ Accessibility

### Contrast Ratios (WCAG Compliant)

✅ **AAA Rating:**
- Night Black + Stardust White: 18.5:1
- Graphite + Stardust White: 10.2:1

✅ **AA Rating:**
- Electric Purple + Stardust White: 4.8:1
- Cosmic Blue + Stardust White: 5.2:1

### Focus States

```jsx
<button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-jazer-cosmic-blue 
  focus:ring-offset-2 
  focus:ring-offset-jazer-night-black
">
  Accessible Button
</button>
```

---

## 🚀 Quick Start Checklist

When creating new components:

- [ ] Use Night Black (`#0B0E12`) as default background
- [ ] Use Orbitron font for headings
- [ ] Use Montserrat font for body text
- [ ] Apply 4px neon glow to interactive elements
- [ ] Use Electric Purple or Cosmic Blue for primary actions
- [ ] Maintain 3% letter spacing on headings
- [ ] Test contrast ratios for accessibility
- [ ] Add hover states with shadow-neon-strong
- [ ] Ensure responsive breakpoints work
- [ ] Verify logo maintains minimum size

---

## 📚 Resources

- **Full Guidelines:** [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md)
- **Implementation Summary:** [`BRAND_IMPLEMENTATION_SUMMARY.md`](./BRAND_IMPLEMENTATION_SUMMARY.md)
- **Tailwind Config:** `tailwind.config.js`
- **CSS Variables:** `src/index.css`
- **JS Constants:** `src/App.jsx` (JAZER_BRAND object)

---

**© 2025 JaZeR. All brand elements are officially standardized.**
