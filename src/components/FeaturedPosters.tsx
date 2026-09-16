import React, { useState } from 'react';
import { postcards } from '../data/postcards';
import { PostcardTemplate } from '../types';
import { PosterCard } from './PosterCard';
import { Flame, Sparkles, Heart, CloudRain, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedPostersProps {
  onUseTemplate: (template: PostcardTemplate) => void;
  onExploreAll: () => void;
}

type CollectionTab = 'popular' | 'new' | 'romantic' | 'rainy' | 'letter';

export const FeaturedPosters: React.FC<FeaturedPostersProps> = ({
  onUseTemplate,
  onExploreAll,
}) => {
  const [activeTab, setActiveTab] = useState<CollectionTab>('popular');
  const { language, t } = useLanguage();

  const tabs = [
    { id: 'popular' as CollectionTab, labelBn: 'জনপ্রিয় পোস্টার', labelEn: 'Popular Frames', icon: Flame },
    { id: 'new' as CollectionTab, labelBn: 'নতুন কালেকশন', labelEn: 'New Arrivals', icon: Sparkles },
    { id: 'romantic' as CollectionTab, labelBn: 'রোমান্টিক প্রেম', labelEn: 'Romantic Love', icon: Heart },
    { id: 'rainy' as CollectionTab, labelBn: 'বৃষ্টির অনুভূতি', labelEn: 'Rainy Nostalgia', icon: CloudRain },
    { id: 'letter' as CollectionTab, labelBn: 'ভিন্টেজ চিঠি', labelEn: 'Vintage Letter', icon: Mail },
  ];

  const getFilteredPostcards = (): PostcardTemplate[] => {
    switch (activeTab) {
      case 'new':
        return postcards.filter((p) => p.isNew);
      case 'romantic':
        return postcards.filter((p) => p.category === 'রোমান্টিক' || p.category === 'প্রেম');
      case 'rainy':
        return postcards.filter((p) => p.category === 'বৃষ্টি');
      case 'letter':
        return postcards.filter((p) => p.category === 'প্রেমপত্র');
      case 'popular':
      default:
        return postcards.filter((p) => p.isPopular);
    }
  };

  const filtered = getFilteredPostcards();

  return (
    <section className="py-14 bg-[#0e0a08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-[#d4af37] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDCRAFTED VINTAGE POSTERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#fef9c3]">
              {language === 'bn' ? 'মনকাড়া পোস্টার কালেকশন' : 'Featured Postcard Collections'}
            </h2>
            <p className="text-xs sm:text-sm text-[#a89078] mt-1">
              {language === 'bn'
                ? 'যেকোনো ডিজাইন পছন্দ করে তাৎক্ষণিক এডিট ও ডাউনলোড করুন'
                : 'Select any vintage frame to customize and export in Ultra-HD'}
            </p>
          </div>

          <button
            id="featured-explore-all-btn"
            onClick={onExploreAll}
            className="text-xs sm:text-sm text-[#d4af37] hover:text-[#fef08a] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>
              {language === 'bn'
                ? `সকল পোস্টার লাইব্রেরি (${postcards.length})`
                : `All Postcards Library (${postcards.length})`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            const label = language === 'bn' ? tab.labelBn : tab.labelEn;
            return (
              <button
                key={tab.id}
                id={`featured-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37] shadow-lg shadow-[#802a32]/25'
                    : 'bg-[#18120e] text-[#b5a392] hover:bg-[#251b15] hover:text-[#fef08a] border border-[#34271e]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#fef08a]' : 'text-[#d4af37]'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Poster Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <PosterCard
              key={template.id}
              template={template}
              onUseTemplate={onUseTemplate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
