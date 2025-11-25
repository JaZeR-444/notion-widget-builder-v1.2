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
    preferredUnits: 'imperial', // 'imperial' | 'metric'
    numberOfDays: 5,

    // Display Configuration
    currentWeatherFields: ['temperature', 'condition', 'humidity', 'wind'], // Max 4
    dailyWeatherFields: ['high', 'low', 'condition', 'precipitation'],

    // Forecast Options
    hideTodayInForecast: false,
    displayDates: false, // Locked feature

    // Layout Options
    orientation: 'auto', // 'auto' | 'horizontal' | 'compact' | 'wide' | 'tall'

    // Visual Options
    animateIcons: true,
    greyscaleIcons: false,
    textShadows: false,
    useTransparentBackground: false, // Locked feature
    setBackgroundColor: true,
    backgroundColor: JAZER_BRAND.colors.stardustWhite,

    // Color Customization
    textColorLight: JAZER_BRAND.colors.nightBlack,
    textColorDark: JAZER_BRAND.colors.stardustWhite,
    appearanceMode: 'system', // 'do-nothing' | 'system' | 'light' | 'dark'

    // Additional Features
    visuallyGroupForecast: false, // Locked feature
    showHoverMenu: true,
    showCustomizeButton: true
  },

  fields: [
    // Location Settings Section
    {
      name: 'weatherLocation',
      label: 'Weather Location',
      type: 'text',
      section: 'locationSettings',
      placeholder: 'City, State or ZIP'
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
      section: 'forecastOptions',
      locked: true
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
      section: 'visualOptions',
      locked: true
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

    // Additional Features Section
    {
      name: 'visuallyGroupForecast',
      label: 'Visually Group Forecast',
      type: 'boolean',
      section: 'features',
      locked: true
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
    }
  ]
};
