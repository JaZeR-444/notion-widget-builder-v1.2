// Weather Widget Configuration
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
  }
};

export const weatherConfig = {
  id: 'weather',
  label: 'Weather',
  description: 'Dynamic weather widget with forecast and customization.',

  defaultConfig: {
    // Location Settings
    weatherLocation: 'New York, NY',
    useGeolocation: false,
    preferredUnits: 'imperial', // 'imperial' | 'metric'
    numberOfDays: 5,

    // Display Configuration
    currentWeatherFields: ['temperature', 'condition', 'humidity', 'wind'], // Max 4
    dailyWeatherFields: ['high', 'low', 'condition', 'precipitation'],

    // Forecast Options
    hideTodayInForecast: false,
    displayDates: false,

    // Layout Options
    orientation: 'auto', // 'auto' | 'horizontal' | 'compact' | 'wide' | 'tall'

    // Visual Options
    animateIcons: true,
    greyscaleIcons: false,
    textShadows: false,
    useTransparentBackground: false,
    setBackgroundColor: true,
    backgroundColor: JAZER_BRAND.colors.stardustWhite,
    fontScale: 1.0,

    // Color Customization
    textColorLight: JAZER_BRAND.colors.nightBlack,
    textColorDark: JAZER_BRAND.colors.stardustWhite,
    appearanceMode: 'system', // 'do-nothing' | 'system' | 'light' | 'dark'

    // Light Mode Colors (universal styling)
    lightMode: {
      textColor: JAZER_BRAND.colors.graphite,
      backgroundColor: JAZER_BRAND.colors.stardustWhite
    },

    // Dark Mode Colors (universal styling)
    darkMode: {
      textColor: JAZER_BRAND.colors.stardustWhite,
      backgroundColor: JAZER_BRAND.colors.nightBlack
    },

    // Additional Features
    visuallyGroupForecast: false,
    showHoverMenu: true,
    showCustomizeButton: true,
    timeFormat: '12h', // '12h' | '24h'
    showSevereAlerts: true,

    // Typography (universal styling)
    textFontFamily: 'default', // default, serif, mono
    googleFont: 'none', // none, orbitron, righteousretro, caveat, permanentmarker, monoton
    textAlign: 'center', // left, center, right

    // Background (universal styling)
    backgroundTexture: 'none', // none, noise, stars, dots, grid, waves

    // Preset Theme (universal styling)
    presetTheme: 'none', // none, cyberpunk, stealth, ocean, sunset, forest, neon

    // Effects (universal styling)
    glowEffect: false,
    gradientText: false
  },

  fields: [
    // Location Settings Section
    {
      name: 'weatherLocation',
      label: 'Weather Location',
      type: 'text',
      section: 'locationSettings',
      placeholder: 'City, State or ZIP',
      helpText: 'Uses free Open-Meteo API - no key required'
    },
    {
      name: 'useGeolocation',
      label: 'Auto-Detect Location',
      type: 'boolean',
      section: 'locationSettings'
    },
    {
      name: 'preferredUnits',
      label: 'Preferred Units',
      type: 'select',
      section: 'locationSettings',
      options: [
        { label: 'Imperial (°F, mph)', value: 'imperial' },
        { label: 'Metric (°C, km/h)', value: 'metric' }
      ]
    },
    {
      name: 'numberOfDays',
      label: 'Number of Days',
      type: 'select',
      section: 'locationSettings',
      options: [
        { label: '3 Days', value: 3 },
        { label: '5 Days', value: 5 },
        { label: '7 Days', value: 7 },
        { label: '10 Days', value: 10 }
      ]
    },

    // Display Configuration Section
    {
      name: 'currentWeatherFields',
      label: 'Current Weather Fields (max 4)',
      type: 'multiselect',
      section: 'displayConfiguration',
      options: [
        { label: 'Temperature', value: 'temperature' },
        { label: 'Condition', value: 'condition' },
        { label: 'Humidity', value: 'humidity' },
        { label: 'Wind Speed', value: 'wind' },
        { label: 'Feels Like', value: 'feelsLike' },
        { label: 'UV Index', value: 'uvIndex' }
      ]
    },
    {
      name: 'dailyWeatherFields',
      label: 'Daily Weather Fields',
      type: 'multiselect',
      section: 'displayConfiguration',
      options: [
        { label: 'High Temp', value: 'high' },
        { label: 'Low Temp', value: 'low' },
        { label: 'Condition', value: 'condition' },
        { label: 'Precipitation', value: 'precipitation' },
        { label: 'Wind', value: 'wind' }
      ]
    },

    // Forecast Options Section
    {
      name: 'hideTodayInForecast',
      label: 'Hide Today in Forecast',
      type: 'boolean',
      section: 'forecastOptions'
    },
    {
      name: 'displayDates',
      label: 'Display Dates',
      type: 'boolean',
      section: 'forecastOptions'
    },

    // Layout Options Section
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      section: 'layoutOptions',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Compact', value: 'compact' },
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall', disabled: true }
      ]
    },

    // Visual Options Section
    {
      name: 'animateIcons',
      label: 'Animate Icons',
      type: 'boolean',
      section: 'visualOptions'
    },
    {
      name: 'greyscaleIcons',
      label: 'Greyscale Icons',
      type: 'boolean',
      section: 'visualOptions'
    },
    {
      name: 'textShadows',
      label: 'Text Shadows',
      type: 'boolean',
      section: 'visualOptions'
    },
    {
      name: 'useTransparentBackground',
      label: 'Use Transparent Background',
      type: 'boolean',
      section: 'visualOptions'
    },
    {
      name: 'fontScale',
      label: 'Font Scale',
      type: 'range',
      section: 'visualOptions',
      min: 0.8,
      max: 1.2,
      step: 0.1
    },
    {
      name: 'setBackgroundColor',
      label: 'Set Background Color',
      type: 'boolean',
      section: 'visualOptions'
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'color',
      section: 'visualOptions'
    },

    // Color Customization Section
    {
      name: 'textColorLight',
      label: 'Text Color (Light Mode)',
      type: 'color',
      section: 'colors'
    },
    {
      name: 'textColorDark',
      label: 'Text Color (Dark Mode)',
      type: 'color',
      section: 'colors'
    },
    {
      name: 'appearanceMode',
      label: 'Dark/Light Appearance',
      type: 'select',
      section: 'appearance',
      options: [
        { label: 'Do Nothing', value: 'do-nothing' },
        { label: 'Use System Setting', value: 'system' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' }
      ]
    },

    // Light Mode Colors (universal styling)
    {
      name: 'lightMode',
      label: 'Light Mode Settings',
      type: 'group',
      section: 'appearance',
      fields: [
        {
          name: 'textColor',
          label: 'Text Color',
          type: 'color'
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'color'
        }
      ]
    },

    // Dark Mode Colors (universal styling)
    {
      name: 'darkMode',
      label: 'Dark Mode Settings',
      type: 'group',
      section: 'appearance',
      fields: [
        {
          name: 'textColor',
          label: 'Text Color',
          type: 'color'
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'color'
        }
      ]
    },

    // Additional Features Section
    {
      name: 'visuallyGroupForecast',
      label: 'Visually Group Forecast',
      type: 'boolean',
      section: 'features'
    },
    {
      name: 'timeFormat',
      label: 'Time Format',
      type: 'select',
      section: 'features',
      options: [
        { label: '12-hour (AM/PM)', value: '12h' },
        { label: '24-hour', value: '24h' }
      ]
    },
    {
      name: 'showSevereAlerts',
      label: 'Show Severe Weather Alerts',
      type: 'boolean',
      section: 'features'
    },
    {
      name: 'showHoverMenu',
      label: 'Show Hover Menu',
      type: 'boolean',
      section: 'features'
    },
    {
      name: 'showCustomizeButton',
      label: 'Show Customize Button',
      type: 'boolean',
      section: 'features'
    },

    // Typography Section (universal styling)
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
      name: 'googleFont',
      label: 'Google Font Style',
      type: 'select',
      section: 'typography',
      options: [
        { label: 'None (Default)', value: 'none' },
        { label: 'Orbitron (Futuristic)', value: 'Orbitron' },
        { label: 'Righteous (Retro)', value: 'Righteous' },
        { label: 'Caveat (Handwritten)', value: 'Caveat' },
        { label: 'Permanent Marker (Bold)', value: 'Permanent+Marker' },
        { label: 'Monoton (Art Deco)', value: 'Monoton' },
        { label: 'Press Start 2P (Pixel)', value: 'Press+Start+2P' }
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

    // Background Texture (universal styling)
    {
      name: 'backgroundTexture',
      label: 'Background Texture',
      type: 'select',
      section: 'background',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Noise', value: 'noise' },
        { label: 'Stars', value: 'stars' },
        { label: 'Dots Pattern', value: 'dots' },
        { label: 'Grid', value: 'grid' },
        { label: 'Waves', value: 'waves' }
      ]
    },

    // Preset Theme (universal styling)
    {
      name: 'presetTheme',
      label: 'Preset Theme',
      type: 'select',
      section: 'theme',
      options: [
        { label: 'None (Custom)', value: 'none' },
        { label: 'Cyberpunk', value: 'cyberpunk' },
        { label: 'Stealth', value: 'stealth' },
        { label: 'Ocean', value: 'ocean' },
        { label: 'Sunset', value: 'sunset' },
        { label: 'Forest', value: 'forest' },
        { label: 'Neon', value: 'neon' },
        { label: 'Midnight', value: 'midnight' }
      ]
    },

    // Effects (universal styling)
    {
      name: 'glowEffect',
      label: 'Neon Glow Effect',
      type: 'boolean',
      section: 'effects'
    },
    {
      name: 'gradientText',
      label: 'Gradient Text',
      type: 'boolean',
      section: 'effects'
    }
  ]
};
