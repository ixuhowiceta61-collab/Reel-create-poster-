import React, { forwardRef } from 'react';
import {
  PostcardTemplate,
  CustomTextStyle,
  VintageEffect,
  AspectRatioFormat,
} from '../types';
import { getVintageArtworkSvg } from '../utils/artworks';

interface PosterPreviewProps {
  template: PostcardTemplate;
  recipient: string;
  mainQuote: string;
  sender: string;
  date: string;
  textStyle: CustomTextStyle;
  effect: VintageEffect;
  aspectRatio: AspectRatioFormat;
  showStamp?: boolean;
  showPostmark?: boolean;
  className?: string;
}

export const PosterPreview = forwardRef<HTMLDivElement, PosterPreviewProps>(
  (
    {
      template,
      recipient,
      mainQuote,
      sender,
      date,
      textStyle,
      effect,
      aspectRatio,
      showStamp = true,
      showPostmark = true,
      className = '',
    },
    ref
  ) => {
    // Determine aspect ratio styling classes or inline styles
    const getAspectRatioStyle = () => {
      switch (aspectRatio) {
        case 'square':
          return { aspectRatio: '1 / 1' };
        case 'story':
        case 'whatsapp':
          return { aspectRatio: '9 / 16' };
        case 'facebook':
          return { aspectRatio: '1.91 / 1' };
        case 'postcard':
        default:
          return { aspectRatio: '4 / 3' };
      }
    };

    // Determine font family styling
    const getFontFamilyStyle = () => {
      switch (textStyle.fontFamily) {
        case 'handwritten':
          return { fontFamily: "'Galada', cursive" };
        case 'vintage-serif':
          return { fontFamily: "'Playfair Display', 'Noto Serif Bengali', serif" };
        case 'typewriter':
          return { fontFamily: "'Courier Prime', 'Noto Serif Bengali', monospace" };
        case 'classic':
          return { fontFamily: "'Anek Bangla', sans-serif" };
        case 'calligraphy':
          return { fontFamily: "'Great Vibes', 'Galada', cursive" };
        case 'old-newspaper':
          return { fontFamily: "'Cinzel', 'Noto Serif Bengali', serif" };
        case 'elegant-bengali':
        default:
          return { fontFamily: "'Noto Serif Bengali', serif" };
      }
    };

    // Vintage effect filters applied to the artwork/card
    const getEffectClass = () => {
      switch (effect) {
        case 'sepia':
          return 'sepia-[0.55] contrast-[1.05] brightness-[0.95]';
        case 'old-paper':
          return 'sepia-[0.4] contrast-[1.1] hue-rotate-[-10deg] brightness-[0.92]';
        case 'faded':
          return 'contrast-[0.85] brightness-[1.1] saturate-[0.7]';
        case 'bw':
          return 'grayscale contrast-[1.25] brightness-[0.95]';
        case 'film-grain':
          return 'contrast-[1.15] saturate-[0.85]';
        case 'dust':
          return 'sepia-[0.25] contrast-[1.08]';
        case 'scratch':
          return 'contrast-[1.2] brightness-[0.92]';
        case 'coffee-stain':
          return 'sepia-[0.6] contrast-[1.15] saturate-[1.2]';
        case 'warm-vintage':
          return 'contrast-[1.1] saturate-[1.25] hue-rotate-[-8deg]';
        case 'original':
        default:
          return '';
      }
    };

    // Border style decorations
    const getBorderDecoration = () => {
      switch (template.borderStyle) {
        case 'ornate-filigree':
          return 'border-8 border-double border-[#d4af37]/70 shadow-[0_0_20px_rgba(212,175,55,0.15)]';
        case 'stamp-edge':
          return 'border-4 border-dashed border-[#b39268] shadow-md';
        case 'postal-frame':
          return 'border-[6px] border-[#8c7353] outline outline-1 outline-[#d4af37]/40 outline-offset-4';
        case 'newspaper-border':
          return 'border-4 border-[#3b322c] outline outline-1 outline-[#786354] outline-offset-2';
        case 'minimal-vintage':
          return 'border-2 border-[#5c493d]';
        case 'classic-gold':
        default:
          return 'border-4 border-[#c5a059] shadow-lg shadow-black/60';
      }
    };

    // Text position positioning classes
    const getPositionClass = () => {
      switch (textStyle.textPosition) {
        case 'top':
          return 'justify-start pt-8 pb-4';
        case 'bottom':
          return 'justify-end pt-4 pb-8';
        case 'center-left':
          return 'justify-center items-start text-left pl-8 pr-16';
        case 'center-right':
          return 'justify-center items-end text-right pr-8 pl-16';
        case 'center':
        default:
          return 'justify-center items-center text-center';
      }
    };

    const artworkSvg = getVintageArtworkSvg(template.artworkType, template.themeColor);

    return (
      <div
        ref={ref}
        id="poster-export-container"
        style={getAspectRatioStyle()}
        className={`relative w-full max-w-full overflow-hidden bg-[#15100d] rounded-xl select-none transition-all duration-300 ${getBorderDecoration()} ${className}`}
      >
        {/* Layer 1: Vector Background Artwork */}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 ${getEffectClass()}`}
          dangerouslySetInnerHTML={{ __html: artworkSvg }}
        />

        {/* Layer 2: Vintage Dark Vignette & Atmospheric Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08]/85 via-[#0e0a08]/45 to-[#0e0a08]/70 pointer-events-none" />

        {/* Layer 3: Paper Grain / Noise / Texture Simulation */}
        <div
          className="absolute inset-0 opacity-[0.14] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(#eeddb7 1px, transparent 1px), radial-gradient(#d4af37 1px, #1c1410 1px)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Layer 4: Coffee stain effect if selected */}
        {effect === 'coffee-stain' && (
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-[18px] border-[#5e381b]/35 blur-[1px] pointer-events-none" />
        )}

        {/* Layer 5: Film Grain / Scratches overlay if selected */}
        {(effect === 'scratch' || effect === 'film-grain') && (
          <div className="absolute inset-0 pointer-events-none opacity-25 flex flex-col justify-around">
            <div className="w-full h-[1px] bg-[#f5ebd7]/30 transform rotate-1"></div>
            <div className="w-full h-[1px] bg-[#f5ebd7]/20 transform -rotate-2"></div>
            <div className="w-2/3 h-[1px] bg-[#f5ebd7]/25 mx-auto"></div>
          </div>
        )}

        {/* Layer 6: Vintage Corner Ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none"></div>

        {/* Layer 7: Authentic Vintage Postal Stamp & Cancellation Mark (Top Right) */}
        {showStamp && (
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end pointer-events-none">
            <div className="relative w-14 sm:w-16 h-16 sm:h-20 bg-[#fdfbf7] p-1 border-2 border-dashed border-[#8c7353] shadow-md transform rotate-2">
              <div className="w-full h-full bg-[#1e293b] flex flex-col items-center justify-between p-1 text-[8px] text-[#f8fafc] text-center">
                <span className="font-serif tracking-widest text-[#d4af37]">POST</span>
                <span className="text-base sm:text-lg">💌</span>
                <span className="font-mono text-[7px] text-[#94a3b8]">১০ পয়সা</span>
              </div>

              {/* Postal cancellation postmark wavy lines & round ink stamp */}
              {showPostmark && (
                <div className="absolute -left-6 top-3 w-16 h-16 rounded-full border-2 border-[#1c1917]/70 flex flex-col items-center justify-center text-[7px] font-mono font-bold text-[#1c1917]/80 transform -rotate-12 pointer-events-none">
                  <span className="text-[6px]">CALCUTTA G.P.O</span>
                  <span className="text-[7px] border-t border-b border-[#1c1917]/60 px-1 my-0.5">
                    {date || '1947'}
                  </span>
                  <span className="text-[6px]">SPECIAL POST</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Layer 8: Postcard Content Frame */}
        <div className={`relative z-20 w-full h-full p-6 sm:p-8 flex flex-col ${getPositionClass()}`}>
          {/* Inner Content Container */}
          <div
            className="w-full max-w-xl mx-auto space-y-4"
            style={{
              ...getFontFamilyStyle(),
              textAlign: textStyle.textAlign,
            }}
          >
            {/* Recipient Greeting (প্রাপক) */}
            {recipient && (
              <div
                className="text-sm sm:text-base tracking-wide italic"
                style={{
                  color: textStyle.textColor,
                  opacity: 0.9,
                }}
              >
                {recipient},
              </div>
            )}

            {/* Main Romantic Quote (মূল উক্তি) */}
            <div
              className="leading-relaxed drop-shadow-md font-bengali"
              style={{
                fontSize: `${textStyle.fontSize}px`,
                fontWeight: textStyle.isBold ? '700' : '400',
                fontStyle: textStyle.isItalic ? 'italic' : 'normal',
                letterSpacing: `${textStyle.letterSpacing}em`,
                lineHeight: textStyle.lineHeight,
                color: textStyle.textColor,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)',
              }}
            >
              “{mainQuote || template.defaultQuote}”
            </div>

            {/* Bottom Footer Details: Sender & Date */}
            {(sender || date) && (
              <div
                className="pt-2 flex flex-col gap-1 text-xs sm:text-sm"
                style={{
                  color: textStyle.textColor,
                  opacity: 0.85,
                  alignItems:
                    textStyle.textAlign === 'left'
                      ? 'flex-start'
                      : textStyle.textAlign === 'right'
                      ? 'flex-end'
                      : 'center',
                }}
              >
                {sender && <div className="italic font-medium">{sender}</div>}
                {date && <div className="text-[11px] opacity-75 font-mono">{date}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Vintage Seal / Subtle Brand Emblem */}
        <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5 opacity-60 text-[9px] font-serif tracking-widest text-[#d4af37] pointer-events-none">
          <span>REEL CREATE POSTER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
          <span>ARCHIVE</span>
        </div>
      </div>
    );
  }
);

PosterPreview.displayName = 'PosterPreview';
