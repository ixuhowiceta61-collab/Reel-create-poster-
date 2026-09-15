import React from 'react';
import { CustomTextStyle, TypographyStyle, TextPosition } from '../types';
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  Type,
} from 'lucide-react';

interface TextControlsProps {
  textStyle: CustomTextStyle;
  onChange: (updated: Partial<CustomTextStyle>) => void;
  onReset: () => void;
}

export const TextControls: React.FC<TextControlsProps> = ({
  textStyle,
  onChange,
  onReset,
}) => {
  const fontFamilies: { id: TypographyStyle; label: string; preview: string }[] = [
    { id: 'elegant-bengali', label: 'মার্জিত বাংলা (Serif)', preview: 'ভালোবাসা' },
    { id: 'handwritten', label: 'হাতে লেখা (Handwritten)', preview: 'ভালোবাসা' },
    { id: 'vintage-serif', label: 'ভিন্টেজ সেরিফ (Vintage Serif)', preview: 'ভালোবাসা' },
    { id: 'typewriter', label: 'টাইপরাইটার (Typewriter)', preview: 'ভালোবাসা' },
    { id: 'classic', label: 'ক্লাসিক বাংলা (Classic)', preview: 'ভালোবাসা' },
    { id: 'calligraphy', label: 'ক্যালিগ্রাফি (Calligraphy)', preview: 'ভালোবাসা' },
    { id: 'old-newspaper', label: 'সংবাদপত্র (Old Newspaper)', preview: 'ভালোবাসা' },
  ];

  const colorPalette = [
    { id: '#f5edd8', label: 'Warm Cream' },
    { id: '#d4af37', label: 'Antique Gold' },
    { id: '#fef08a', label: 'Soft Lemon' },
    { id: '#fda4af', label: 'Vintage Rose' },
    { id: '#ffffff', label: 'Ivory White' },
    { id: '#fed7aa', label: 'Peach Paper' },
    { id: '#d1d5db', label: 'Silver Dust' },
    { id: '#1c1917', label: 'Sepia Ink' },
  ];

  const positions: { id: TextPosition; label: string }[] = [
    { id: 'center', label: 'মাঝখানে (Center)' },
    { id: 'top', label: 'উপরে (Top)' },
    { id: 'bottom', label: 'নিচে (Bottom)' },
    { id: 'center-left', label: 'বামে (Left)' },
    { id: 'center-right', label: 'ডানে (Right)' },
  ];

  return (
    <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 space-y-5 text-[#f4ecd8]">
      <div className="flex items-center justify-between border-b border-[#2d221b] pb-3">
        <h4 className="font-serif text-[#fef08a] font-semibold text-sm flex items-center gap-2">
          <Type className="w-4 h-4 text-[#d4af37]" />
          <span>টেক্সট কাস্টমাইজেশন (Typography Controls)</span>
        </h4>
        <button
          type="button"
          id="reset-text-style-btn"
          onClick={onReset}
          className="text-xs text-[#a89078] hover:text-[#fef08a] flex items-center gap-1 transition-colors cursor-pointer px-2 py-1 rounded bg-[#241a15] hover:bg-[#34241d]"
          title="Reset Text Style"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Style</span>
        </button>
      </div>

      {/* Font Family Selection */}
      <div>
        <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-2">
          ফন্ট স্টাইল (Font Family)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {fontFamilies.map((f) => (
            <button
              key={f.id}
              type="button"
              id={`font-family-${f.id}`}
              onClick={() => onChange({ fontFamily: f.id })}
              className={`p-2.5 rounded-lg border text-left transition-all text-xs cursor-pointer ${
                textStyle.fontFamily === f.id
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37] shadow-sm'
                  : 'bg-[#1e1713] text-[#cfbeaa] border-[#382b22] hover:border-[#802a32]'
              }`}
            >
              <div className="font-semibold truncate">{f.label}</div>
              <div className="text-[11px] opacity-75 font-bengali mt-0.5">{f.preview}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size & Alignment Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Size Slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-serif text-[#c5a059] uppercase tracking-wider">
              ফন্ট সাইজ (Size): {textStyle.fontSize}px
            </label>
          </div>
          <input
            type="range"
            id="font-size-slider"
            min="14"
            max="38"
            value={textStyle.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full accent-[#d4af37] bg-[#241a15] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Alignment & Bold / Italic */}
        <div>
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1">
            অ্যালাইনমেন্ট ও স্টাইল
          </label>
          <div className="flex items-center gap-1.5">
            {/* Alignments */}
            <button
              type="button"
              id="align-left-btn"
              onClick={() => onChange({ textAlign: 'left' })}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                textStyle.textAlign === 'left'
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#1e1713] text-[#a39281] border-[#382b22]'
              }`}
              title="Left Align"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="align-center-btn"
              onClick={() => onChange({ textAlign: 'center' })}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                textStyle.textAlign === 'center'
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#1e1713] text-[#a39281] border-[#382b22]'
              }`}
              title="Center Align"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="align-right-btn"
              onClick={() => onChange({ textAlign: 'right' })}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                textStyle.textAlign === 'right'
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#1e1713] text-[#a39281] border-[#382b22]'
              }`}
              title="Right Align"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-6 bg-[#3b2d24] mx-1" />

            {/* Bold */}
            <button
              type="button"
              id="toggle-bold-btn"
              onClick={() => onChange({ isBold: !textStyle.isBold })}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                textStyle.isBold
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#1e1713] text-[#a39281] border-[#382b22]'
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>

            {/* Italic */}
            <button
              type="button"
              id="toggle-italic-btn"
              onClick={() => onChange({ isItalic: !textStyle.isItalic })}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                textStyle.isItalic
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#1e1713] text-[#a39281] border-[#382b22]'
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Letter Spacing & Line Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-serif text-[#c5a059] uppercase tracking-wider">
              লেটার স্পেসিং (Spacing): {textStyle.letterSpacing}em
            </label>
          </div>
          <input
            type="range"
            id="letter-spacing-slider"
            min="0"
            max="0.2"
            step="0.02"
            value={textStyle.letterSpacing}
            onChange={(e) => onChange({ letterSpacing: Number(e.target.value) })}
            className="w-full accent-[#d4af37] bg-[#241a15] h-2 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-serif text-[#c5a059] uppercase tracking-wider">
              লাইন হাইট (Line Height): {textStyle.lineHeight}x
            </label>
          </div>
          <input
            type="range"
            id="line-height-slider"
            min="1.2"
            max="2.2"
            step="0.1"
            value={textStyle.lineHeight}
            onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
            className="w-full accent-[#d4af37] bg-[#241a15] h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Text Color & Position */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Colors */}
        <div>
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-2">
            কালার (Text Color)
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {colorPalette.map((c) => (
              <button
                key={c.id}
                type="button"
                id={`color-${c.id.replace('#', '')}`}
                onClick={() => onChange({ textColor: c.id })}
                className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                  textStyle.textColor === c.id
                    ? 'scale-110 border-[#fef08a] shadow-md shadow-[#d4af37]/40'
                    : 'border-[#3b2d24] hover:scale-105'
                }`}
                style={{ backgroundColor: c.id }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-2">
            অবস্থান (Text Position)
          </label>
          <select
            id="text-position-select"
            value={textStyle.textPosition}
            onChange={(e) => onChange({ textPosition: e.target.value as TextPosition })}
            className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-lg px-3 py-2 text-xs text-[#fef08a] focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            {positions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
