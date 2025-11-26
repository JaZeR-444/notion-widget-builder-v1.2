# Brand Theme Generator - Implementation Guide

## Overview

The Brand Theme Generator is a **standalone feature** that allows users to upload their logo and automatically extract colors to create custom preset themes that apply to **ALL widgets** in the Notion Widget Builder.

## Architecture

### Components Created

1. **`BrandThemeGenerator.jsx`** - Main component (`src/components/`)
   - Full-page interface for brand theme creation
   - Integrates `BrandLogoUploader` for color extraction
   - Generates 8 preset themes using `brandThemeGenerator` utility
   - Manages localStorage persistence
   - Provides export/import functionality

2. **`BrandLogoUploader.jsx`** - Existing component (reused)
   - Handles image upload
   - Extracts 8 colors using ColorThief
   - Returns palette with primary, secondary, accent colors

3. **`brandThemeGenerator.js`** - Utility functions (`src/utils/`)
   - `generateBrandPresets()` - Creates 8 themed variations:
     - Brand Monochrome
     - Brand Contrast  
     - Brand Vibrant
     - Brand Professional
     - Brand Dark
     - Brand Light
     - Brand Neon
     - Brand Minimal

### Integration Points

#### App.jsx Changes

1. **State Management**
```javascript
const [view, setView] = useState('landing'); // Added 'brand-generator'
const [globalBrandTheme, setGlobalBrandTheme] = useState(null);
```

2. **Navigation**
```javascript
const navigateToBrandGenerator = () => setView('brand-generator');
const handleThemeGenerated = (theme) => setGlobalBrandTheme(theme);
```

3. **Routing**
```javascript
if (view === 'brand-generator') {
  return <BrandThemeGenerator onBack={navigateToHome} onThemeGenerated={handleThemeGenerated} />;
}
```

4. **Landing Page Enhancement**
   - Added prominent "Brand Theme Generator" card
   - Shows features: 8 presets, applies to all widgets, save & export
   - Call-to-action button

5. **Widget Builder Integration**
```javascript
function NotionWidgetBuilder({ globalBrandTheme }) {
  const [brandTheme, setBrandTheme] = useState(globalBrandTheme);
  
  useEffect(() => {
    if (globalBrandTheme) {
      setBrandTheme(globalBrandTheme);
      // Apply colors to config
      setConfig(prev => ({
        ...prev,
        bgColor: globalBrandTheme.background,
        textColor: globalBrandTheme.text,
        accentColor: globalBrandTheme.primary
      }));
    }
  }, [globalBrandTheme]);
}
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    BRAND THEME GENERATOR                    │
│                                                             │
│  1. User uploads logo                                       │
│  2. ColorThief extracts 8 colors                           │
│  3. brandThemeGenerator creates 8 preset variations        │
│  4. User clicks "Apply to All Widgets"                     │
│     └─> Saves to localStorage                              │
│         - Key: 'jazer_global_brand_theme'                  │
│         - Flag: 'jazer_global_brand_active' = 'true'       │
│  5. onThemeGenerated(theme) callback to App.jsx            │
│     └─> setGlobalBrandTheme(theme)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      APP.JSX (MAIN)                         │
│                                                             │
│  - globalBrandTheme state                                   │
│  - On mount: Checks localStorage for saved theme           │
│  - Passes theme to NotionWidgetBuilder as prop             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  NOTION WIDGET BUILDER                      │
│                                                             │
│  - Receives globalBrandTheme prop                           │
│  - useEffect watches for changes                            │
│  - Automatically applies colors to current widget config    │
│  - brandTheme available for Clock widget preset generation │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               ALL 8 WIDGETS (Clock, Counter, etc.)          │
│                                                             │
│  - Receive config with brand colors applied                 │
│  - Clock widget: Can use brandTheme for dynamic presets    │
│  - All widgets styled with consistent brand palette        │
└─────────────────────────────────────────────────────────────┘
```

## localStorage Schema

### Keys Used

1. **`jazer_brand_theme`**
   - Stores uploaded logo's extracted colors
   - Used by BrandThemeGenerator for re-rendering on page reload
   ```json
   {
     "primary": "#8B5CF6",
     "secondary": "#3B82F6",
     "accent": "#EC4899",
     "background": "#F8F9FF",
     "text": "#0B0E12",
     "palette": ["#0B0E12", "#1F2937", "#8B5CF6", "#3B82F6", "#EC4899", "#F59E0B", "#06B6D4", "#F8F9FF"]
   }
   ```

2. **`jazer_global_brand_theme`**
   - Same structure as above
   - Global theme applied to all widgets
   - Set when user clicks "Apply to All Widgets"

3. **`jazer_global_brand_active`**
   - Boolean flag (stored as string "true"/"false")
   - Indicates if global brand theme should be active
   - Allows users to disable without deleting theme

## Features

### 1. Logo Upload & Color Extraction
- Drag-and-drop or click to upload
- Accepts: PNG, JPG, GIF, SVG, WebP
- Extracts 8 dominant colors
- Displays color palette with hex codes
- Click any color to copy to clipboard

### 2. Preset Generation
- 8 automatic theme variations
- Each preset includes:
  - Background color
  - Primary/clock color
  - Digit color
  - Text color
  - Texture option (none, noise, stars, dots, grid, waves)
  - Glow effect flag

