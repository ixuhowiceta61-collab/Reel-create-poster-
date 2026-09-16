import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GLOBAL_LANGUAGES, LanguageOption } from '../data/languages';
import { Globe, Search, Check, ChevronDown, Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  compact = false,
}) => {
  const { language, currentLanguage, setLanguage, isRtl, isAutoTranslating, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'rtl'>('all');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filter languages based on search query and active tab
  const filteredLanguages = useMemo(() => {
    let list = GLOBAL_LANGUAGES;

    if (activeTab === 'popular') {
      list = list.filter((l) => l.popular);
    } else if (activeTab === 'rtl') {
      list = list.filter((l) => l.isRtl);
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        (l.region && l.region.toLowerCase().includes(q))
    );
  }, [searchQuery, activeTab]);

  const handleSelect = (lang: LanguageOption) => {
    setLanguage(lang.code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`inline-block text-left ${className}`}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        id="language-selector-btn"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-sm text-xs font-medium ${
          isOpen
            ? 'bg-[#2a1d17] border-[#d4af37] text-[#fef08a]'
            : 'bg-[#18110e] border-[#3e2e25] text-[#ecd8c2] hover:bg-[#231713] hover:border-[#6b5240]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Change language / ভাষা পরিবর্তন করুন (Open Full Show)"
      >
        <span className="text-sm select-none">{currentLanguage.flag}</span>
        
        {!compact && (
          <span className="font-serif tracking-wide truncate max-w-[90px] sm:max-w-[120px]">
            {currentLanguage.nativeName}
          </span>
        )}

        {currentLanguage.isRtl && (
          <span className="px-1 py-0.2 text-[9px] font-bold rounded bg-[#802a32] text-[#fef08a] border border-[#d4af37]/40 uppercase tracking-tighter">
            RTL
          </span>
        )}

        {isAutoTranslating && (
          <Sparkles className="w-3 h-3 text-[#d4af37] animate-spin" />
        )}

        <ChevronDown className="w-3.5 h-3.5 text-[#9e8c7c]" />
      </button>

      {/* Full Show Modal Dialog with Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-5 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Select website language"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Full Show Modal Card */}
          <div
            ref={modalRef}
            id="language-selector-popover"
            className={`language-selector-popover relative w-full ${
              isFullScreen
                ? 'h-full max-h-screen rounded-none'
                : 'max-w-2xl max-h-[88vh] rounded-2xl'
            } bg-[#140d0a] border border-[#3e2e25] shadow-2xl z-10 backdrop-blur-md flex flex-col overflow-hidden text-left transition-all duration-200`}
          >
            {/* Header */}
            <div className="p-3.5 shrink-0 bg-gradient-to-r from-[#22140e] via-[#1a100b] to-[#140d0a] border-b border-[#2d2019] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#2b1b14] border border-[#4a3427] text-[#d4af37]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#fef08a] tracking-wide">
                      {t('lang.select_title')}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2a1b14] border border-[#4a3427] text-[#c9b7a4]">
                      {GLOBAL_LANGUAGES.length}+ Languages
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8f7b6b] hidden sm:block">
                    Select your preferred language or let it auto-detect your location
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="text-[#9e8c7c] hover:text-[#fef08a] p-1.5 rounded-lg hover:bg-[#2c201a] border border-transparent hover:border-[#4a3427] transition-colors cursor-pointer"
                  title={isFullScreen ? 'Exit Fullscreen' : 'Full Screen View'}
                  aria-label="Toggle Full Screen"
                >
                  {isFullScreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[#9e8c7c] hover:text-[#fef08a] p-1.5 rounded-lg hover:bg-[#2c201a] border border-transparent hover:border-[#4a3427] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Input Bar & Quick Filters */}
            <div className="p-3 shrink-0 border-b border-[#251a14] bg-[#18100c] space-y-2.5">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#8f7b6b] absolute left-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('lang.search_placeholder')}
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#0e0a08] border border-[#382820] rounded-lg text-[#f4ecd8] placeholder-[#7a6858] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-[#8f7b6b] hover:text-[#f4ecd8] text-xs"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-0.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40 shadow-sm'
                      : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                  }`}
                >
                  {t('lang.all_tab')} ({GLOBAL_LANGUAGES.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('popular')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'popular'
                      ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40 shadow-sm'
                      : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                  }`}
                >
                  {t('lang.popular_tab')}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('rtl')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'rtl'
                      ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40 shadow-sm'
                      : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  {t('lang.rtl_tab')}
                </button>
              </div>
            </div>

            {/* Languages Grid / List - Full Show */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 sm:p-3">
              {filteredLanguages.length === 0 ? (
                <div className="py-12 text-center text-xs sm:text-sm text-[#8f7b6b]">
                  No languages found matching “{searchQuery}”
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredLanguages.map((item) => {
                    const isSelected =
                      language.toLowerCase() === item.code.toLowerCase() ||
                      language.toLowerCase().split('-')[0] === item.code.toLowerCase();

                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#2b1a13] border-[#d4af37] text-[#fef08a] shadow-md shadow-[#d4af37]/10 ring-1 ring-[#d4af37]/40'
                            : 'bg-[#18110e] border-[#291e17] text-[#cfbeab] hover:bg-[#221611] hover:border-[#4a3427] hover:text-[#fff6e6]'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl sm:text-2xl select-none shrink-0">
                            {item.flag}
                          </span>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm sm:text-base text-[#fef08a]">
                                {item.nativeName}
                              </span>
                              {item.isRtl && (
                                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#3e241c] text-[#fef08a] border border-[#6d3e2d] uppercase">
                                  RTL
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#8a7767] truncate">
                              {item.name} • <span className="font-mono text-[10px]">{item.code.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center pl-2">
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-[#d4af37] text-[#140d0a] flex items-center justify-center font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <span className="text-[11px] text-[#5e4d41] font-mono">
                              {item.code.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer note: Auto translation info */}
            <div className="px-4 py-2.5 shrink-0 bg-[#0d0907] border-t border-[#251a14] flex flex-wrap items-center justify-between gap-2 text-xs text-[#8a7767]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>
                  Current: <strong className="text-[#fef08a]">{currentLanguage.nativeName}</strong> ({currentLanguage.name})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-md bg-[#251913] hover:bg-[#34241c] text-[#ecd8c2] hover:text-[#fff] text-xs font-medium border border-[#3e2e25] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
