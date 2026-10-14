import React from 'react';
import { 
  Users, HeartHandshake, Shield, Sparkles, MapPin, 
  ArrowRight, Droplet, CheckCircle2, Award, CalendarClock
} from 'lucide-react';

export function Hero({ onOpenMemberModal, onOpenAddUpdateModal }) {
  const stats = [
    { label: "নিবন্ধিত সক্রিয় সদস্য", count: "১০০+", sub: "৮টি বিভাগীয় টিম ও উপদেষ্টা", href: "#members" },
    { label: "সুবিধাভোগী পরিবার", count: "১২,৫০০+", sub: "সরাসরি মাঠপর্যায়ে সহায়তা", href: "#activities" },
    { label: "সম্পন্ন মানবিক প্রকল্প", count: "৬৪+", sub: "২০১৯ থেকে নিরবচ্ছিন্ন সেবা", href: "#timeline" },
    { label: "জরুরি রক্ত সহায়তা", count: "৫৫৭+ ব্যাগ", sub: "২৪ ঘণ্টা ফ্রি হেল্পলাইন", href: "#blood-drive" }
  ];

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#E8DFD1]">
      {/* Subtle organic warm pattern background */}
      <div className="absolute inset-0 bg-[#FAF7F2] -z-10" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#1E3A8A 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Official Trust Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2D9CC] text-[#1E3A8A] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>প্রতিষ্ঠা ২০১৯ • গভঃ রেজিঃ YBS-DH-২০১৯/৮৪</span>
            <span className="text-[#CBD5E1]">|</span>
            <span className="text-[#475569]">অরাজনৈতিক ও অলাভজনক সমাজসেবা সংস্থা</span>
          </div>
        </div>

        {/* Main Headline & Mission */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E3A8A] tracking-tight leading-[1.25] mb-6">
            তারুণ্যের সৎ সাহসে <br className="hidden sm:inline" />
            <span className="text-[#B45309] underline decoration-[#F59E0B]/40 decoration-wavy underline-offset-8">
              মানবতার সেবায়
            </span>{' '}
            একতাবদ্ধ
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#334155] leading-relaxed mb-8 max-w-3xl mx-auto font-normal">
            <strong className="text-[#0F172A] font-semibold">ইয়ং বেঙ্গল সোসাইটি (Young Bengal Society)</strong> কোনো বাণিজ্যিক বা কৃত্রিম প্রতিষ্ঠান নয়—এটি সমাজের অবহেলিত, দুর্যোগপীড়িত ও সুবিধাবঞ্চিত মানুষের পাশে দাঁড়াতে একঝাঁক নিঃস্বার্থ যুবকের সেচ্ছাসেবী মিলনমেলা। মাহে রমজানের খাদ্য উপহার থেকে শুরু করে শীতবস্ত্র বিতরণ, বন্যা ত্রাণ ও রক্তদানে আমরা সার্বক্ষণিক নিবেদিত।
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <a
              href="#activities"
              className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
            >
              <span>আমাদের সকল কার্যক্রম ও ছবি</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </a>

            <a
              href="#members"
              className="px-6 py-3.5 text-sm sm:text-base font-bold text-[#1E3A8A] bg-[#FFFFFF] hover:bg-[#F8F4EC] border-2 border-[#1E3A8A]/30 hover:border-[#1E3A8A] rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#1E3A8A]" />
              <span>১০০ সদস্যের পূর্ণাঙ্গ তালিকা</span>
            </a>

            <a
              href="#blood-drive"
              className="px-5 py-3.5 text-sm sm:text-base font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all flex items-center gap-2"
            >
              <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
              <span>জরুরি রক্তদাতা খুঁজুন</span>
            </a>

            <button
              onClick={onOpenAddUpdateModal}
              className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#B45309] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] rounded-xl transition-all flex items-center gap-1.5"
              title="নতুন কোনো কাজ সম্পন্ন হলে সাথে সাথে তথ্য যোগ করুন"
            >
              <CalendarClock className="w-4 h-4" />
              <span>+ নতুন কাজ / আপডেট যোগ করুন</span>
            </button>
          </div>

          {/* Verified Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#475569] font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ১০০% স্বচ্ছ তহবিল ও অডিট রিপোর্ট
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              সরাসরি সুবিধাভোগীদের হাতে সহায়তা
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ২৪/৭ জরুরি মানবসেবা রেসপন্স
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ভিডিও ও ছবির স্বচ্ছ প্রমাণ্য দলিল
            </span>
          </div>

        </div>

        {/* Real Metrics Grid - Grounded Cream & Navy Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16">
          {stats.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="card-warm card-warm-hover rounded-2xl p-5 sm:p-6 text-center block group bg-white border border-[#E8DFD1]"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight group-hover:text-[#2563EB] transition-colors mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                {item.count}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#0F172A] mb-1">
                {item.label}
              </div>
              <div className="text-xs text-[#64748B]">
                {item.sub}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
