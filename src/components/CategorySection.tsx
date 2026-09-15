import React from 'react';
import { categories } from '../data/categories';
import { Layers, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: string | null;
  onSelectCategory: (catNameBn: string) => void;
  onViewAllCategories?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <section className="py-12 border-b border-[#291e17] bg-[#110d0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-[#d4af37] uppercase mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>COLLECTIONS & THEMES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#fef9c3]">
              ক্যাটাগরি বেছে নিন
            </h2>
            <p className="text-xs sm:text-sm text-[#a39281] font-bengali mt-1">
              আপনার হৃদয়ের অনুভূতির সাথে মেলানো পোস্টার থিম খুঁজে নিন
            </p>
          </div>

          {onViewAllCategories && (
            <button
              id="view-all-categories-btn"
              onClick={onViewAllCategories}
              className="text-xs sm:text-sm text-[#d4af37] hover:text-[#fef08a] flex items-center gap-1.5 font-bengali transition-colors cursor-pointer"
            >
              <span>সবগুলো ক্যাটাগরি দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.nameBn;
            return (
              <button
                key={cat.id}
                id={`cat-chip-${cat.id}`}
                onClick={() => onSelectCategory(cat.nameBn)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 cursor-pointer group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37] shadow-lg shadow-[#802a32]/30'
                    : 'bg-[#18120e] text-[#e0d3bf] border-[#34271e] hover:border-[#802a32] hover:bg-[#201713]'
                }`}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bengali font-semibold text-sm leading-tight group-hover:text-[#fef08a]">
                    {cat.nameBn}
                  </div>
                  <div className="text-[10px] text-[#8c7b6c] font-mono mt-0.5 truncate">
                    {cat.nameEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
