import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GLOBAL_LANGUAGES, LanguageOption } from '../data/languages';
import { Globe, Search, Check, ChevronDown, Sparkles, X } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'rtl'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search on open
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-sm text-xs font-medium ${
          isOpen
            ? 'bg-[#2a1d17] border-[#d4af37] text-[#fef08a]'
            : 'bg-[#18110e] border-[#3e2e25] text-[#ecd8c2] hover:bg-[#231713] hover:border-[#6b5240]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Change language / ভাষা পরিবর্তন করুন"
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

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#9e8c7c] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#d4af37]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-80 sm:w-88 rounded-xl bg-[#140d0a] border border-[#3e2e25] shadow-2xl z-50 overflow-hidden backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${
            isRtl ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
          }`}
          role="listbox"
          aria-label="Select website language"
        >
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-[#20140f] to-[#170e0a] border-b border-[#2d2019] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <span className="font-serif text-sm font-semibold text-[#fef08a] tracking-wide">
                {t('lang.select_title')}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9e8c7c] hover:text-[#fef08a] p-1 rounded-md hover:bg-[#2c201a] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="p-2.5 border-b border-[#251a14] bg-[#18100c]">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#8f7b6b] absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('lang.search_placeholder')}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#0e0a08] border border-[#382820] rounded-lg text-[#f4ecd8] placeholder-[#7a6858] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-[#8f7b6b] hover:text-[#f4ecd8] text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40'
                    : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                }`}
              >
                {t('lang.all_tab')} ({GLOBAL_LANGUAGES.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('popular')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeTab === 'popular'
                    ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40'
                    : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                }`}
              >
                {t('lang.popular_tab')}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rtl')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
                  activeTab === 'rtl'
                    ? 'bg-[#802a32] text-[#fef08a] font-semibold border border-[#d4af37]/40'
                    : 'text-[#8f7b6b] hover:text-[#ecd8c2] hover:bg-[#251a14]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                {t('lang.rtl_tab')}
              </button>
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar divide-y divide-[#221812] p-1">
            {filteredLanguages.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8f7b6b]">
                No languages found matching “{searchQuery}”
              </div>
            ) : (
              filteredLanguages.map((item) => {
                const isSelected =
                  language.toLowerCase() === item.code.toLowerCase() ||
                  language.toLowerCase().split('-')[0] === item.code.toLowerCase();

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2e1d16] text-[#fef08a] font-semibold'
                        : 'text-[#cfbeab] hover:bg-[#201510] hover:text-[#fff6e6]'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base select-none shrink-0">{item.flag}</span>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-[13px]">{item.nativeName}</span>
                          {item.isRtl && (
                            <span className="px-1 py-0.2 text-[8px] rounded bg-[#3e241c] text-[#fef08a] border border-[#6d3e2d] uppercase">
                              RTL
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8a7767] truncate">
                          {item.name} • {item.code.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center pl-2">
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#d4af37]" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note: Auto translation info */}
          <div className="px-3 py-2 bg-[#0d0907] border-t border-[#251a14] flex items-center justify-between text-[11px] text-[#8a7767]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Auto-detects browser locale & RTL layout</span>
            </div>
            <span className="font-mono text-[#ecd8c2]">{currentLanguage.code.toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
