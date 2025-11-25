import React, { useState, useEffect } from 'react';
import { CloudSun, CloudRain, Cloud, Sun, Wind, Droplets } from 'lucide-react';

// JAZER_BRAND constants
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
  glow: '0 0 4px rgba(139, 92, 246, 0.5)'
};

// Mock weather data
const MOCK_WEATHER = {
  current: {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    feelsLike: 70,
    uvIndex: 6,
    icon: 'partly-cloudy'
  },
  forecast: [
    { day: 'Mon', high: 75, low: 58, condition: 'Sunny', precipitation: 0, wind: 8, icon: 'sunny' },
    { day: 'Tue', high: 72, low: 60, condition: 'Cloudy', precipitation: 10, wind: 10, icon: 'cloudy' },
    { day: 'Wed', high: 68, low: 55, condition: 'Rainy', precipitation: 80, wind: 15, icon: 'rainy' },
    { day: 'Thu', high: 70, low: 57, condition: 'Partly Cloudy', precipitation: 20, wind: 12, icon: 'partly-cloudy' },
    { day: 'Fri', high: 74, low: 59, condition: 'Sunny', precipitation: 0, wind: 7, icon: 'sunny' },
    { day: 'Sat', high: 76, low: 61, condition: 'Sunny', precipitation: 0, wind: 9, icon: 'sunny' },
    { day: 'Sun', high: 73, low: 60, condition: 'Partly Cloudy', precipitation: 15, wind: 11, icon: 'partly-cloudy' }
  ]
};

// Weather icon component
const WeatherIcon = ({ condition, animate, greyscale, size = 32 }) => {
  const iconProps = {
    size,
    className: `${animate ? 'animate-pulse' : ''} ${greyscale ? 'grayscale' : ''}`,
    style: { color: greyscale ? JAZER_BRAND.colors.softSlate : JAZER_BRAND.colors.sunburstGold }
  };

  switch (condition) {
    case 'sunny':
      return <Sun {...iconProps} />;
    case 'rainy':
      return <CloudRain {...iconProps} style={{ ...iconProps.style, color: JAZER_BRAND.colors.cosmicBlue }} />;
    case 'cloudy':
      return <Cloud {...iconProps} style={{ ...iconProps.style, color: JAZER_BRAND.colors.softSlate }} />;
    case 'partly-cloudy':
    default:
      return <CloudSun {...iconProps} style={{ ...iconProps.style, color: JAZER_BRAND.colors.aetherTeal }} />;
  }
};

