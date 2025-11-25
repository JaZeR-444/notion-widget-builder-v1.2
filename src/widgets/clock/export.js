// Clock Widget HTML and Script Export
// Generates standalone HTML with embedded JAZER_BRAND styles

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

export const generateClockHTML = (config) => {
  const isDark = config.appearance === 'dark';
  const colors = isDark ? config.darkMode : config.lightMode;
  const bgColor = config.useTransparentBg ? 'transparent' : colors.backgroundColor;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clock Widget</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 100vw;
      height: 100vh;
      background: ${bgColor};
      color: ${colors.textColor};
      font-family: ${JAZER_BRAND.fonts.body};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: ${config.textAlign};
    }

    #clock {
      font-size: 64px;
      font-weight: bold;
      color: ${colors.clockColor};
      ${config.textShadows ? 'text-shadow: 0 2px 4px rgba(0,0,0,0.1);' : ''}
      ${config.glowEffect ? `text-shadow: 0 0 ${JAZER_BRAND.glowBlur} ${colors.clockColor};` : ''}
      ${config.gradientText ? `
        background: ${JAZER_BRAND.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ` : ''}
    }

    #date {
      margin-top: 16px;
      font-size: 18px;
      opacity: 0.7;
      ${config.textShadows ? 'text-shadow: 0 1px 2px rgba(0,0,0,0.1);' : ''}
    }

    .customize-button {
      margin-top: 16px;
      padding: 8px 16px;
      background: ${colors.clockColor};
      color: ${colors.digitColor};
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: ${JAZER_BRAND.fonts.heading};
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .customize-button:hover {
      opacity: 1;
    }

    @media (prefers-color-scheme: dark) {
      ${config.appearance === 'system' ? `
        body {
          background: ${config.useTransparentBg ? 'transparent' : config.darkMode.backgroundColor};
          color: ${config.darkMode.textColor};
        }
        #clock {
          color: ${config.darkMode.clockColor};
        }
      ` : ''}
    }
  </style>
</head>
<body>
  <div id="clock"></div>
  ${config.showDate ? '<div id="date"></div>' : ''}
  ${config.showCustomizeButton ? '<button class="customize-button">Customize</button>' : ''}

  <script>
    ${generateClockScript(config)}
  </script>
</body>
</html>`;
};

export const generateClockScript = (config) => `
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: ${config.showSeconds},
      hour12: ${config.is12Hour}
    });

    document.getElementById('clock').textContent = timeStr;

    ${config.showDate ? `
      const dateStr = now.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      document.getElementById('date').textContent = dateStr;
    ` : ''}
  }

  setInterval(updateClock, 1000);
  updateClock();
`;
