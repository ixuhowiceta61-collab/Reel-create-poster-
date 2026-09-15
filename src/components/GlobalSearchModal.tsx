import React, { useState, useEffect, useMemo } from 'react';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { PostcardTemplate, RomanticQuote, GalleryItem } from '../types';
import { Search, X, Sparkles, BookOpen, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: RomanticQuote) => void;
  onSelectGallery: (item: GalleryItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPostcard,
  onSelectQuote,
  onSelectGallery,
}) => {
  const [query, setQuery] = useState('');

  // Handle ESC key and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const results = useMemo(() => {
    if (!query.trim()) return { postcards: [], quotes: [], gallery: [] };
    const q = query.toLowerCase();

    const matchingPostcards = postcards.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleBn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.defaultQuote.toLowerCase().includes(q)
    );

    const matchingQuotes = quotes.filter(
      (qt) =>
        qt.text.toLowerCase().includes(q) ||
        (qt.author && qt.author.toLowerCase().includes(q)) ||
        qt.category.toLowerCase().includes(q)
    );

    const matchingGallery = gallery.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.quote.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );

    return {
      postcards: matchingPostcards.slice(0, 4),
      quotes: matchingQuotes.slice(0, 6),
      gallery: matchingGallery.slice(0, 4),
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.postcards.length + results.quotes.length + results.gallery.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#16100d] rounded-2xl border border-[#d4af37]/40 shadow-2xl shadow-black text-[#f4ecd8] overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#3b2d24] p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            type="text"
            id="global-search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পোস্টার, উক্তি বা ক্যাটাগরি খুঁজুন (যেমন: বৃষ্টি, বিরহ, গোলাপ...)"
            className="flex-1 bg-transparent text-base text-[#fef9c3] placeholder-[#7d6c5d] focus:outline-none font-bengali"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9c8976] hover:text-[#fef08a] text-xs font-mono"
            >
              মুছুন
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9c8976] hover:text-[#fef08a] hover:bg-[#251a14]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-12 text-center space-y-3">
              <span className="text-3xl">💌</span>
              <p className="text-sm font-bengali text-[#a89078]">
                যেকোনো শব্দ দিয়ে খুঁজুন—পোস্টার টেমপ্লেট, রোমান্টিক উক্তি কিংবা ভিন্টেজ আর্টওয়ার্ক
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['বৃষ্টি', 'বিরহ', 'প্রেমপত্র', 'গোলাপ', 'চাঁদ', 'কফি'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full text-xs font-bengali bg-[#221813] text-[#cbb8a3] hover:text-[#fef08a] hover:bg-[#332219] border border-[#3b2d24]"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-sm font-bengali text-[#a89078]">
              “{query}” দিয়ে কিছু পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
            </div>
          ) : (
            <>
              {/* Postcards matches */}
              {results.postcards.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-serif text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>পোস্টার টেমপ্লেট ({results.postcards.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.postcards.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPostcard(p);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#1e1612] hover:bg-[#2c1d17] border border-[#382a20] hover:border-[#d4af37]/60 text-left transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-bengali font-bold text-sm text-[#fef9c3] group-hover:text-[#fef08a]">
                            {p.titleBn}
                          </div>
                          <div className="text-[11px] text-[#8c7b6c] font-bengali mt-0.5 line-clamp-1">
                            {p.category} • “{p.defaultQuote}”
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#a39281] group-hover:text-[#d4af37] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quotes matches */}
              {results.quotes.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-serif text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>রোমান্টিক উক্তি ({results.quotes.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.quotes.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSelectQuote(q);
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl bg-[#1e1612] hover:bg-[#2c1d17] border border-[#382a20] hover:border-[#d4af37]/60 text-left transition-all flex items-start justify-between group cursor-pointer"
                      >
                        <div className="space-y-1">
                          <p className="font-bengali text-sm text-[#f5ebd7] leading-relaxed italic group-hover:text-[#fef08a]">
                            “{q.text}”
                          </p>
                          <div className="text-[11px] text-[#8c7b6c] font-bengali">
                            {q.author} • {q.category}
                          </div>
                        </div>
                        <span className="text-xs font-bengali text-[#d4af37] bg-[#120c09] px-2.5 py-1 rounded border border-[#332219] shrink-0 ml-3">
                          ব্যবহার করুন
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery matches */}
              {results.gallery.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-serif text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>ভিন্টেজ গ্যালারি ({results.gallery.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.gallery.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          onSelectGallery(g);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#1e1612] hover:bg-[#2c1d17] border border-[#382a20] hover:border-[#d4af37]/60 text-left transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-bengali font-bold text-sm text-[#fef9c3] group-hover:text-[#fef08a]">
                            {g.title}
                          </div>
                          <div className="text-[11px] text-[#8c7b6c] font-bengali mt-0.5 line-clamp-1">
                            {g.category}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#a39281] group-hover:text-[#d4af37] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#110c09] border-t border-[#2d2119] text-center text-[11px] text-[#78695c]">
          ক্লিক করলে স্বয়ংক্রিয়ভাবে জেনারেটরে যুক্ত হবে • Esc চেপে বন্ধ করুন
        </div>
      </div>
    </div>
  );
};
