import React, { useState } from 'react';
import { postcards } from '../data/postcards';
import { categories } from '../data/categories';
import { PostcardTemplate } from '../types';
import { PosterCard } from '../components/PosterCard';
import { Search, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PostcardsLibraryProps {
  onUseTemplate: (template: PostcardTemplate) => void;
}

export const PostcardsLibrary: React.FC<PostcardsLibraryProps> = ({
  onUseTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = postcards.filter((p) => {
    const matchesCat =
      selectedCategory === 'সব' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.defaultQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>VINTAGE TEMPLATE ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            ভিন্টেজ পোস্টকার্ড সংগ্রহ
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            প্রেম, স্মৃতি, বৃষ্টি ও বিরহের আবেগমাখা প্রি-ডিজাইনড পোস্টকার্ড টেমপ্লেটসমূহ। পছন্দ করুন এবং তাৎক্ষণিক নিজের মনের মতো বানিয়ে নিন।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#16100d] border border-[#382a20] rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                id="postcards-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পোস্টার বা থিম খুঁজুন (যেমন: চিঠি, বৃষ্টি, গোলাপ...)"
                className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl pl-10 pr-4 py-2 text-sm text-[#fef9c3] placeholder-[#736153] focus:outline-none focus:border-[#d4af37] font-bengali"
              />
              <Search className="w-4 h-4 text-[#a39281] absolute left-3.5 top-3" />
            </div>

            {/* Results count */}
            <div className="text-xs text-[#8c7b6c] font-bengali">
              মোট পোস্টকার্ড: <span className="text-[#fef08a] font-bold">{filtered.length}</span> টি
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              id="library-cat-all"
              onClick={() => setSelectedCategory('সব')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bengali whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'সব'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                  : 'bg-[#201814] text-[#a89078] hover:bg-[#2c201a] border border-[#34271e]'
              }`}
            >
              সবগুলো
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`library-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.nameBn)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bengali whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.nameBn
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                    : 'bg-[#201814] text-[#a89078] hover:bg-[#2c201a] border border-[#34271e]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#140e0b] rounded-2xl border border-[#2d2018]">
            <span className="text-3xl">🍂</span>
            <h3 className="font-bengali text-lg text-[#fef9c3]">কোনো পোস্টকার্ড পাওয়া যায়নি</h3>
            <p className="font-bengali text-xs text-[#8c7b6c]">
              অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে খুঁজুন বা ফিল্টার রিসেট করুন।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('সব');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#802a32] text-[#fef08a] rounded-lg text-xs font-bengali font-semibold"
            >
              সব পোস্টার দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <PosterCard
                key={template.id}
                template={template}
                onUseTemplate={onUseTemplate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
