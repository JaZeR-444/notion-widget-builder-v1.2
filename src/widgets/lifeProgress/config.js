// Life Progress Widget Configuration
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
  gradient: 'linear-gradient(90deg, #EC4899 0%, #F59E0B 28%, #06B6D4 50%, #3B82F6 74%, #8B5CF6 100%)',
  glow: '0 0 4px rgba(139, 92, 246, 0.5)'
};

export const lifeProgressConfig = {
  id: 'lifeProgress',
  label: 'Life Progress',
  description: 'Track your life progress with beautiful progress bars.',

  defaultConfig: {
    // Progress Bars Configuration
    birthDate: '1990-01-01',
    lifeExpectancy: 80,

    // Display Options
    showYear: true,
    showMonth: true,
    showWeek: true,
    showDay: true,
    showLifetime: true,

    // Style Options
    dropShadows: false,
    useTransparentBackground: false,
    setBackgroundColor: true,
    backgroundColor: JAZER_BRAND.colors.stardustWhite,

    // Progress Bar Styling
    useGradientBars: true, // Use JAZER_BRAND.gradient for progress bars
    useGlowEffect: false, // Apply JAZER_BRAND.glow to bars
    barHeight: 'medium', // 'small' | 'medium' | 'large'

    // Color Customization
    textColorLight: JAZER_BRAND.colors.nightBlack,
    textColorDark: JAZER_BRAND.colors.stardustWhite,
    barColorLight: JAZER_BRAND.colors.cosmicBlue,
    barColorDark: JAZER_BRAND.colors.electricPurple,
    barBackgroundLight: JAZER_BRAND.colors.softSlate,
    barBackgroundDark: JAZER_BRAND.colors.graphite,

    // Appearance Mode
    appearanceMode: 'system', // 'do-nothing' | 'system' | 'light' | 'dark'

    // Additional Features
    showHoverMenu: true,
    showCustomizeButton: true
  },

  fields: [
    // Progress Configuration
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      section: 'progressConfiguration'
    },
    {
      name: 'lifeExpectancy',
      label: 'Life Expectancy (years)',
      type: 'number',
      section: 'progressConfiguration',
      min: 50,
      max: 120
    },

    // Display Options
    {
      name: 'showYear',
      label: 'Show Year Progress',
      type: 'boolean',
      section: 'displayOptions'
    },
    {
      name: 'showMonth',
      label: 'Show Month Progress',
      type: 'boolean',
      section: 'displayOptions'
    },
    {
      name: 'showWeek',
      label: 'Show Week Progress',
      type: 'boolean',
      section: 'displayOptions'
    },
    {
      name: 'showDay',
      label: 'Show Day Progress',
      type: 'boolean',
      section: 'displayOptions'
    },
    {
      name: 'showLifetime',
      label: 'Show Lifetime Progress',
      type: 'boolean',
      section: 'displayOptions'
    },

    // Style Options
    {
      name: 'dropShadows',
      label: 'Drop Shadows',
      type: 'boolean',
      section: 'styleOptions'
    },
    {
      name: 'useTransparentBackground',
      label: 'Use Transparent Background',
      type: 'boolean',
      section: 'styleOptions'
    },
    {
      name: 'setBackgroundColor',
      label: 'Set Background Color',
      type: 'boolean',
      section: 'styleOptions'
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'color',
      section: 'styleOptions'
    },

    // Progress Bar Styling
    {
      name: 'useGradientBars',
      label: 'Use Gradient Bars',
      type: 'boolean',
      section: 'barStyling'
    },
    {
      name: 'useGlowEffect',
      label: 'Glow Effect on Bars',
      type: 'boolean',
      section: 'barStyling'
    },
    {
      name: 'barHeight',
      label: 'Bar Height',
      type: 'select',
      section: 'barStyling',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    },

    // Color Customization
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
      name: 'barColorLight',
      label: 'Bar Color (Light Mode)',
      type: 'color',
      section: 'colors'
    },
    {
      name: 'barColorDark',
      label: 'Bar Color (Dark Mode)',
      type: 'color',
      section: 'colors'
    },
    {
      name: 'barBackgroundLight',
      label: 'Bar Background (Light Mode)',
      type: 'color',
      section: 'colors'
    },
    {
      name: 'barBackgroundDark',
      label: 'Bar Background (Dark Mode)',
      type: 'color',
      section: 'colors'
    },

    // Appearance
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

    // Additional Features
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
    }
  ]
};
