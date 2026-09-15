import React, { useState, useEffect } from 'react';
import { PostcardTemplate } from '../types';
import { getVintageArtworkSvg } from '../utils/artworks';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface PosterCardProps {
  template: PostcardTemplate;
  onUseTemplate: (template: PostcardTemplate) => void;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  template,
  onUseTemplate,
}) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite('postcards', template.id));
  }, [template.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFavorite('postcards', template.id);
    setFav(newState);
  };

  const artworkSvg = getVintageArtworkSvg(template.artworkType, template.themeColor);

  return (
    <div className="group relative bg-[#18120e] rounded-2xl border border-[#3b2d24] hover:border-[#d4af37]/60 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between">
      {/* Artwork Container with 4:3 Vintage Aspect */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#120c09]">
        <div
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
          dangerouslySetInnerHTML={{ __html: artworkSvg }}
        />

        {/* Vintage vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18120e] via-transparent to-black/30 pointer-events-none" />

        {/* Category Pill badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bengali font-semibold bg-[#130f0d]/85 text-[#fef08a] border border-[#d4af37]/40 shadow-md backdrop-blur-sm">
            {template.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          id={`fav-btn-${template.id}`}
          type="button"
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md ${
            fav
              ? 'bg-[#802a32] text-[#f87171] border border-[#f87171]'
              : 'bg-[#18120e]/80 text-[#d1c2af] hover:text-[#f87171] border border-[#443329] hover:border-[#802a32]'
          }`}
          title={fav ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-[#f87171]' : ''}`} />
        </button>

        {/* Decorative postal stamp mark on bottom right */}
        <div className="absolute bottom-2 right-2 opacity-50 pointer-events-none text-right">
          <span className="text-[10px] font-mono text-[#d4af37]">ARCHIVE #{template.id.toUpperCase()}</span>
        </div>
      </div>

      {/* Card Body with Title, Quote Preview, and Use Button */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[#fef9c3] font-bold text-base sm:text-lg group-hover:text-[#fef08a] transition-colors line-clamp-1">
              {template.titleBn} ({template.title})
            </h3>
          </div>

          <p className="font-bengali text-xs sm:text-sm text-[#c5b5a2] leading-relaxed line-clamp-2 italic">
            “{template.defaultQuote}”
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#2a1e17] flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#8c7b6c] font-bengali">
            {template.defaultDate || 'ভিন্টেজ স্মৃতি'}
          </span>

          <button
            type="button"
            id={`use-template-btn-${template.id}`}
            onClick={() => onUseTemplate(template)}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#802a32] to-[#591b22] hover:from-[#9c2d3a] hover:to-[#6d2028] text-[#fef9c3] text-xs sm:text-sm font-bengali font-semibold border border-[#d4af37]/40 hover:border-[#d4af37] shadow-md shadow-[#802a32]/25 hover:shadow-[#d4af37]/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
            <span>ব্যবহার করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
