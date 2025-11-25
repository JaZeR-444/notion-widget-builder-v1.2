// Countdown Widget Configuration
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

export const countdownConfig = {
  id: 'countdown',
  label: 'Countdown',
  description: 'Event countdowns with flip cards and confetti',

  defaultConfig: {
    // Event Configuration
    eventTitle: 'Project Launch',
    targetDate: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 16),
    format24h: true,
    ignoreTimezone: true,
    timezone: 'UTC',

    // Aesthetic Style
    countdownStyle: 'flip-countdown', // 'text-only', 'flip-countdown'

    // Time Units (individual toggles)
    showYear: false,
    showMonth: true,
    showWeek: false,
    showDay: true,
    showHour: true,
    showMinute: true,
    showSecond: true,

    // Completion Settings
    confettiDuration: '5min', // 'never', '1min', '5min', '10min', '1hour', 'forever'
    stopAtZero: true,
    showToGoLabel: true, // Show "X days to go" / "X days ago"

    // Typography
    digitFontFamily: 'default', // 'default', 'impact', 'serif'
    textFontFamily: 'default', // 'default', 'serif', 'mono'
    textAlign: 'center',
    textShadows: false,

    // Background
    useTransparentBg: true,

    // Appearance Mode
    appearance: 'system', // 'system', 'light', 'dark'

    // Light Mode Colors
    lightMode: {
      textColor: JAZER_BRAND.colors.graphite,
      panelColor: JAZER_BRAND.colors.stardustWhite,
      digitColor: JAZER_BRAND.colors.nightBlack
    },

    // Dark Mode Colors
    darkMode: {
      textColor: JAZER_BRAND.colors.stardustWhite,
      panelColor: JAZER_BRAND.colors.graphite,
      digitColor: JAZER_BRAND.colors.stardustWhite
    },

    // Additional Features
    showHoverMenu: false,
    showCustomizeButton: false
  },

  fields: [
    // EVENT SETUP SECTION
    { name: 'eventTitle', label: 'Event Title', type: 'text', section: 'event' },
    { name: 'targetDate', label: 'Target Date & Time', type: 'datetime-local', section: 'event' },
    { name: 'format24h', label: '24-Hour Format', type: 'boolean', section: 'event' },
    { name: 'ignoreTimezone', label: 'Ignore Timezone', type: 'boolean', section: 'event' },
    {
      name: 'timezone',
      label: 'Timezone',
      type: 'select',
      section: 'event',
      options: [
        { label: 'UTC', value: 'UTC' },
        { label: 'EST (UTC-5)', value: 'America/New_York' },
        { label: 'PST (UTC-8)', value: 'America/Los_Angeles' },
        { label: 'GMT', value: 'Europe/London' },
        { label: 'CET (UTC+1)', value: 'Europe/Paris' },
        { label: 'JST (UTC+9)', value: 'Asia/Tokyo' }
      ]
    },

    // STYLE SECTION
    {
      name: 'countdownStyle',
      label: 'Countdown Style',
      type: 'select',
      section: 'style',
      options: [
        { label: 'Text Only', value: 'text-only' },
        { label: 'Flip Countdown', value: 'flip-countdown' }
      ]
    },
    {
      name: 'textAlign',
      label: 'Text Alignment',
      type: 'select',
      section: 'style',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    },

    // TIME UNITS SECTION
    { name: 'showYear', label: 'Show Years', type: 'boolean', section: 'units' },
    { name: 'showMonth', label: 'Show Months', type: 'boolean', section: 'units' },
    { name: 'showWeek', label: 'Show Weeks', type: 'boolean', section: 'units' },
    { name: 'showDay', label: 'Show Days', type: 'boolean', section: 'units' },
    { name: 'showHour', label: 'Show Hours', type: 'boolean', section: 'units' },
    { name: 'showMinute', label: 'Show Minutes', type: 'boolean', section: 'units' },
    { name: 'showSecond', label: 'Show Seconds', type: 'boolean', section: 'units' },

    // COMPLETION SECTION
    {
      name: 'confettiDuration',
      label: 'Confetti Duration',
      type: 'select',
      section: 'completion',
      options: [
        { label: 'Never', value: 'never' },
        { label: '1 Minute', value: '1min' },
        { label: '5 Minutes', value: '5min' },
        { label: '10 Minutes', value: '10min' },
        { label: '1 Hour', value: '1hour' },
        { label: 'Forever', value: 'forever' }
      ]
    },
    { name: 'stopAtZero', label: 'Stop at Zero', type: 'boolean', section: 'completion' },
    { name: 'showToGoLabel', label: 'Show "To Go/Ago" Label', type: 'boolean', section: 'completion' },

    // TYPOGRAPHY SECTION
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
    { name: 'textShadows', label: 'Text Shadows', type: 'boolean', section: 'typography' },

    // BACKGROUND SECTION
    { name: 'useTransparentBg', label: 'Transparent Background', type: 'boolean', section: 'background' },

    // APPEARANCE SECTION
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

    // FEATURES SECTION
    { name: 'showHoverMenu', label: 'Show Hover Menu', type: 'boolean', section: 'features' },
    { name: 'showCustomizeButton', label: 'Show Customize Button', type: 'boolean', section: 'features' }
  ]
};
