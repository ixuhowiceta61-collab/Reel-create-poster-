import React from 'react';
import { PenTool, Calendar, User, HeartHandshake } from 'lucide-react';

interface CustomTextEditorProps {
  recipient: string;
  setRecipient: (val: string) => void;
  mainQuote: string;
  setMainQuote: (val: string) => void;
  sender: string;
  setSender: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
}

export const CustomTextEditor: React.FC<CustomTextEditorProps> = ({
  recipient,
  setRecipient,
  mainQuote,
  setMainQuote,
  sender,
  setSender,
  date,
  setDate,
}) => {
  return (
    <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 space-y-4 text-[#f4ecd8]">
      <div className="border-b border-[#2d221b] pb-3">
        <h4 className="font-serif text-[#fef08a] font-semibold text-sm flex items-center gap-2">
          <PenTool className="w-4 h-4 text-[#d4af37]" />
          <span>✍️ অথবা নিজের লেখা লিখুন (Custom Words)</span>
        </h4>
        <p className="text-xs text-[#a39281] mt-0.5 font-bengali">
          প্রস্তুত করা উক্তি ব্যবহার করতে পারেন অথবা নিজের মনের না বলা কথা লিখতে পারেন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Recipient (প্রাপক) */}
        <div>
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>প্রাপক (Recipient)</span>
          </label>
          <input
            type="text"
            id="recipient-input"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="যেমন: প্রিয়তমা, অঞ্জনা, প্রিয়..."
            className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-lg px-3.5 py-2 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37] transition-all font-bengali"
          />
        </div>

        {/* Date (তারিখ - Optional) */}
        <div>
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>তারিখ (Date - ঐচ্ছিক)</span>
          </label>
          <input
            type="text"
            id="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="যেমন: শ্রাবণ, ১৩৩২ বা শীতের এক বিকেল"
            className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-lg px-3.5 py-2 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37] transition-all font-bengali"
          />
        </div>
      </div>

      {/* Main Quote / Text (মূল লেখা) */}
      <div>
        <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1">
          মূল লেখা (Main Words / Quote)
        </label>
        <textarea
          id="main-quote-textarea"
          rows={4}
          value={mainQuote}
          onChange={(e) => setMainQuote(e.target.value)}
          placeholder="এখানে আপনার নিজের লেখা লিখুন..."
          className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-lg p-3.5 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37] transition-all font-bengali leading-relaxed resize-y"
        />
        <div className="flex justify-between items-center text-[11px] text-[#857364] mt-1">
          <span>পছন্দের উক্তি লিখুন বা এডিট করুন</span>
          <span>{mainQuote.length} অক্ষর</span>
        </div>
      </div>

      {/* Sender (প্রেরক) */}
      <div>
        <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>প্রেরক (Sender)</span>
        </label>
        <input
          type="text"
          id="sender-input"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="যেমন: ইতি, তোমার মেঘবালক..."
          className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-lg px-3.5 py-2 text-sm text-[#fef9c3] placeholder-[#6d5b4e] focus:outline-none focus:border-[#d4af37] transition-all font-bengali"
        />
      </div>
    </div>
  );
};