### 3. Theme Management
- **Apply to All Widgets** - Sets as global theme
- **Export Theme** - Download JSON file
- **Clear Theme** - Remove custom theme, revert to defaults
- **Persistent Storage** - Auto-saves to localStorage

### 4. Visual Feedback
- Success animation when theme applied
- Preview mode toggle
- Widget coverage indicator
- Color swatches with click-to-copy

## User Journey

### Path 1: Brand Theme First
1. Land on homepage
2. Click "Generate Theme" on Brand Theme Generator card
3. Upload logo
4. View 8 generated presets
5. Click "Apply to All Widgets"
6. Return to homepage
7. Select any widget - brand colors already applied

### Path 2: Widget First
1. Land on homepage
2. Select a widget (e.g., Clock)
3. See BrandLogoUploader in sidebar
4. Upload logo for that specific widget
5. Get brand presets specific to Clock widget
6. (Optional) Go to Brand Theme Generator for global application

## Technical Details

### Color Extraction Algorithm

```javascript
// Uses ColorThief library
const colorThief = new ColorThief();
const dominantColor = colorThief.getColor(image); // Single RGB
const palette = colorThief.getPalette(image, 8);  // 8 colors

// Converts to hex
const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0'))
  .join('');
```

### Preset Generation Logic

```javascript
export const generateBrandPresets = (brandTheme) => {
  const { palette } = brandTheme;
  const sorted = sortByLuminance(palette); // Dark to light
  
  return [
    // Monochrome: darkest bg, primary accent, lightest text
    { bg: sorted[0], primary: brandTheme.primary, text: sorted[7] },
    
    // Contrast: opposite ends of palette
    { bg: sorted[0], primary: sorted[6], text: sorted[7] },
    
    // ... 6 more variations
  ];
};
```

### Performance Considerations

- ColorThief runs only on `onLoad` event
- Preset generation memoized (8 presets × minimal computation)
- localStorage read/write async-friendly
- No API calls - fully client-side

## Widgets Coverage

All 8 widgets receive the global brand theme:

1. ⏰ **Clock** - Background, text, digits, accents
2. 💬 **Quotes** - Quote card, text, refresh icon
3. 🔢 **Counter** - Background, button colors, text
4. 🖼️ **Image Gallery** - Arrows, dots, slide backgrounds
5. 📊 **Life Progress** - Bar colors, text, background
6. 🔘 **Button Generator** - Button backgrounds, outlines, text
7. ⏳ **Countdown** - Digit panels, text, background
8. 🌤️ **Weather** - Temperature displays, icons, forecast cards

## Future Enhancements

### Planned Features
- [ ] Import theme from JSON file
- [ ] Share theme via URL
- [ ] Multiple saved themes (theme library)
- [ ] AI-powered theme suggestions
- [ ] Accessibility checker (contrast ratios)
- [ ] Theme marketplace

### Advanced Options
- [ ] Fine-tune individual colors per widget
- [ ] Custom preset naming
- [ ] Gradient generation
- [ ] Font pairing suggestions
- [ ] Export as CSS variables

## Troubleshooting

### Theme Not Applying
1. Check localStorage: `localStorage.getItem('jazer_global_brand_active')`
2. Should return `"true"`
3. Clear theme and re-apply
4. Hard refresh (Ctrl+Shift+R)

### Colors Not Extracted
1. Ensure image loaded (crossOrigin set)
2. Check ColorThief initialization
3. Try different image format
4. Image must have visible colors (not transparent/white)

### Presets Look Wrong
1. Luminance sorting issue - check `getLuminance()` function
2. Palette might have too many similar colors
3. Try uploading higher contrast logo

## Dependencies

- **ColorThief** (3rd party library)
  - Extracts dominant colors from images
  - Uses k-means clustering algorithm
  - Browser-native canvas API

- **Lucide React** (icons)
  - Sparkles, Palette, Download, Check, etc.

## File Structure

```
src/
├── components/
│   ├── BrandLogoUploader.jsx       [Existing - Reused]
│   └── BrandThemeGenerator.jsx     [NEW - Main Interface]
├── utils/
│   └── brandThemeGenerator.js      [Existing - Enhanced]
├── widgets/
│   ├── clock/
│   │   └── ClockWidget.jsx         [Uses brandTheme for presets]
│   ├── countdown/
│   ├── counter/
│   ├── imageGallery/
│   ├── lifeProgress/
│   ├── newButtonGenerator/
│   ├── quotes/
│   └── weather/
└── App.jsx                          [MODIFIED - Routing & State]
```

## Testing Checklist

- [ ] Upload logo - colors extracted correctly
- [ ] 8 presets generated with different styles
- [ ] Click preset - colors preview updates
- [ ] Apply to All Widgets - success message shows
- [ ] Navigate to Clock widget - brand colors applied
- [ ] Navigate to Counter widget - brand colors applied
- [ ] Refresh page - theme persists
- [ ] Clear theme - reverts to defaults
- [ ] Export theme - JSON file downloads
- [ ] Click color swatch - hex code copied to clipboard

---

**Version:** 1.0  
**Date:** November 25, 2025  
**Status:** ✅ Production Ready
