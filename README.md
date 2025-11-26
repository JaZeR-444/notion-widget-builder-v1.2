# JaZeR Notion Widget Builder 🚀

**Cyberpunk-themed widget builder for Notion workspaces**

Create stunning, customizable widgets with official JaZeR branding. Build clocks, countdowns, weather displays, image galleries, and more with a neon-powered visual builder.

[![Brand Compliant](https://img.shields.io/badge/Brand-JaZeR%20Compliant-8B5CF6)](./BRAND_GUIDELINES.md)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38BDF8)](https://tailwindcss.com/)

## ✨ Features

- **🎨 8 Widget Types**: Clock, Countdown, Counter, Weather, Image Gallery, Quotes, Life Progress, Button Generator
- **⚡ Visual Builder**: Real-time preview with live customization and resizable canvas
- **🌈 JaZeR Brand Kit**: Official cyberpunk aesthetic with neon glows and gradients
- **📦 Export Ready**: Generate standalone HTML files ready to embed in Notion
- **🎯 Fully Customizable**: Colors, fonts, sizes, effects, and widget-specific settings
- **📱 Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **♿ Accessible**: WCAG AA compliant with proper contrast ratios and focus states

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd notion-widget-builder-version2/notion-widget-builder-version2.client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📦 Available Widgets

1. **Clock** - Multiple styles (analog, digital, flip) with customizable colors and fonts
2. **Countdown** - Count down to important events with various display formats
3. **Counter** - Track numbers with increment/decrement controls
4. **Weather** - Display current conditions and multi-day forecasts
5. **Image Gallery** - Showcase images with different layout options
6. **Quotes** - Display inspirational quotes with rotation options
7. **Life Progress** - Visualize time passing with progress bars
8. **Button Generator** - Create custom styled buttons

## 🎯 How to Use in Notion

1. **Build Your Widget**
   - Select a widget type from the landing page
   - Customize colors, fonts, and settings in the configuration panel
   - Preview changes in real-time

2. **Export**
   - Click "Get Code" button
   - Download the HTML file or copy the code
   - Host the HTML file (see deployment options below)

3. **Embed in Notion**
   - In your Notion page, type `/embed`
   - Paste the URL of your hosted widget
   - Resize the embed block as needed

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
npm run build
vercel --prod
```

### Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Build your project: `npm run build`
2. Deploy the `dist` folder to gh-pages branch

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite (rolldown-vite 7.2.5)
- **Styling**: TailwindCSS 4.1.17
- **Icons**: Lucide React 0.554.0

## 📝 Development

```bash
# Run development server
npm run dev

# Build project
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 🎨 JaZeR Brand Implementation

This application fully implements the official JaZeR brand guidelines:

### Color Palette (10 Colors)
- **Primary**: Electric Purple (`#8B5CF6`), Cosmic Blue (`#3B82F6`)
- **Accent**: Neon Pink (`#EC4899`), Sunburst Gold (`#F59E0B`)
- **Support**: Aether Teal (`#06B6D4`), Ultraviolet (`#A78BFA`)
- **Neutrals**: Night Black (`#0B0E12`), Stardust White (`#F8F9FF`), Graphite (`#1F2937`), Soft Slate (`#94A3B8`)

### Typography
- **Headings**: Orbitron (400, 700) with 3% letter spacing
- **Body**: Montserrat (400, 500, 700)

### Visual Effects
- **Neon Glow**: 4px blur with 60% opacity
- **Gradients**: Full spectrum and purple-blue variants
- **Logo**: Minimum 160px width with clear space

📚 **Full Documentation**: See [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) for complete specifications  
📊 **Implementation Summary**: See [`BRAND_IMPLEMENTATION_SUMMARY.md`](./BRAND_IMPLEMENTATION_SUMMARY.md)

### Using Brand Elements

```jsx
// Tailwind Classes
<h1 className="font-heading text-6xl bg-jazer-gradient-purple-blue">
<button className="bg-jazer-electric-purple shadow-neon-purple">

// CSS Variables
style={{ color: 'var(--jazer-cosmic-blue)' }}

// JavaScript Constants
import { JAZER_BRAND } from './App.jsx';
const color = JAZER_BRAND.colors.electricPurple;
```

## 📄 License

[Your License Here]

## 👤 Author

**JaZeR** - Cyberpunk Aesthetics & Innovation

## 📚 Documentation

- [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) - Complete brand specifications
- [`BRAND_IMPLEMENTATION_SUMMARY.md`](./BRAND_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [`FEATURE_VALIDATION_REPORT.md`](./FEATURE_VALIDATION_REPORT.md) - Feature documentation
- [`IMPROVEMENTS_APPLIED.md`](./IMPROVEMENTS_APPLIED.md) - Change log

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Please ensure all contributions follow the JaZeR brand guidelines.

---

**Built with 💜 by JaZeR** | **Powered by Vite ⚡**

**Note**: This is a client-side application. Generated widgets are standalone HTML files that can be hosted anywhere and embedded into Notion pages using the `/embed` block.
