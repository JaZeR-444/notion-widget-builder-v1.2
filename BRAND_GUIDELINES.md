# JaZeR Brand Guidelines - Notion Widget Builder

**Version:** 1.2  
**Last Updated:** November 25, 2025  
**Brand Owner:** JaZeR

---

## 🎨 Brand Identity

The JaZeR brand embodies a **cyberpunk aesthetic** with neon glows, futuristic typography, and a vibrant color palette that conveys energy, creativity, and innovation.

---

## 🌈 Color Palette

All 10 official brand colors are implemented as CSS variables and Tailwind utilities:

| Color Name | HEX Code | RGB | CSS Variable | Tailwind Class |
|------------|----------|-----|--------------|----------------|
| **Electric Purple** | `#8B5CF6` | 139, 92, 246 | `--jazer-electric-purple` | `bg-jazer-electric-purple` |
| **Cosmic Blue** | `#3B82F6` | 59, 130, 246 | `--jazer-cosmic-blue` | `bg-jazer-cosmic-blue` |
| **Neon Pink** | `#EC4899` | 236, 72, 153 | `--jazer-neon-pink` | `bg-jazer-neon-pink` |
| **Sunburst Gold** | `#F59E0B` | 245, 158, 11 | `--jazer-sunburst-gold` | `bg-jazer-sunburst-gold` |
| **Aether Teal** | `#06B6D4` | 6, 182, 212 | `--jazer-aether-teal` | `bg-jazer-aether-teal` |
| **Ultraviolet** | `#A78BFA` | 167, 139, 250 | `--jazer-ultraviolet` | `bg-jazer-ultraviolet` |
| **Night Black** | `#0B0E12` | 11, 14, 18 | `--jazer-night-black` | `bg-jazer-night-black` |
| **Stardust White** | `#F8F9FF` | 248, 249, 255 | `--jazer-stardust-white` | `bg-jazer-stardust-white` |
| **Graphite** | `#1F2937` | 31, 41, 55 | `--jazer-graphite` | `bg-jazer-graphite` |
| **Soft Slate** | `#94A3B8` | 148, 163, 184 | `--jazer-soft-slate` | `bg-jazer-soft-slate` |

### Color Usage Guidelines

**Primary Colors (Primaries):**
- **Electric Purple** & **Cosmic Blue** are the brand anchors
- Use for headings, primary CTAs, and key UI elements
- Apply neon glow effects for emphasis

**Secondary Colors (Accents):**
- **Neon Pink** & **Sunburst Gold** for highlights, CTA buttons, and attention-grabbing elements
- Use sparingly for maximum impact

**Support Colors:**
- **Aether Teal** & **Ultraviolet** extend the spectrum on darker backgrounds
- Great for secondary buttons and hover states

**Neutrals:**
- **Night Black**: Default background color
- **Stardust White**: Default light text color
- **Graphite** & **Soft Slate**: UI elements, borders, captions

---

## 📝 Typography

### Font Families

#### Headings (Orbitron)
```css
font-family: 'Orbitron', system-ui, sans-serif;
```
- Use for: H1, H2, H3, brand names, navigation
- Weight: 400 (Regular), 700 (Bold)
- Letter spacing: `0.03em` (3%)
- Apply gradient or neon effects for maximum impact

#### Body Text (Montserrat)
```css
font-family: 'Montserrat', system-ui, sans-serif;
```
- Use for: Paragraphs, buttons, labels, UI text
- Weight: 400 (Regular), 500 (Medium), 700 (Bold)
- Default letter spacing: `normal`

### Font Sizes

| Element | Size | CSS Variable | Tailwind Class |
|---------|------|--------------|----------------|
| H1 | 64px | `--jazer-h1: 64px` | `text-6xl` |
| H2 | 40px | `--jazer-h2: 40px` | `text-4xl` |
| H3 | 28px | `--jazer-h3: 28px` | `text-3xl` |
| Body Large | 20px | `--jazer-body-large: 20px` | `text-xl` |
| Body | 18px | `--jazer-body: 18px` | `text-lg` |
| Small | 16px | `--jazer-small: 16px` | `text-base` |

---

## ✨ Visual Effects

### Neon Glow

**Specification:** `4px` blur radius (corrected from 15px)

```css
/* Purple Glow */
box-shadow: 0 0 4px rgba(139, 92, 246, 0.6);

/* Blue Glow */
box-shadow: 0 0 4px rgba(59, 130, 246, 0.6);

/* Pink Glow */
box-shadow: 0 0 4px rgba(236, 72, 153, 0.6);

/* Gold Glow */
box-shadow: 0 0 4px rgba(245, 158, 11, 0.6);
```

**Tailwind Classes:**
- `shadow-neon-purple`
- `shadow-neon-blue`
- `shadow-neon-pink`
- `shadow-neon-gold`

### Gradients

**Brand Gradient (Full Spectrum):**
```css
background: linear-gradient(90deg, #EC4899 0%, #F59E0B 28%, #06B6D4 50%, #3B82F6 74%, #8B5CF6 100%);
```

**Purple-Blue Gradient:**
```css
background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
```

**Tailwind Classes:**
- `bg-jazer-gradient`
- `bg-jazer-gradient-purple-blue`

### Text Effects

