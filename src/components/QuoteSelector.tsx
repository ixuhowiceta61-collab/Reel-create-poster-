import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { RomanticQuote } from '../types';
import { Sparkles, Dices, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuoteSelectorProps {
  currentQuote: string;
  onSelectQuote: (quote: RomanticQuote) => void;
  onSurpriseMe: () => void;
}

export const QuoteSelector: React.FC<QuoteSelectorProps> = ({
  currentQuote,
  onSelectQuote,
  onSurpriseMe,
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelBn: 'সব', labelEn: 'All' },
    { id: 'প্রেম', labelBn: 'প্রেম', labelEn: 'Love' },
    { id: 'রোমান্টিক', labelBn: 'রোমান্টিক', labelEn: 'Romance' },
    { id: 'বিরহ', labelBn: 'বিরহ', labelEn: 'Yearning' },
    { id: 'মিস করা', labelBn: 'মিস করা', labelEn: 'Missing' },
    { id: 'বৃষ্টি', labelBn: 'বৃষ্টি', labelEn: 'Rain' },
    { id: 'প্রেমপত্র', labelBn: 'প্রেমপত্র', labelEn: 'Letter' },
    { id: 'Classic Vintage', labelBn: 'Classic Vintage', labelEn: 'Vintage' },
  ];

  const filteredQuotes = quotes.filter((q) => {
    const matchesCat =
      selectedCategory === 'all' ||
      q.category === selectedCategory ||
      (selectedCategory === 'Classic Vintage' && q.category === 'Classic Vintage');

    const quoteText = language === 'bn' ? q.text : q.textEn || q.text;
    const authorText = (language === 'bn' ? q.author : q.authorEn || q.author) || '';

    const matchesSearch =
      searchQuery.trim() === '' ||
      quoteText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      authorText.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 text-[#f4ecd8] space-y-4">
      {/* Header & Surprise Me Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d221b] pb-3">
        <div>
          <h4 className="font-serif text-[#fef08a] font-semibold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>
              {language === 'bn'
                ? '২. উক্তি নির্বাচন করুন (Ready-Made Quotes)'
                : '2. Select Romantic Quote (Ready-Made)'}
            </span>
          </h4>
          <p className="text-xs text-[#a39281] mt-0.5">
            {language === 'bn'
              ? 'হৃদয়স্পর্শী প্রেমের উক্তি বেছে নিন অথবা নিজের লেখা লিখুন'
              : 'Choose an expressive romantic quote or write your custom message'}
          </p>
        </div>

        {/* Surprise Me CTA Button */}
        <button
          type="button"
          id="surprise-me-btn"
          onClick={onSurpriseMe}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f7d77b] to-[#ca8a04] text-[#1c120c] font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Dices className="w-4 h-4 text-[#1c120c]" />
          <span>{language === 'bn' ? '🎲 চমকপ্রদ উক্তি (Surprise)' : '🎲 Surprise Quote'}</span>
        </button>
      </div>

      {/* Category Pills & Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={`quote-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                  : 'bg-[#201814] text-[#a89078] hover:bg-[#2e211a] hover:text-[#fef08a] border border-transparent'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Small Search */}
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            id="quote-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'উক্তি খুঁজুন...' : 'Search quotes...'}
            className="w-full bg-[#120c09] border border-[#382b22] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37]"
          />
          <Search className="w-3.5 h-3.5 text-[#a39281] absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Quotes Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
        {filteredQuotes.map((q) => {
          const displayText = language === 'bn' ? q.text : q.textEn || q.text;
          const displayAuthor =
            (language === 'bn' ? q.author : q.authorEn || q.author) ||
            (language === 'bn' ? 'অজানা লেখক' : 'Classic');
          const isSelected =
            currentQuote.trim() === q.text.trim() ||
            (q.textEn && currentQuote.trim() === q.textEn.trim());

          return (
            <div
              key={q.id}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-[#2d1b1f] border-[#d4af37] shadow-md shadow-[#802a32]/25'
                  : 'bg-[#1a1310] border-[#34271e] hover:border-[#802a32]/60 hover:bg-[#201713]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-[#c5a059]">
                  <span className="bg-[#120c09] px-2 py-0.5 rounded border border-[#2e2119]">
                    {language === 'bn' ? q.category : q.categoryEn || q.category}
                  </span>
                  {q.mood && (
                    <span className="opacity-75 italic">
                      {language === 'bn' ? q.mood : q.moodEn || q.mood}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#f5ebd7] leading-relaxed italic">
                  “{displayText}”
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2d221b]">
                <span className="text-[11px] text-[#8c7b6c]">
                  {displayAuthor}
                </span>
                <button
                  type="button"
                  id={`use-quote-btn-${q.id}`}
                  onClick={() => onSelectQuote(q)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af37] text-[#1c120c]'
                      : 'bg-[#802a32] text-[#fef9c3] hover:bg-[#992d3b] hover:border-[#d4af37] border border-[#d4af37]/30'
                  }`}
                >
                  {isSelected
                    ? language === 'bn'
                      ? '✓ ব্যবহৃত হচ্ছে'
                      : '✓ In Use'
                    : language === 'bn'
                    ? 'ব্যবহার করুন'
                    : 'Use Quote'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
