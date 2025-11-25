// Clock Widget Configuration
// Enhanced with JAZER_BRAND integration

const JAZER_BRAND = {
  colors: {
    electricPurple: '#8B5CF6',
    cosmicBlue: '#3B82F6',
    neonPink: '#EC4899',
    sunburstGold: '#F59E0B',
    aetherTeal: '#06B6D4',
    ultraviolet: '#A78BFA',
    nightBlack: '#0B0E12',
    stardustWhite: '#F8F9FF',
    graphite: '#1F2937',
    softSlate: '#94A3B8',
  },
  fonts: {
    heading: '"Orbitron", system-ui, sans-serif',
    body: '"Montserrat", system-ui, sans-serif'
  },
  gradient: 'linear-gradient(90deg, #EC4899 0%, #F59E0B 28%, #06B6D4 50%, #3B82F6 74%, #8B5CF6 100%)',
  glow: '0 0 4px rgba(139, 92, 246, 0.5)',
  glowBlur: '10px'
};

export const clockConfig = {
  id: 'clock',
  label: 'Clock',
  description: 'Advanced customizable clock with multiple styles.',

  defaultConfig: {
    // Time Display
    is12Hour: true,
    showDate: true,
    showSeconds: false,

    // Clock Style
    clockSize: 'large', // small, medium, large, xlarge
    clockType: 'digital-solid', // analog-dots, analog-numbers, analog-planets, analog-smooth, analog-tick,
                                 // analog-trail, digital-roulette, digital-solid, flip-clock

    // Typography
    digitFontFamily: 'default', // default, impact, serif
    textFontFamily: 'default', // default, serif, mono
    textAlign: 'center', // left, center, right
    textShadows: false,

    // Background
    useTransparentBg: false,
    bgColor: JAZER_BRAND.colors.stardustWhite,

    // Appearance Mode
    appearance: 'system', // system, light, dark

    // Light Mode Colors
    lightMode: {
      clockColor: JAZER_BRAND.colors.graphite,
      digitColor: JAZER_BRAND.colors.stardustWhite,
      textColor: JAZER_BRAND.colors.graphite,
      backgroundColor: JAZER_BRAND.colors.stardustWhite
    },

    // Dark Mode Colors
    darkMode: {
      clockColor: JAZER_BRAND.colors.ultraviolet,
      digitColor: JAZER_BRAND.colors.stardustWhite,
      textColor: JAZER_BRAND.colors.stardustWhite,
      backgroundColor: JAZER_BRAND.colors.nightBlack
    },

    // Additional Features
    showHoverMenu: false,
    showCustomizeButton: false,

    // Effects
    glowEffect: false,
    gradientText: false
  },

  fields: [
    // Time Display Section
    { name: 'is12Hour', label: '12-Hour Format', type: 'boolean', section: 'time' },
    { name: 'showDate', label: 'Show Date', type: 'boolean', section: 'time' },
    { name: 'showSeconds', label: 'Show Seconds', type: 'boolean', section: 'time' },

    // Style Section
    {
      name: 'clockSize',
      label: 'Clock Size',
      type: 'select',
      section: 'style',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'X-Large', value: 'xlarge' }
      ]
    },
    {
      name: 'clockType',
      label: 'Clock Type',
      type: 'select',
      section: 'style',
      options: [
        { label: 'Digital Solid', value: 'digital-solid' },
        { label: 'Digital Roulette', value: 'digital-roulette' },
        { label: 'Flip Clock', value: 'flip-clock' },
        { label: 'Analog Smooth', value: 'analog-smooth' },
        { label: 'Analog Tick', value: 'analog-tick' },
        { label: 'Analog Trail', value: 'analog-trail' },
        { label: 'Analog Dots', value: 'analog-dots' },
        { label: 'Analog Numbers', value: 'analog-numbers' },
        { label: 'Analog Planets', value: 'analog-planets' }
      ]
    },

    // Typography Section
    {
      name: 'digitFontFamily',
      label: 'Digit Font',
      type: 'select',
      section: 'typography',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Impact', value: 'impact' },
        { label: 'Serif', value: 'serif' }
      ]
    },
    {
      name: 'textFontFamily',
      label: 'Text Font',
      type: 'select',
      section: 'typography',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Serif', value: 'serif' },
        { label: 'Mono', value: 'mono' }
      ]
    },
    {
      name: 'textAlign',
      label: 'Text Alignment',
      type: 'select',
      section: 'typography',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    },
    { name: 'textShadows', label: 'Text Shadows', type: 'boolean', section: 'typography' },

    // Background Section
    { name: 'useTransparentBg', label: 'Transparent Background', type: 'boolean', section: 'background' },

    // Appearance Section
    {
      name: 'appearance',
      label: 'Appearance Mode',
      type: 'select',
      section: 'appearance',
      options: [
        { label: 'System Setting', value: 'system' },
        { label: 'Light Mode', value: 'light' },
        { label: 'Dark Mode', value: 'dark' }
      ]
    },

    // Additional Features
    { name: 'showHoverMenu', label: 'Show Hover Menu', type: 'boolean', section: 'features' },
    { name: 'showCustomizeButton', label: 'Show Customize Button', type: 'boolean', section: 'features' },

    // Effects (for brand kit compatibility)
    { name: 'glowEffect', label: 'Neon Glow Effect', type: 'boolean', section: 'effects' },
    { name: 'gradientText', label: 'Gradient Text', type: 'boolean', section: 'effects' }
  ]
};
