import React, { useState, useEffect } from 'react';
import { Instagram, RefreshCcw } from 'lucide-react';

// JAZER_BRAND will be passed via props or imported from a shared constants file
// For now, we'll define it locally or expect it as a prop
export const QuotesWidget = ({ config, brand }) => {
  // Use passed brand or fallback
  const JAZER_BRAND = brand || {
    colors: {
      electricPurple: '#8B5CF6', cosmicBlue: '#3B82F6', neonPink: '#EC4899', sunburstGold: '#F59E0B',
      aetherTeal: '#06B6D4', ultraviolet: '#A78BFA', nightBlack: '#0B0E12', stardustWhite: '#F8F9FF',
      graphite: '#1F2937', softSlate: '#94A3B8',
    },
    fonts: { heading: '"Orbitron", system-ui, sans-serif', body: '"Montserrat", system-ui, sans-serif' },
    gradient: 'linear-gradient(90deg, #EC4899 0%, #F59E0B 28%, #06B6D4 50%, #3B82F6 74%, #8B5CF6 100%)',
    glow: '0 0 4px rgba(139, 92, 246, 0.5)',
  };
  const [currentQuote, setCurrentQuote] = useState({
    text: config.quoteText,
    author: config.author
  });
  const [isDark, setIsDark] = useState(() => {
    if (config.appearanceMode === 'dark') return true;
    if (config.appearanceMode === 'light') return false;
    if (config.appearanceMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [fetching, setFetching] = useState(false);

  // Example quotes pool for rotation
  const exampleQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
  ];

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
    // 'do-nothing' mode doesn't change isDark
  }, [config.appearanceMode]);

  // Fetch new quote (mock implementation - cycles through examples)
  const fetchQuote = () => {
    setFetching(true);
    setTimeout(() => {
      const randomQuote = exampleQuotes[Math.floor(Math.random() * exampleQuotes.length)];
      setCurrentQuote(randomQuote);
      setFetching(false);
    }, 500);
  };

  // Font mapping
  const getFontFamily = (fontType) => {
    const fontMap = {
      body: JAZER_BRAND.fonts.body,
      heading: JAZER_BRAND.fonts.heading,
      serif: 'ui-serif, Georgia, serif',
      mono: 'ui-monospace, "Courier New", monospace'
    };
    return fontMap[fontType] || JAZER_BRAND.fonts.body;
  };

  // Get colors based on appearance mode
  const textColor = isDark ? config.textColorDark : config.textColorLight;
  const quoteBackground = isDark ? config.quoteBackgroundDark : config.quoteBackgroundLight;
  const bgColor = config.useTransparentBackground
    ? 'transparent'
    : (config.setBackgroundColor ? config.backgroundColor : quoteBackground);

  // Text shadow calculation
  const textShadow = config.textShadows ? '0 2px 4px rgba(0,0,0,0.1)' : 'none';

  // Quote text styles
  const quoteTextStyle = {
    fontSize: `${config.fontSize}px`,
    fontFamily: getFontFamily(config.quoteTextFont),
    fontStyle: 'italic',
    lineHeight: '1.6',
    textShadow: textShadow,
    ...(config.gradientQuoteText && {
      background: JAZER_BRAND.gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    })
  };

  // Author/attribution styles
  const attributionStyle = {
    fontFamily: getFontFamily(config.attributionFont),
    color: config.authorColor,
    fontSize: '14px',
    fontWeight: 'bold',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: textShadow
  };

  // Quote card styles
  const quoteCardStyle = {
    background: bgColor,
    color: config.gradientQuoteText ? textColor : textColor,
    textAlign: config.textAlign,
    padding: '48px',
    borderRadius: '16px',
    ...(config.gradientQuoteCardBorder && {
      border: '2px solid transparent',
      backgroundImage: `${JAZER_BRAND.gradient}, ${bgColor}`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }),
    ...(config.glowQuoteCard && {
      boxShadow: JAZER_BRAND.glow
    })
  };

  // Refresh icon button styles
  const refreshButtonStyle = {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '50%',
    backgroundColor: config.useGradientRefreshIcon
      ? 'transparent'
      : `${config.refreshIconColor}20`,
    border: config.useGradientRefreshIcon ? `2px solid ${config.refreshIconColor}` : 'none',
    color: config.refreshIconColor,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ...(config.useGradientRefreshIcon && {
      background: JAZER_BRAND.gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    })
  };

  const refreshButtonHoverStyle = config.glowRefreshIconHover
    ? { filter: `drop-shadow(${JAZER_BRAND.glow})` }
    : {};

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full p-8 relative"
      style={{
        background: bgColor,
        color: textColor
      }}
    >
      {/* Loading overlay */}
      {fetching && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm z-10 rounded-lg">
          <span className="text-xl font-bold" style={{ fontFamily: JAZER_BRAND.fonts.heading }}>
            Loading...
          </span>
        </div>
      )}

      {/* Quote card */}
      <div style={quoteCardStyle} className="max-w-3xl w-full">
        {/* Quote text */}
        <p className="mb-6" style={quoteTextStyle}>
          "{currentQuote.text}"
        </p>

        {/* Author and Instagram link */}
        <div className="flex flex-col items-center gap-2">
          <span style={attributionStyle}>
            — {currentQuote.author}
          </span>

          {config.instagramAccount && (
            <a
              href={`https://www.instagram.com/${config.instagramAccount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs opacity-50 hover:opacity-100 hover:underline transition-opacity"
              style={{ color: textColor }}
            >
              <Instagram className="w-3 h-3" />
              @{config.instagramAccount}
            </a>
          )}
        </div>

        {/* Refresh icon */}
        {config.showRefreshIcon && (
          <button
            onClick={fetchQuote}
            className="mx-auto hover:scale-110 transition-transform"
            style={refreshButtonStyle}
            onMouseEnter={(e) => {
              if (config.glowRefreshIconHover) {
                Object.assign(e.currentTarget.style, refreshButtonHoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (config.glowRefreshIconHover) {
                e.currentTarget.style.filter = 'none';
              }
            }}
            aria-label="Refresh Quote"
            disabled={fetching}
          >
            <RefreshCcw className={`w-5 h-5 ${fetching ? 'animate-spin' : ''}`} />
          </button>
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
