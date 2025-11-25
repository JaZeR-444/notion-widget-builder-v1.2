import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

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

export const LifeProgressWidget = ({ config }) => {
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState({
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    lifetime: 0
  });

  // Detect system dark mode
  useEffect(() => {
    if (config.appearanceMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
      const handler = (e) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else if (config.appearanceMode === 'dark') {
      setIsDark(true);
    } else if (config.appearanceMode === 'light') {
      setIsDark(false);
    }
  }, [config.appearanceMode]);

  // Calculate progress
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();

      // Year progress
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
      const yearProgress = ((now - yearStart) / (yearEnd - yearStart)) * 100;

      // Month progress
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const monthProgress = ((now - monthStart) / (monthEnd - monthStart)) * 100;

      // Week progress (assuming week starts on Sunday)
      const dayOfWeek = now.getDay();
      const hourOfDay = now.getHours();
      const minuteOfHour = now.getMinutes();
      const totalWeekMinutes = 7 * 24 * 60;
      const passedWeekMinutes = dayOfWeek * 24 * 60 + hourOfDay * 60 + minuteOfHour;
      const weekProgress = (passedWeekMinutes / totalWeekMinutes) * 100;

      // Day progress
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const dayProgress = ((now - dayStart) / (dayEnd - dayStart)) * 100;

      // Lifetime progress
      const birthDate = new Date(config.birthDate);
      const lifeExpectancyMs = config.lifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
      const lifeProgress = ((now - birthDate) / lifeExpectancyMs) * 100;

      setProgress({
        year: Math.min(yearProgress, 100),
        month: Math.min(monthProgress, 100),
        week: Math.min(weekProgress, 100),
        day: Math.min(dayProgress, 100),
        lifetime: Math.min(lifeProgress, 100)
      });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [config.birthDate, config.lifeExpectancy]);

  // Get colors based on appearance mode
  const textColor = isDark ? config.textColorDark : config.textColorLight;
  const barColor = isDark ? config.barColorDark : config.barColorLight;
  const barBackground = isDark ? config.barBackgroundDark : config.barBackgroundLight;
  const bgColor = config.useTransparentBackground
    ? 'transparent'
    : (config.setBackgroundColor ? config.backgroundColor : (isDark ? JAZER_BRAND.colors.nightBlack : JAZER_BRAND.colors.stardustWhite));

  // Bar height mapping
  const barHeightMap = {
    small: 16,
    medium: 24,
    large: 32
  };
  const barHeightPx = barHeightMap[config.barHeight] || barHeightMap.medium;

  // Progress bar component
  const ProgressBar = ({ label, percentage, showValue = true }) => {
    const barStyle = {
      width: '100%',
      height: `${barHeightPx}px`,
      backgroundColor: barBackground,
      borderRadius: '9999px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: config.dropShadows ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
    };

    const fillStyle = {
      width: `${percentage}%`,
      height: '100%',
      background: config.useGradientBars ? JAZER_BRAND.gradient : barColor,
      borderRadius: '9999px',
      transition: 'width 0.5s ease',
      boxShadow: config.useGlowEffect ? JAZER_BRAND.glow : 'none'
    };

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ fontFamily: JAZER_BRAND.fonts.body }}>
            {label}
          </span>
          {showValue && (
            <span className="text-xs opacity-70" style={{ fontFamily: JAZER_BRAND.fonts.heading }}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
        <div style={barStyle}>
          <div style={fillStyle} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="h-full w-full p-6 relative"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: JAZER_BRAND.fonts.body
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={32} style={{ color: config.useGradientBars ? JAZER_BRAND.colors.electricPurple : barColor }} />
          <h2 className="text-2xl font-bold" style={{ fontFamily: JAZER_BRAND.fonts.heading }}>
            Life Progress
          </h2>
        </div>

        <div className="space-y-4">
          {config.showYear && (
            <ProgressBar label="Year" percentage={progress.year} />
          )}

          {config.showMonth && (
            <ProgressBar label="Month" percentage={progress.month} />
          )}

          {config.showWeek && (
            <ProgressBar label="Week" percentage={progress.week} />
          )}

          {config.showDay && (
            <ProgressBar label="Day" percentage={progress.day} />
          )}

          {config.showLifetime && (
            <ProgressBar label="Lifetime" percentage={progress.lifetime} />
          )}
        </div>

        {config.showLifetime && (
          <div className="mt-6 text-center text-sm opacity-60">
            <p style={{ fontFamily: JAZER_BRAND.fonts.body }}>
              Based on life expectancy of {config.lifeExpectancy} years
            </p>
          </div>
        )}
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
