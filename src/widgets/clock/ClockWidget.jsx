import React, { useState, useEffect } from 'react';

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
  glow: '0 0 4px rgba(139, 92, 246, 0.5)',
  glowBlur: '10px'
};

// Helper component for flip clock cards
const FlipCard = ({ value, label, colors, size }) => (
  <div className="inline-flex flex-col items-center mx-1">
    <div style={{
      width: `${size * 0.7}px`,
      height: `${size}px`,
      background: colors.clockColor || '#333',
      borderRadius: '8px',
      color: colors.digitColor || '#fff',
      fontSize: `${size * 0.65}px`,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.3)' }}></div>
      {String(value).padStart(2, '0')}
    </div>
    {label && <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7, textTransform: 'uppercase' }}>{label}</div>}
  </div>
);

// Helper component for analog clock
const AnalogClock = ({ time, size, type, colors, config }) => {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const center = size / 2;
  const clockRadius = size * 0.45;

  // Generate hour markers based on type
  const renderMarkers = () => {
    const markers = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      const x = center + Math.sin(angle) * clockRadius * 0.85;
      const y = center - Math.cos(angle) * clockRadius * 0.85;

      if (type === 'dots') {
        markers.push(
          <circle key={i} cx={x} cy={y} r={size * 0.015} fill={colors.clockColor} opacity="0.5" />
        );
      } else if (type === 'numbers') {
        markers.push(
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={size * 0.08} fill={colors.clockColor} fontWeight="bold">
            {i === 0 ? 12 : i}
          </text>
        );
      } else if (type === 'planets') {
        const planetSizes = [8, 6, 7, 5, 9, 6, 8, 5, 6, 7, 5, 6];
        markers.push(
          <circle key={i} cx={x} cy={y} r={size * 0.01 * planetSizes[i] / 5}
                  fill={colors.clockColor} opacity="0.6" />
        );
      }
    }
    return markers;
  };

  // Hand styles based on type
  const getHandProps = (handType) => {
    if (type === 'trail') {
      return { strokeLinecap: 'round', strokeWidth: handType === 'second' ? size * 0.01 : size * 0.02, opacity: 0.7 };
    }
    return { strokeLinecap: 'round', strokeWidth: handType === 'hour' ? size * 0.04 : handType === 'minute' ? size * 0.03 : size * 0.01 };
  };

  const smooth = type === 'smooth' || type === 'trail';
  const showSeconds = type !== 'smooth';

  return (
    <svg width={size} height={size} style={{ filter: config.glowEffect ? `drop-shadow(0 0 ${JAZER_BRAND.glowBlur} ${colors.clockColor})` : 'none' }}>
      {/* Clock face */}
      <circle cx={center} cy={center} r={clockRadius}
              fill="none" stroke={colors.clockColor}
              strokeWidth={size * 0.01} opacity="0.2" />

      {/* Markers */}
      {renderMarkers()}

      {/* Hour hand */}
      <line
        x1={center} y1={center}
        x2={center + Math.sin(hourAngle * Math.PI / 180) * clockRadius * 0.5}
        y2={center - Math.cos(hourAngle * Math.PI / 180) * clockRadius * 0.5}
        stroke={colors.clockColor}
        {...getHandProps('hour')}
      />

      {/* Minute hand */}
      <line
        x1={center} y1={center}
        x2={center + Math.sin(minuteAngle * Math.PI / 180) * clockRadius * 0.75}
        y2={center - Math.cos(minuteAngle * Math.PI / 180) * clockRadius * 0.75}
        stroke={colors.clockColor}
        {...getHandProps('minute')}
      />

      {/* Second hand */}
      {config.showSeconds && (
        <line
          x1={center} y1={center}
          x2={center + Math.sin(secondAngle * Math.PI / 180) * clockRadius * 0.85}
          y2={center - Math.cos(secondAngle * Math.PI / 180) * clockRadius * 0.85}
          stroke={type === 'trail' ? colors.textColor : colors.clockColor}
          {...getHandProps('second')}
          style={type === 'tick' ? { transition: 'all 0.05s ease' } : {}}
        />
      )}

      {/* Center dot */}
      <circle cx={center} cy={center} r={size * 0.02} fill={colors.clockColor} />
    </svg>
  );
};

