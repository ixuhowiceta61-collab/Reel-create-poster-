import React from 'react';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { PostcardTemplate } from '../types';
import { PosterCard } from '../components/PosterCard';
import { Layers, ArrowRight } from 'lucide-react';

interface CategoriesPageProps {
  onUseTemplate: (template: PostcardTemplate) => void;
  selectedCategory: string | null;
  onSelectCategory: (catBn: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onUseTemplate,
  selectedCategory,
  onSelectCategory,
}) => {
  const currentCategory = selectedCategory || categories[0].nameBn;

  const currentCategoryObj = categories.find((c) => c.nameBn === currentCategory) || categories[0];

  const templatesInCat = postcards.filter((p) => p.category === currentCategory);

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>CATEGORIES & MOODS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            ক্যাটাগরি সংগ্রহশালা
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            প্রেমের প্রতিটি রূপের আলাদা রূপকথা। ক্যাটাগরি বেছে নিন এবং সেই অনুযায়ী ভিন্টেজ পোস্টার খুঁজুন।
          </p>
        </div>

        {/* All Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {categories.map((cat) => {
            const count = postcards.filter((p) => p.category === cat.nameBn).length;
            const isSelected = currentCategory === cat.nameBn;

            return (
              <button
                key={cat.id}
                id={`cat-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.nameBn)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37] shadow-lg shadow-[#802a32]/30 ring-1 ring-[#d4af37]'
                    : 'bg-[#18120e] text-[#e0d3bf] border-[#382b22] hover:border-[#802a32] hover:bg-[#221713]'
                }`}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bengali font-bold text-sm text-[#fef9c3]">
                    {cat.nameBn}
                  </div>
                  <div className="text-[10px] text-[#9c8976] font-mono mt-0.5">
                    {cat.nameEn}
                  </div>
                  <div className="text-[11px] text-[#d4af37] font-bengali font-medium mt-1">
                    {count} টি পোস্টার
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Category Spotlight Header */}
        <div className="bg-[#18120e] border border-[#3b2d24] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentCategoryObj.icon}</span>
              <h2 className="text-2xl font-bold font-bengali text-[#fef9c3]">
                {currentCategoryObj.nameBn} কালেকশন
              </h2>
            </div>
            <p className="text-sm text-[#c5b5a2] font-bengali">
              {currentCategoryObj.description}
            </p>
          </div>

          <div className="text-xs text-[#d4af37] font-bengali bg-[#120c09] px-3.5 py-1.5 rounded-lg border border-[#34261e]">
            এই ক্যাটাগরিতে {templatesInCat.length} টি পোস্টকার্ড পাওয়া গেছে
          </div>
        </div>

        {/* Postcards in selected category */}
        {templatesInCat.length === 0 ? (
          <div className="py-12 text-center bg-[#140e0b] rounded-2xl border border-[#2d2018] space-y-2">
            <p className="text-sm font-bengali text-[#a89078]">
              এই ক্যাটাগরিতে আরও পোস্টকার্ড দ্রুত যুক্ত করা হবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templatesInCat.map((tpl) => (
              <PosterCard
                key={tpl.id}
                template={tpl}
                onUseTemplate={onUseTemplate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
