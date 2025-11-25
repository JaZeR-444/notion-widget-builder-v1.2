import React, { useState, useEffect } from 'react';
import {
  Plus, Minus, Edit, Trash2, Copy, Palette, Settings, ExternalLink, HelpCircle, ChevronDown, ChevronUp, MousePointerClick
} from 'lucide-react';
import { nanoid } from 'nanoid'; // For unique button IDs

// --- JAZER_BRAND CONSTANT (Required for defaultConfig and generateHTML) ---
const JAZER_BRAND = {
  colors: {
    electricPurple: '#8B5CF6', cosmicBlue: '#3B82F6', neonPink: '#EC4899', sunburstGold: '#F59E0B',
    aetherTeal: '#06B6D4', ultraviolet: '#A78BFA', nightBlack: '#0B0E12', stardustWhite: '#F8F9FF',
    graphite: '#1F2937', softSlate: '#94A3B8',
  },
  glowBlur: '4px',
};

// Helper for escaping HTML (copied from App.jsx)
const escapeHTML = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>'"]/,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
};

// --- BUTTON PRESETS (Mapping to JAZER_BRAND colors) ---
// --- BUTTON PRESETS MOVED INSIDE COMPONENT TO ACCESS BRAND PROP ---

// --- INITIAL BUTTON STATE ---
// --- INITIAL BUTTON STATE ---
const initialButton = {
  id: nanoid(),
  label: 'Button',
  icon: '✨',
  hideIcon: false,
  url: 'https://indify.co',
  bgColor: '#8B5CF6', // Electric Purple
  bgOpacity: 100,
  outlineColor: '#8B5CF6',
  textColor: '#F8F9FF', // Stardust White
  enableHoverHighlight: true,
  hoverBgColor: '#A78BFA', // Ultraviolet
  hoverTextColor: '#F8F9FF',
  size: 'medium',
  rounding: 'round',
};

