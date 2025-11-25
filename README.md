# Notion Widget Builder

Create beautiful, customizable widgets for your Notion workspace. Build clocks, countdowns, weather displays, image galleries, and more with an easy-to-use visual builder.

## 🎨 Features

- **8 Widget Types**: Clock, Countdown, Counter, Weather, Image Gallery, Quotes, Life Progress, Button Generator
- **Visual Builder**: Real-time preview with live customization
- **Brand Kits**: Pre-configured styling including JaZeR Neon theme  
- **Export Options**: Generate standalone HTML files ready to embed in Notion
- **Fully Customizable**: Colors, fonts, sizes, and widget-specific settings
- **Responsive Design**: Works seamlessly across desktop and mobile devices

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

## 🎨 Brand Kit System

The app includes a JaZeR Neon brand kit featuring:
- Custom color palette (Electric Purple, Cosmic Blue, Neon Pink, etc.)
- Orbitron and Montserrat fonts
- Neon glow effects and gradients
- Dark mode optimized

## 📄 License

[Your License Here]

## 👤 Author

**JaZeR**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: This is a client-side application. Generated widgets are standalone HTML files that can be hosted anywhere and embedded into Notion pages using the `/embed` block.