export const ClockWidget = ({ config }) => {
  const [time, setTime] = useState(new Date());
  const [isDark, setIsDark] = useState(() => {
    if (config.appearance === 'dark') return true;
    if (config.appearance === 'light') return false;
    if (config.appearance === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for system dark mode changes
  useEffect(() => {
    if (config.appearance === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setIsDark(config.appearance === 'dark');
    }
  }, [config.appearance]);

  // Get active colors based on mode
  const colors = isDark ? config.darkMode : config.lightMode;

  // Font mapping
  const getFontFamily = (fontType, isDigit = false) => {
    const font = isDigit ? config.digitFontFamily : config.textFontFamily;
    const fontMap = {
      default: 'ui-sans-serif, system-ui, sans-serif',
      impact: '"Impact", "Arial Black", sans-serif',
      serif: 'ui-serif, Georgia, serif',
      mono: 'ui-monospace, "Courier New", monospace'
    };
    return fontMap[font] || fontMap.default;
  };

  // Size mapping
  const sizeMap = {
    small: { time: '32px', date: '14px', analog: 120 },
    medium: { time: '48px', date: '16px', analog: 180 },
    large: { time: '64px', date: '18px', analog: 240 },
    xlarge: { time: '96px', date: '24px', analog: 320 }
  };
  const size = sizeMap[config.clockSize] || sizeMap.large;

  // Common styles
  const containerStyle = {
    backgroundColor: config.useTransparentBg ? 'transparent' : colors.backgroundColor,
    color: colors.textColor,
    textAlign: config.textAlign
  };

  const timeStyle = {
    fontSize: size.time,
    fontFamily: getFontFamily(config.digitFontFamily, true),
    fontWeight: 'bold',
    color: colors.clockColor,
    textShadow: config.textShadows ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
  };

  if (config.glowEffect) {
    timeStyle.textShadow = `0 0 ${JAZER_BRAND.glowBlur} currentColor`;
  }

  if (config.gradientText) {
    timeStyle.background = JAZER_BRAND.gradient;
    timeStyle.WebkitBackgroundClip = 'text';
    timeStyle.color = 'transparent';
  }

  // Format time based on type
  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: config.showSeconds ? '2-digit' : undefined,
      hour12: config.is12Hour
    });
  };

  // Render different clock types
  const renderClock = () => {
    const timeStr = formatTime();

    // DIGITAL CLOCKS
    if (config.clockType === 'digital-solid') {
      return (
        <div style={timeStyle} className="tabular-nums tracking-tight">
          {timeStr}
        </div>
      );
    }

    if (config.clockType === 'digital-roulette') {
      return (
        <div style={{...timeStyle, letterSpacing: '0.1em'}} className="tabular-nums font-mono">
          {timeStr.split('').map((char, i) => (
            <span key={i} style={{
              display: 'inline-block',
              animation: `roulette 0.5s ease ${i * 0.05}s`,
              transformOrigin: 'center'
            }}>
              {char}
            </span>
          ))}
        </div>
      );
    }

    if (config.clockType === 'flip-clock') {
      const parts = timeStr.match(/\d+/g) || [];
      return (
        <div className="flex gap-2 justify-center items-center">
          {parts.map((part, i) => (
            <React.Fragment key={i}>
              <FlipCard
                value={parseInt(part)}
                label={i === 0 ? 'HR' : i === 1 ? 'MIN' : 'SEC'}
                size={parseInt(size.time)}
                colors={{ clockColor: colors.clockColor, digitColor: colors.digitColor }}
              />
              {i < parts.length - 1 && <span style={{fontSize: size.time, opacity: 0.5}}>:</span>}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // ANALOG CLOCKS
    if (config.clockType.startsWith('analog-')) {
      const analogType = config.clockType.replace('analog-', '');
      return <AnalogClock
        time={time}
        size={size.analog}
        type={analogType}
        colors={colors}
        config={config}
      />;
    }

    return <div style={timeStyle}>{timeStr}</div>;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6" style={containerStyle}>
      {renderClock()}

      {config.showDate && (
        <div
          className="mt-4 font-medium"
          style={{
            fontSize: size.date,
            fontFamily: getFontFamily(config.textFontFamily),
            opacity: 0.7,
            color: colors.textColor,
            textShadow: config.textShadows ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      )}

      {config.showCustomizeButton && (
        <button
          className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: colors.clockColor,
            color: colors.digitColor,
            opacity: 0.8
          }}
        >
          Customize
        </button>
      )}
    </div>
  );
};