// --- WIDGET DEFINITION (Monolithic as per constraint) ---
export const newButtonGenerator = {
  id: 'newButtonGenerator',
  label: 'Button Generator',
  icon: <MousePointerClick className="w-4 h-4" />,
  description: 'Create customizable buttons with advanced styling and actions.',

  defaultConfig: {
    buttons: [initialButton],
    layout: 'horizontal', // 'horizontal', 'vertical', 'full-width'
    alignment: 'center',  // 'left', 'center', 'right', 'space-evenly'
    useTransparentBackground: false,
    setBackgroundColor: true,
    backgroundColor: JAZER_BRAND.colors.stardustWhite, // Default widget background
    appearanceMode: 'system', // 'none', 'system', 'light', 'dark'
    showHoverMenu: true,
    showCustomizeButton: true,
  },

  fields: [
    // Global Widget Settings
    { name: 'useTransparentBackground', label: 'Transparent Widget Background', type: 'boolean', section: 'global' },
    { name: 'setBackgroundColor', label: 'Set Widget Background Color', type: 'boolean', section: 'global' },
    { name: 'backgroundColor', label: 'Widget Background Color', type: 'color', section: 'global' },
    {
      name: 'appearanceMode', label: 'Dark/Light Appearance', type: 'select', section: 'global', options: [
        { label: 'Do Nothing', value: 'none' },
        { label: 'Use System Setting', value: 'system' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' }
      ]
    },
    { name: 'showHoverMenu', label: 'Show Hover Menu', type: 'boolean', section: 'global' },
    { name: 'showCustomizeButton', label: 'Show Customize Button', type: 'boolean', section: 'global' },

    // Button Layout
    {
      name: 'layout', label: 'Button Layout', type: 'select', section: 'layout', options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Full Width', value: 'full-width' }
      ]
    },
    {
      name: 'alignment', label: 'Button Alignment', type: 'select', section: 'layout', options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Space Evenly', value: 'space-evenly' }
      ]
    },

    // Note: Individual button fields are handled dynamically within the Component
  ],

  Component: ({ config, onConfigChange, brand }) => {
    // State declarations
    const [buttons, setButtons] = useState(config.buttons || [initialButton]);
    const [activeButtonId, setActiveButtonId] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(null);

    // Calculate activeIndex from activeButtonId
    const activeIndex = activeButtonId ? buttons.findIndex(b => b.id === activeButtonId) : -1;

    // Use passed brand or fallback to defaults if missing (safety check)
    const JAZER_BRAND = brand || {
      colors: {
        electricPurple: '#8B5CF6', cosmicBlue: '#3B82F6', neonPink: '#EC4899', sunburstGold: '#F59E0B',
        aetherTeal: '#06B6D4', ultraviolet: '#A78BFA', nightBlack: '#0B0E12', stardustWhite: '#F8F9FF',
        graphite: '#1F2937', softSlate: '#94A3B8',
      },
      glowBlur: '4px',
    };

    const BUTTON_PRESETS = {
      purple: { bgColor: '#6940A5', outlineColor: '#6940A5', textColor: '#FFFFFF' },
      blue: { bgColor: '#0B6E99', outlineColor: '#0B6E99', textColor: '#FFFFFF' },
      red: { bgColor: '#E03E3E', outlineColor: '#E03E3E', textColor: '#FFFFFF' },
      green: { bgColor: '#0F7B6C', outlineColor: '#0F7B6C', textColor: '#FFFFFF' },
      yellow: { bgColor: '#DFAB01', outlineColor: '#DFAB01', textColor: '#FFFFFF' },
      orange: { bgColor: '#D9730D', outlineColor: '#D9730D', textColor: '#FFFFFF' },
      pink: { bgColor: '#AD1A72', outlineColor: '#AD1A72', textColor: '#FFFFFF' },
      brown: { bgColor: '#64473A', outlineColor: '#64473A', textColor: '#FFFFFF' },
      grey: { bgColor: '#9B9A97', outlineColor: '#9B9A97', textColor: '#FFFFFF' },
      black: { bgColor: '#000000', outlineColor: '#000000', textColor: '#FFFFFF' },
    };

    // Apply global config changes
    useEffect(() => {
      setButtons(config.buttons || [initialButton]);
    }, [config.buttons]);

    // Update global config when internal buttons state changes
    useEffect(() => {
      onConfigChange('buttons', buttons);
    }, [buttons, onConfigChange]);


    // Handle dark/light mode
    useEffect(() => {
      if (config.appearanceMode === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mq.matches);
        const handler = (e) => setIsDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
      } else if (config.appearanceMode === 'dark') {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }, [config.appearanceMode]);

    const handleAddButton = () => {
      setButtons([...buttons, { ...initialButton, id: nanoid() }]);
    };

    const handleDuplicateButton = (id) => {
      const buttonToDuplicate = buttons.find(b => b.id === id);
      if (buttonToDuplicate) {
        setButtons([...buttons, { ...buttonToDuplicate, id: nanoid() }]);
      }
    };

    const handleDeleteButton = (id) => {
      if (buttons.length > 1 && window.confirm('Are you sure you want to delete this button?')) {
        setButtons(buttons.filter(button => button.id !== id));
        if (activeButtonId === id) setActiveButtonId(buttons[0]?.id);
      }
    };

    const handleMoveButton = (id, direction) => {
      const index = buttons.findIndex(b => b.id === id);
      if (index === -1) return;
      const newButtons = [...buttons];
      if (direction === 'up' && index > 0) {
        [newButtons[index - 1], newButtons[index]] = [newButtons[index], newButtons[index - 1]];
      } else if (direction === 'down' && index < newButtons.length - 1) {
        [newButtons[index + 1], newButtons[index]] = [newButtons[index], newButtons[index + 1]];
      }
      setButtons(newButtons);
    };

    const handleButtonChange = (id, key, value) => {
      setButtons(buttons.map(button =>
        button.id === id ? { ...button, [key]: value } : button
      ));
    };

    const handleApplyPreset = (id, preset) => {
      const newPreset = BUTTON_PRESETS[preset];
      setButtons(buttons.map(button =>
        button.id === id ? {
          ...button,
          bgColor: newPreset.bgColor,
          outlineColor: newPreset.outlineColor,
          textColor: newPreset.textColor,
          hoverBgColor: newPreset.hoverBg,
          hoverTextColor: newPreset.hoverText,
        } : button
      ));
    };

    const handleCopyStyleToOthers = (id) => {
      const sourceButton = buttons.find(b => b.id === id);
      if (!sourceButton) return;
      const { id: _, ...styleToCopy } = sourceButton; // Exclude ID
      setButtons(buttons.map(button =>
        button.id === id ? button : { ...button, ...styleToCopy, id: nanoid() } // New ID for copied style
      ));
    };

    const widgetBg = config.useTransparentBackground ? 'transparent' : config.backgroundColor;

    // Helper to get button styles
    const getButtonStyle = (button) => {
      const borderRadius = button.rounding === 'none' ? '0px' :
        button.rounding === 'slight' ? '8px' : '9999px';
      const sizePadding = button.size === 'small' ? '8px 16px' :
        button.size === 'large' ? '16px 32px' : '12px 24px';
      const fontSize = button.size === 'small' ? '0.875rem' :
        button.size === 'large' ? '1.25rem' : '1rem';
      const outlineWidth = button.outlineColor === 'transparent' ? '0px' : '1px';

      return {
        backgroundColor: `${button.bgColor}${button.bgOpacity < 100 ? Math.round(255 * (button.bgOpacity / 100)).toString(16).padStart(2, '0') : ''}`,
        color: button.textColor,
        border: `${outlineWidth} solid ${button.outlineColor}`,
        borderRadius: borderRadius,
        padding: sizePadding,
        fontSize: fontSize,
        fontFamily: 'inherit', // Use inherited font, can be configured later
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        textDecoration: 'none',
        cursor: 'pointer',
        flexShrink: 0, // Prevent shrinking in horizontal layout
        width: config.layout === 'full-width' ? '100%' : 'auto',
        textAlign: 'center',
        boxShadow: config.showHoverMenu ? `0 0 ${JAZER_BRAND.glowBlur} rgba(0,0,0,0.2)` : 'none', // Subtle shadow
      };
    };

    return (
      <div
        className="flex flex-col items-center justify-center h-full w-full p-4 transition-colors"
        style={{
          backgroundColor: widgetBg,
          color: isDark ? JAZER_BRAND.colors.stardustWhite : JAZER_BRAND.colors.nightBlack,
          // Additional styling if needed based on global config
        }}
      >
        <div
          className={`flex flex-wrap gap-4 ${config.layout === 'vertical' ? 'flex-col' : ''}`}
          style={{
            justifyContent: config.alignment === 'space-evenly' ? 'space-evenly' :
              config.alignment === 'center' ? 'center' :
                config.alignment === 'left' ? 'flex-start' : 'flex-end',
            width: config.layout === 'full-width' ? '100%' : 'auto',
          }}
        >
          {buttons.map((button, index) => (
            <div key={button.id} className="group relative" draggable onDragStart={(e) => e.dataTransfer.setData("buttonId", button.id)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
              const draggedButtonId = e.dataTransfer.getData("buttonId");
              const draggedIndex = buttons.findIndex(b => b.id === draggedButtonId);
              const dropIndex = buttons.findIndex(b => b.id === button.id);
              if (draggedIndex === dropIndex) return;

              const newButtons = [...buttons];
              const [removed] = newButtons.splice(draggedIndex, 1);
              newButtons.splice(dropIndex, 0, removed);
              setButtons(newButtons);
            }}>
              <a
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-live-preview"
                style={{
                  ...getButtonStyle(button),
                  '--hover-bg': button.enableHoverHighlight ? button.hoverBgColor : 'inherit',
                  '--hover-text': button.enableHoverHighlight ? button.hoverTextColor : 'inherit',
                }}
              >
                {!button.hideIcon && button.icon}
                <span>{button.label}</span>
              </a>

              {/* Button Control Menu */}
              <div className="absolute top-0 right-0 p-1 bg-neutral-800 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                <button onClick={() => handleDuplicateButton(button.id)} className="p-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs"><Copy className="w-3 h-3" /></button>
                <button onClick={() => handleCopyStyleToOthers(button.id)} className="p-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs"><Palette className="w-3 h-3" /></button>
                <button onClick={() => setActiveButtonId(button.id)} className="p-1 rounded bg-gray-500 hover:bg-gray-600 text-white text-xs"><Edit className="w-3 h-3" /></button>
                <button onClick={() => handleDeleteButton(button.id)} className="p-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs"><Trash2 className="w-3 h-3" /></button>
                <button onClick={() => handleMoveButton(button.id, 'up')} disabled={index === 0} className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs disabled:opacity-50"><ChevronUp className="w-3 h-3" /></button>
                <button onClick={() => handleMoveButton(button.id, 'down')} disabled={index === buttons.length - 1} className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs disabled:opacity-50"><ChevronDown className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Button Settings Panel --- */}
        {activeButtonId && (
          <div className="mt-8 p-4 border rounded-lg shadow-lg bg-white w-full max-w-lg z-20">
            <h3 className="font-bold text-lg mb-4 flex justify-between items-center">
              Edit Button: {buttons.find(b => b.id === activeButtonId)?.label}
              <button onClick={() => setActiveButtonId(null)} className="text-neutral-500 hover:text-neutral-700"><X className="w-4 h-4" /></button>
            </h3>
            {activeIndex !== -1 && (
              <div className="space-y-4">
                {/* Basic Config */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Label</label>
                  <input type="text" value={buttons[activeIndex].label} onChange={(e) => handleButtonChange(activeButtonId, 'label', e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Icon</label>
                  {/* Simplified emoji picker, can be enhanced */}
                  <input type="text" value={buttons[activeIndex].icon} onChange={(e) => handleButtonChange(activeButtonId, 'icon', e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., ✨" />
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={buttons[activeIndex].hideIcon} onChange={(e) => handleButtonChange(activeButtonId, 'hideIcon', e.target.checked)} /> Hide Icon
                </label>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">URL</label>
                  <input type="url" value={buttons[activeIndex].url} onChange={(e) => handleButtonChange(activeButtonId, 'url', e.target.value)} className="w-full p-2 border rounded-md" placeholder="https://domain.ext/path" />
                </div>

                {/* Color Presets */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Color Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(BUTTON_PRESETS).map(preset => (
                      <button
                        key={preset}
                        onClick={() => handleApplyPreset(activeButtonId, preset)}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: BUTTON_PRESETS[preset].bgColor,
                          color: BUTTON_PRESETS[preset].textColor
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Colors (simplified) */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-neutral-700 border-b pb-1">Advanced Colors</h4>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Background Color</label>
                    <input type="color" value={buttons[activeIndex].bgColor} onChange={(e) => handleButtonChange(activeButtonId, 'bgColor', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Background Opacity ({buttons[activeIndex].bgOpacity}%)</label>
                    <input type="range" min="0" max="100" value={buttons[activeIndex].bgOpacity} onChange={(e) => handleButtonChange(activeButtonId, 'bgOpacity', parseInt(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Outline Color</label>
                    <input type="color" value={buttons[activeIndex].outlineColor} onChange={(e) => handleButtonChange(activeButtonId, 'outlineColor', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Text Color</label>
                    <input type="color" value={buttons[activeIndex].textColor} onChange={(e) => handleButtonChange(activeButtonId, 'textColor', e.target.value)} />
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={buttons[activeIndex].enableHoverHighlight} onChange={(e) => handleButtonChange(activeButtonId, 'enableHoverHighlight', e.target.checked)} /> Enable Hover Highlight
                  </label>
                  {buttons[activeIndex].enableHoverHighlight && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Hover Background Color</label>
                        <input type="color" value={buttons[activeIndex].hoverBgColor} onChange={(e) => handleButtonChange(activeButtonId, 'hoverBgColor', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Hover Text Color</label>
                        <input type="color" value={buttons[activeIndex].hoverTextColor} onChange={(e) => handleButtonChange(activeButtonId, 'hoverTextColor', e.target.value)} />
                      </div>
                    </>
                  )}
                </div>

                {/* Layout Options */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-neutral-700 border-b pb-1">Layout Options</h4>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Size</label>
                    <select value={buttons[activeIndex].size} onChange={(e) => handleButtonChange(activeButtonId, 'size', e.target.value)} className="w-full p-2 border rounded-md">
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Corner Rounding</label>
                    <select value={buttons[activeIndex].rounding} onChange={(e) => handleButtonChange(activeButtonId, 'rounding', e.target.value)} className="w-full p-2 border rounded-md">
                      <option value="none">None</option>
                      <option value="slight">Slight</option>
                      <option value="round">Round</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <button onClick={handleAddButton} className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Button
        </button>
      </div>
    );
  },

  generateHTML: (config) => {
    const widgetBg = config.useTransparentBackground ? 'transparent' : config.backgroundColor;

    const getButtonStyle = (button) => {
      const borderRadius = button.rounding === 'none' ? '0px' :
        button.rounding === 'slight' ? '8px' : '9999px';
      const sizePadding = button.size === 'small' ? '8px 16px' :
        button.size === 'large' ? '16px 32px' : '12px 24px';
      const fontSize = button.size === 'small' ? '0.875rem' :
        button.size === 'large' ? '1.25rem' : '1rem';
      const outlineWidth = button.outlineColor === 'transparent' ? '0px' : '1px';

      let buttonCss = `
            background-color: ${button.bgColor}${button.bgOpacity < 100 ? Math.round(255 * (button.bgOpacity / 100)).toString(16).padStart(2, '0') : ''};
            color: ${button.textColor};
            border: ${outlineWidth} solid ${button.outlineColor};
            border-radius: ${borderRadius};
            padding: ${sizePadding};
            font-size: ${fontSize};
            font-family: inherit; // Use inherited font, can be configured later
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            cursor: pointer;
            flex-shrink: 0; // Prevent shrinking in horizontal layout
            width: ${config.layout === 'full-width' ? '100%' : 'auto'};
            text-align: center;
            box-shadow: 0 0 ${JAZER_BRAND.glowBlur} rgba(0,0,0,0.2);
            transition: all 0.2s ease-in-out;
        `;

      if (button.enableHoverHighlight) {
        buttonCss += `
            &:hover {
                background-color: ${button.hoverBgColor};
                color: ${button.hoverTextColor};
            }
          `;
      }
      return buttonCss;
    };

    const containerStyle = `
        display: flex;
        gap: 16px;
        flex-wrap: ${config.layout === 'vertical' ? 'nowrap' : 'wrap'};
        flex-direction: ${config.layout === 'vertical' ? 'column' : 'row'};
        justify-content: ${config.alignment === 'space-evenly' ? 'space-evenly' :
        config.alignment === 'center' ? 'center' :
          config.alignment === 'left' ? 'flex-start' : 'flex-end'};
        width: ${config.layout === 'full-width' ? '100%' : 'auto'};
        height: 100%;
        align-items: ${config.layout === 'full-width' && config.alignment === 'center' ? 'center' :
        config.layout === 'full-width' && config.alignment === 'left' ? 'flex-start' :
          config.layout === 'full-width' && config.alignment === 'right' ? 'flex-end' :
            'initial'}; /* Adjusted for full-width alignment */
    `;

    return `
      <div style="
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        width: 100vw; 
        background: ${widgetBg};
        padding: 16px;
        box-sizing: border-box;
      ">
        <div style="${containerStyle}">
          ${config.buttons.map(button => `
            <a href="${escapeHTML(button.url)}" target="_blank" rel="noopener noreferrer" 
               style="${getButtonStyle(button)}"
               class="generated-button"
            >
              ${!button.hideIcon ? escapeHTML(button.icon) : ''}
              <span>${escapeHTML(button.label)}</span>
            </a>
          `).join('')}
        </div>
        <style>
          .generated-button:hover {
              background-color: var(--hover-bg);
              color: var(--hover-text);
          }
        </style>
      </div>
    `;
  },

  generateScript: () => {
    // For simplicity, no specific dynamic script needed beyond HTML for static buttons
    return '';
  }
};

export default newButtonGenerator; // Export the monolithic object
