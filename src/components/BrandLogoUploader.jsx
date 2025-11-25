import React, { useState, useRef } from 'react';
import { Upload, X, Loader, Check, Sparkles } from 'lucide-react';
import ColorThief from 'colorthief';

const BrandLogoUploader = ({ onColorsExtracted }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [extractedColors, setExtractedColors] = useState(null);
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);

    const rgbToHex = (r, g, b) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();

        reader.onload = (event) => {
            setPreview(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const extractColors = () => {
        if (!imgRef.current) return;

        const colorThief = new ColorThief();
        try {
            // Get dominant color and palette
            const dominantColor = colorThief.getColor(imgRef.current);
            const palette = colorThief.getPalette(imgRef.current, 8);

            const hexPalette = palette.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
            const hexDominant = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);

            // Generate a complete theme from extracted colors
            const theme = {
                primary: hexDominant,
                secondary: hexPalette[1] || hexPalette[0],
                accent: hexPalette[2] || hexPalette[1],
                background: hexPalette[hexPalette.length - 1], // Lightest color
                text: hexPalette[0], // Darkest color
                palette: hexPalette
            };

            setExtractedColors(theme);
            setUploading(false);

            // Notify parent component
            if (onColorsExtracted) {
                onColorsExtracted(theme);
            }
        } catch (error) {
            console.error('Color extraction failed:', error);
            setUploading(false);
        }
    };

    return (
        <div className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg mb-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                    Brand Logo Color Extraction
                </h4>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
            />

            {!preview ? (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 border-2 border-dashed border-purple-400/50 rounded-lg hover:border-purple-400 hover:bg-purple-500/10 transition-all flex flex-col items-center gap-2 text-purple-300 hover:text-purple-200">
                    <Upload className="w-8 h-8" />
                    <span className="text-sm font-medium">Upload Brand Logo</span>
                    <span className="text-xs text-purple-400/70">Auto-extract colors for your widget</span>
                </button>
            ) : (
                <div className="space-y-3">
                    <div className="relative">
                        <img
                            ref={imgRef}
                            src={preview}
                            alt="Brand logo"
                            crossOrigin="anonymous"
                            onLoad={extractColors}
                            className="w-full h-32 object-contain bg-white/5 rounded-lg"
                        />
                        <button
                            onClick={() => {
                                setPreview(null);
                                setExtractedColors(null);
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {uploading && (
                        <div className="flex items-center gap-2 text-purple-300 text-sm">
                            <Loader className="w-4 h-4 animate-spin" />
                            Extracting colors...
                        </div>
                    )}

                    {extractedColors && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-green-400">
                                <Check className="w-3 h-3" />
                                Colors extracted successfully!
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {extractedColors.palette.map((color, idx) => (
                                    <div key={idx} className="text-center">
                                        <div
                                            className="w-full h-10 rounded border border-white/20 shadow-lg"
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                        <div className="text-[8px] text-white/50 mt-1 font-mono">{color}</div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => onColorsExtracted && onColorsExtracted(extractedColors)}
                                className="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                                Apply Colors to Widget
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BrandLogoUploader;
