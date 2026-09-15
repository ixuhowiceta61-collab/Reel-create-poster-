import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { RomanticQuote } from '../types';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { BookOpen, Search, Heart, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface QuoteLibraryProps {
  onUseQuoteInGenerator: (quote: RomanticQuote) => void;
}

export const QuoteLibrary: React.FC<QuoteLibraryProps> = ({
  onUseQuoteInGenerator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, setFavUpdateTick] = useState(0);

  const categories = [
    'সব',
    'প্রেম',
    'রোমান্টিক',
    'বিরহ',
    'মিস করা',
    'বৃষ্টি',
    'প্রেমপত্র',
    'রাতের অনুভূতি',
    'প্রপোজ',
    'জন্মদিন',
    'Anniversary',
    'একতরফা প্রেম',
    'স্মৃতি',
    'Classic Vintage',
    'Bengali Vintage',
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleFav = (id: string) => {
    toggleFavorite('quotes', id);
    setFavUpdateTick((prev) => prev + 1);
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesCat = selectedCategory === 'সব' || q.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.author && q.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ROMANTIC QUOTE ANTHOLOGY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            রোমান্টিক উক্তি সংগ্রহ
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            চিঠির যুগের ক্লাসিক কবিতা ও রোমান্টিক উক্তিমালা। পছন্দ করুন এবং এক ক্লিকে নিজের ভিন্টেজ পোস্টারে ব্যবহার করুন।
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-[#16100d] border border-[#382a20] rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                id="quote-library-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="উক্তি বা অনুভূতি খুঁজুন..."
                className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl pl-10 pr-4 py-2 text-sm text-[#fef9c3] placeholder-[#736153] focus:outline-none focus:border-[#d4af37] font-bengali"
              />
              <Search className="w-4 h-4 text-[#a39281] absolute left-3.5 top-3" />
            </div>

            <div className="text-xs text-[#8c7b6c] font-bengali">
              মোট উক্তি: <span className="text-[#fef08a] font-bold">{filteredQuotes.length}</span> টি
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`quote-lib-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bengali whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                    : 'bg-[#201814] text-[#a89078] hover:bg-[#2c201a] border border-[#34271e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((q) => {
            const fav = isFavorite('quotes', q.id);
            const isCopied = copiedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-[#18120e] rounded-2xl border border-[#3b2d24] hover:border-[#d4af37]/60 p-5 shadow-xl hover:shadow-2xl hover:shadow-black/60 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bengali font-semibold bg-[#120c09] text-[#fef08a] border border-[#382b22]">
                      {q.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        id={`copy-quote-${q.id}`}
                        onClick={() => handleCopy(q.text, q.id)}
                        className="p-1.5 rounded-lg text-[#a39281] hover:text-[#fef08a] hover:bg-[#251b15] transition-colors cursor-pointer"
                        title="উক্তিটি কপি করুন"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-[#4ade80]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        id={`fav-quote-${q.id}`}
                        onClick={() => handleToggleFav(q.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          fav
                            ? 'text-[#f87171] bg-[#2d171a]'
                            : 'text-[#a39281] hover:text-[#f87171] hover:bg-[#251b15]'
                        }`}
                        title={fav ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
                      >
                        <Heart className={`w-4 h-4 ${fav ? 'fill-[#f87171]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="font-bengali text-base text-[#f5ebd7] leading-relaxed italic group-hover:text-[#fef9c3] transition-colors">
                    “{q.text}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#291e17] flex items-center justify-between">
                  <span className="text-xs text-[#8c7b6c] font-bengali">
                    — {q.author || 'অজানা প্রেমিক'}
                  </span>

                  <button
                    type="button"
                    id={`use-quote-gen-${q.id}`}
                    onClick={() => onUseQuoteInGenerator(q)}
                    className="px-3 py-1.5 rounded-lg bg-[#802a32] hover:bg-[#9e2a3b] text-[#fef9c3] text-xs font-bengali font-semibold border border-[#d4af37]/30 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
                    <span>পোস্টারে নিন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
