import React, { useState } from 'react';
import { APP_INFO } from '../data/config';
import { Shield, FileText, Mail, Send, CheckCircle2 } from 'lucide-react';

interface StaticPagesProps {
  page: 'privacy' | 'terms' | 'contact';
}

export const StaticPages: React.FC<StaticPagesProps> = ({ page }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  if (page === 'privacy') {
    return (
      <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2e2119] pb-4">
              <Shield className="w-8 h-8 text-[#d4af37]" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-bengali text-[#fef9c3]">
                  গোপনীয়তা নীতিমালা (Privacy Policy)
                </h1>
                <p className="text-xs text-[#8c7b6c] font-mono mt-1">
                  সর্বশেষ আপডেট: {APP_INFO.currentYear} • Reel Create Poster
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#cbb8a3] font-bengali">
              <h2 className="text-lg font-bold text-[#fef08a]">১. তথ্য সুরক্ষা ও কোনো ছবি সংরক্ষণ না করা</h2>
              <p>
                <strong>Reel Create Poster</strong> ব্যবহারকারীদের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিয়ে বিবেচনা করে। আমাদের প্ল্যাটফর্মে ব্যবহারকারীর কোনো ব্যক্তিগত ছবি আপলোড নেওয়া হয় না এবং সার্ভারে কোনো ছবি জমা রাখা হয় না। সমস্ত পোস্টকার্ড প্রি-ডিজাইনড আর্টওয়ার্ক এবং আপনার তৈরি টেক্সট সরাসরি আপনার নিজস্ব ব্রাউজারে প্রক্রিয়াজাত হয়।
              </p>

              <h2 className="text-lg font-bold text-[#fef08a]">২. স্থানীয় সংরক্ষণ ব্যবস্থা (Local Storage)</h2>
              <p>
                ব্যবহারকারীর পছন্দের পোস্টকার্ড, উক্তি বা গ্যালারি আইটেমগুলো সংরক্ষণ করার জন্য শুধুমাত্র আপনার ডিভাইসের <code>localStorage</code> ব্যবহার করা হয়। কোনো ব্যক্তিগত প্রোফাইল বা পাসওয়ার্ড প্রয়োজন হয় না।
              </p>

              <h2 className="text-lg font-bold text-[#fef08a]">৩. স্পন্সর ও বহিরাগত সংযোগ (Sponsor Policy)</h2>
              <p>
                বিনামূল্যে হাই-রেজোলিউশন ডাউনলোড সুবিধা বজায় রাখার স্বার্থে ডাউনলোডের পূর্বে একটি স্পন্সর পেজ উন্মুক্ত হতে পারে। ব্যবহারকারী স্বপ্রণোদিত হয়ে স্পন্সর পরিদর্শন করতে পারেন।
              </p>

              <h2 className="text-lg font-bold text-[#fef08a]">৪. যোগাযোগ</h2>
              <p>
                গোপনীয়তা নীতিমালা সম্পর্কিত যেকোনো তথ্যের জন্য আমাদের ইমেইলে যোগাযোগ করুন: <span className="text-[#fef08a] font-mono">{APP_INFO.contactEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'terms') {
    return (
      <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2e2119] pb-4">
              <FileText className="w-8 h-8 text-[#d4af37]" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-bengali text-[#fef9c3]">
                  ব্যবহারের শর্তাবলী (Terms & Conditions)
                </h1>
                <p className="text-xs text-[#8c7b6c] font-mono mt-1">
                  সর্বশেষ আপডেট: {APP_INFO.currentYear} • Reel Create Poster
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#cbb8a3] font-bengali">
              <h2 className="text-lg font-bold text-[#fef08a]">১. সাধারণ অনুমতি ও শর্ত</h2>
              <p>
                Reel Create Poster ব্যবহার করে আপনি ব্যক্তিগত ও অবাণিজ্যিক উদ্দেশ্যে সুন্দর ভিন্টেজ পোস্টকার্ড, উক্তি ও রোমান্টিক কার্ড তৈরি ও সংরক্ষণ করতে পারেন।
              </p>

              <h2 className="text-lg font-bold text-[#fef08a]">২. আর্টওয়ার্ক ও উক্তির স্বত্ব</h2>
              <p>
                প্ল্যাটফর্মের সকল প্রি-ডিজাইনড ভিন্টেজ আর্টওয়ার্ক, ফ্রেম ও সংগৃহীত বাংলা উক্তি শৈল্পিক প্রকাশের উদ্দেশ্যে সন্নিবেশিত। ডাউনলোডকৃত পোস্টার সামাজিক যোগাযোগ মাধ্যমে ব্যক্তিগতভাবে শেয়ার করা যাবে।
              </p>

              <h2 className="text-lg font-bold text-[#fef08a]">৩. ডাউনলোড প্রক্রিয়া</h2>
              <p>
                প্রতিটি পোস্টার বা গ্যালারি আর্টওয়ার্ক ডাউনলোডের পূর্বে একটি স্পন্সর কাউন্টডাউন স্ক্রিন প্রদর্শিত হতে পারে। কাউন্টডাউন সমাপ্তির পর স্বয়ংক্রিয়ভাবে ডাউনলোড বাটন সক্রিয় হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact Page
  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2 border-b border-[#2e2119] pb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#802a32]/40 border border-[#d4af37]/40 text-2xl shadow-inner mb-2">
              💌
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-bengali text-[#fef9c3]">
              যোগাযোগ করুন (Contact Us)
            </h1>
            <p className="text-sm text-[#a39281] font-bengali">
              স্পন্সরশিপ, বিজ্ঞাপনের সুযোগ কিংবা যেকোনো পরামর্শের জন্য আমাদের সাথে বার্তা বিনিময় করুন।
            </p>
          </div>

          {contactSubmitted ? (
            <div className="py-12 text-center space-y-4 bg-[#140e0b] rounded-xl border border-[#2d2018] p-6">
              <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
              <h3 className="font-bengali text-xl font-bold text-[#fef9c3]">
                আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!
              </h3>
              <p className="font-bengali text-sm text-[#a39281] max-w-sm mx-auto">
                আমাদের দল শীঘ্রই আপনার সাথে ইমেইলে যোগাযোগ করবে। Reel Create Poster-এর সাথে থাকার জন্য ধন্যবাদ।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4 font-bengali">
              <div>
                <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1">
                  আপনার নাম (Your Name)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: অনিক রহমান"
                  className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl px-4 py-2.5 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1">
                  ইমেইল অ্যাড্রেস (Email Address)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl px-4 py-2.5 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1">
                  আপনার বার্তা (Message / Proposal)
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="আপনার বক্তব্য বা স্পন্সর সম্পর্কিত প্রস্তাব এখানে লিখুন..."
                  className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl p-4 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#802a32] to-[#591b22] text-[#fef9c3] font-bold text-sm border border-[#d4af37]/40 shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#fef08a]" />
                <span>বার্তা পাঠান</span>
              </button>

              <div className="pt-4 text-center text-xs text-[#8c7b6c]">
                সরাসরি ইমেইল করতে পারেন: <span className="text-[#fef08a] font-mono">{APP_INFO.contactEmail}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