**Gradient Text:**
```css
.gradient-text {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Neon Text:**
```css
.neon-text {
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 4px rgba(139, 92, 246, 0.6);
}
```

---

## 🖼️ Logo Assets

### Files Available

- **Favicon:** `/public/jazer-favicon.svg` (32x32px)
- **Primary Logo:** `/public/jazer-logo.svg` (400x120px)

### Logo Usage Rules

#### Minimum Sizes
- **Digital:** 160px width minimum
- **Print:** 30mm width minimum

#### Clear Space
- Maintain padding equal to the height of the "J" character around all sides
- Never place logo on busy backgrounds without sufficient contrast

#### Logo Variants
- **Full Color:** Use on dark backgrounds (Night Black)
- **White:** Use on light backgrounds or photography
- **Icon Only:** Use for favicons, app icons, social media profile pictures

### Incorrect Usage ❌
- Don't stretch or distort the logo
- Don't change brand colors
- Don't add additional effects beyond approved glow
- Don't place on backgrounds with insufficient contrast

---

## 🎯 Component Guidelines

### Buttons

**Primary Button:**
```jsx
<button className="bg-jazer-electric-purple text-jazer-stardust-white font-bold py-3 px-6 rounded-lg shadow-neon-purple hover:shadow-neon-strong transition-all">
  Get Started
</button>
```

**Secondary Button:**
```jsx
<button className="bg-jazer-cosmic-blue text-jazer-stardust-white font-bold py-3 px-6 rounded-lg shadow-neon-blue hover:shadow-neon-strong transition-all">
  Learn More
</button>
```

**Accent Button:**
```jsx
<button className="bg-jazer-neon-pink text-jazer-night-black font-bold py-3 px-6 rounded-lg shadow-neon-pink hover:shadow-neon-strong transition-all">
  Call to Action
</button>
```

### Cards

```jsx
<div className="bg-jazer-graphite border border-jazer-electric-purple rounded-2xl p-6 shadow-neon-purple hover:shadow-neon-strong transition-all">
  {/* Card content */}
</div>
```

### Inputs

```jsx
<input 
  type="text" 
  className="bg-jazer-graphite border border-jazer-soft-slate text-jazer-stardust-white rounded-lg p-3 focus:border-jazer-aether-teal focus:shadow-neon-blue outline-none transition-all"
  placeholder="Enter text..."
/>
```

---

## 🔧 Implementation

### CSS Variables (Global)

All brand colors and effects are defined in `src/index.css`:

```css
:root {
  --jazer-electric-purple: #8B5CF6;
  --jazer-cosmic-blue: #3B82F6;
  --jazer-neon-pink: #EC4899;
  --jazer-sunburst-gold: #F59E0B;
  --jazer-aether-teal: #06B6D4;
  --jazer-ultraviolet: #A78BFA;
  --jazer-night-black: #0B0E12;
  --jazer-stardust-white: #F8F9FF;
  --jazer-graphite: #1F2937;
  --jazer-soft-slate: #94A3B8;
  
  --jazer-glow-blur: 4px;
  --jazer-glow-purple: 0 0 4px rgba(139, 92, 246, 0.6);
  --jazer-glow-blue: 0 0 4px rgba(59, 130, 246, 0.6);
  --jazer-glow-pink: 0 0 4px rgba(236, 72, 153, 0.6);
  --jazer-glow-gold: 0 0 4px rgba(245, 158, 11, 0.6);
}
```

### Tailwind Configuration

All brand elements are extended in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      jazer: {
        'electric-purple': '#8B5CF6',
        'cosmic-blue': '#3B82F6',
        // ... all 10 colors
      }
    },
    fontFamily: {
      'heading': ['"Orbitron"', 'system-ui', 'sans-serif'],
      'body': ['"Montserrat"', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      'neon-purple': '0 0 4px rgba(139, 92, 246, 0.6)',
      // ... all neon effects
    }
  }
}
```

### JavaScript Constants

Brand values are available in `src/App.jsx`:

```javascript
const JAZER_BRAND = {
  colors: {
    electricPurple: '#8B5CF6',
    cosmicBlue: '#3B82F6',
    // ... all colors
  },
  fonts: {
    heading: '"Orbitron", system-ui, sans-serif',
    body: '"Montserrat", system-ui, sans-serif'
  },
  glowBlur: '4px',
  // ... all brand specs
};
```

---

## 📱 Responsive Design

### Breakpoints

Use standard Tailwind breakpoints with brand styling:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Font Scaling

```css
/* Mobile */
h1 { font-size: 2.5rem; } /* 40px */
h2 { font-size: 1.75rem; } /* 28px */

/* Tablet */
@media (min-width: 640px) {
  h1 { font-size: 3.5rem; } /* 56px */
  h2 { font-size: 2.25rem; } /* 36px */
}

/* Desktop */
@media (min-width: 1024px) {
  h1 { font-size: 4rem; } /* 64px */
  h2 { font-size: 2.5rem; } /* 40px */
}
```

---

## ♿ Accessibility

### Contrast Ratios

All color combinations meet WCAG AA standards:

- **Night Black + Stardust White:** 18.5:1 (AAA)
- **Electric Purple + Stardust White:** 4.8:1 (AA)
- **Graphite + Stardust White:** 10.2:1 (AAA)

### Focus States

```css
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--jazer-cosmic-blue);
  outline-offset: 2px;
}
```

### Screen Reader Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 🚀 Quick Start Checklist

- [ ] Import Orbitron and Montserrat fonts
- [ ] Apply Night Black background to body
- [ ] Use Orbitron for all headings
- [ ] Use Montserrat for body text
- [ ] Apply brand colors to primary elements
- [ ] Add neon glow effects to CTAs
- [ ] Test contrast ratios
- [ ] Verify logo placement and spacing
- [ ] Test responsive breakpoints
- [ ] Validate accessibility with screen reader

---

## 📚 Resources

- **Font Source:** [Google Fonts](https://fonts.google.com)
- **Color Testing:** [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Tailwind Docs:** [tailwindcss.com](https://tailwindcss.com)

---

## 📞 Brand Contact

For questions about brand usage or to request additional assets, please contact:

**JaZeR Brand Team**  
Email: brand@jazer.com  
Website: jazer.com

---

**© 2025 JaZeR. All rights reserved.**