export const WeatherWidget = ({ config }) => {
  const [isDark, setIsDark] = useState(() => {
    if (config.appearanceMode === 'dark') return true;
    if (config.appearanceMode === 'light') return false;
    if (config.appearanceMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen for system dark mode changes
  useEffect(() => {
    if (config.appearanceMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if (config.appearanceMode === 'dark') {
      setIsDark(true);
    } else if (config.appearanceMode === 'light') {
      setIsDark(false);
    }
  }, [config.appearanceMode]);

  // Get colors based on appearance mode
  const textColor = isDark ? config.textColorDark : config.textColorLight;
  const bgColor = config.useTransparentBackground
    ? 'transparent'
    : (config.setBackgroundColor ? config.backgroundColor : (isDark ? JAZER_BRAND.colors.nightBlack : JAZER_BRAND.colors.stardustWhite));

  const textShadow = config.textShadows ? '0 2px 4px rgba(0,0,0,0.1)' : 'none';

  // Convert temperature based on units
  const convertTemp = (temp) => {
    if (config.preferredUnits === 'metric') {
      return Math.round((temp - 32) * 5 / 9);
    }
    return temp;
  };

  const tempUnit = config.preferredUnits === 'metric' ? '°C' : '°F';
  const windUnit = config.preferredUnits === 'metric' ? 'km/h' : 'mph';

  // Filter forecast days
  const forecastDays = MOCK_WEATHER.forecast
    .slice(config.hideTodayInForecast ? 1 : 0)
    .slice(0, config.numberOfDays);

  // Render current weather field
  const renderCurrentField = (field) => {
    const { current } = MOCK_WEATHER;
    switch (field) {
      case 'temperature':
        return (
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold" style={{ fontFamily: JAZER_BRAND.fonts.heading }}>
              {convertTemp(current.temperature)}{tempUnit}
            </span>
          </div>
        );
      case 'condition':
        return <span className="text-lg opacity-80">{current.condition}</span>;
      case 'humidity':
        return (
          <div className="flex items-center gap-1 text-sm">
            <Droplets size={16} />
            <span>Humidity: {current.humidity}%</span>
          </div>
        );
      case 'wind':
        return (
          <div className="flex items-center gap-1 text-sm">
            <Wind size={16} />
            <span>Wind: {current.wind} {windUnit}</span>
          </div>
        );
      case 'feelsLike':
        return <span className="text-sm">Feels like: {convertTemp(current.feelsLike)}{tempUnit}</span>;
      case 'uvIndex':
        return <span className="text-sm">UV Index: {current.uvIndex}</span>;
      default:
        return null;
    }
  };

  // Layout class based on orientation
  const getLayoutClass = () => {
    switch (config.orientation) {
      case 'horizontal':
        return 'flex-row';
      case 'compact':
        return 'flex-col max-w-xs';
      case 'wide':
        return 'flex-row w-full';
      default: // auto
        return 'flex-col md:flex-row';
    }
  };

  return (
    <div
      className="h-full w-full p-6"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: JAZER_BRAND.fonts.body
      }}
    >
      <div className={`flex gap-6 ${getLayoutClass()}`}>
        {/* Current Weather */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <WeatherIcon
              condition={MOCK_WEATHER.current.icon}
              animate={config.animateIcons}
              greyscale={config.greyscaleIcons}
              size={48}
            />
            <h2 className="text-xl font-bold" style={{ fontFamily: JAZER_BRAND.fonts.heading, textShadow }}>
              {config.weatherLocation}
            </h2>
          </div>

          <div className="space-y-2" style={{ textShadow }}>
            {config.currentWeatherFields.slice(0, 4).map((field, idx) => (
              <div key={idx}>{renderCurrentField(field)}</div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-3" style={{ textShadow }}>
            {config.numberOfDays}-Day Forecast
          </h3>

          <div className={`grid gap-3 ${config.orientation === 'horizontal' ? 'grid-cols-5' : 'grid-cols-3 md:grid-cols-5'}`}>
            {forecastDays.map((day, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${config.visuallyGroupForecast ? 'bg-opacity-10 bg-current' : ''}`}
                style={{
                  textAlign: 'center',
                  textShadow,
                  ...(config.visuallyGroupForecast && {
                    backgroundColor: isDark
                      ? 'rgba(248, 249, 255, 0.1)'
                      : 'rgba(11, 14, 18, 0.05)'
                  })
                }}
              >
                <div className="text-xs font-semibold mb-2 opacity-70">{day.day}</div>
                <WeatherIcon
                  condition={day.icon}
                  animate={config.animateIcons}
                  greyscale={config.greyscaleIcons}
                  size={24}
                />
                <div className="mt-2 space-y-1">
                  {config.dailyWeatherFields.includes('high') && (
                    <div className="text-sm font-bold">{convertTemp(day.high)}{tempUnit}</div>
                  )}
                  {config.dailyWeatherFields.includes('low') && (
                    <div className="text-xs opacity-60">{convertTemp(day.low)}{tempUnit}</div>
                  )}
                  {config.dailyWeatherFields.includes('condition') && (
                    <div className="text-xs opacity-70">{day.condition}</div>
                  )}
                  {config.dailyWeatherFields.includes('precipitation') && day.precipitation > 0 && (
                    <div className="text-xs flex items-center justify-center gap-1">
                      <Droplets size={10} />
                      {day.precipitation}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customize button */}
      {config.showCustomizeButton && (
        <button
          className="absolute bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: JAZER_BRAND.colors.cosmicBlue,
            color: JAZER_BRAND.colors.stardustWhite,
            fontFamily: JAZER_BRAND.fonts.heading
          }}
        >
          Customize
        </button>
      )}
    </div>
  );
};
