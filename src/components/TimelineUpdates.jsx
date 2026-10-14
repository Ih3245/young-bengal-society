import React, { useState, useMemo } from 'react';
import { 
  History, Calendar, MapPin, Video, Users, CheckCircle2, 
  Clock, ArrowUpRight, Plus, Sparkles, Filter
} from 'lucide-react';

export function TimelineUpdates({ 
  activities, 
  onWatchVideo, 
  onOpenAddModal, 
  onSelectActivity 
}) {
  const [selectedYear, setSelectedYear] = useState("all");

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
      // Put upcoming first, then reverse chronological by date
      if (a.status === "আসন্ন" && b.status !== "আসন্ন") return -1;
      if (a.status !== "আসন্ন" && b.status === "আসন্ন") return 1;
      return (b.dateRaw || "").localeCompare(a.dateRaw || "");
    });
  }, [activities]);

  const years = useMemo(() => {
    const set = new Set();
    activities.forEach(a => {
      if (a.year) set.add(a.year);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [activities]);

  const filteredTimeline = useMemo(() => {
    if (selectedYear === "all") return sortedActivities;
    return sortedActivities.filter(a => String(a.year) === String(selectedYear));
  }, [sortedActivities, selectedYear]);

  return (
    <section id="timeline" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              <span>শুরু থেকে বর্তমান ও ভবিষ্যৎ সেবা</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
              ধারাবাহিক টাইমলাইন ও লাইভ আপডেট
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 max-w-2xl">
              ২০১৯ সালে সোসাইটির আত্মপ্রকাশ থেকে শুরু করে বর্তমান চলমান কাজ এবং ভবিষ্যতের প্রতিটি উদ্যোগ এখানে স্বয়ংক্রিয়ভাবে প্রতিদিনের মতো আপডেট থাকবে।
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>নতুন আপডেট যুক্ত করুন</span>
          </button>
        </div>

        {/* Year Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setSelectedYear("all")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap ${
              selectedYear === "all"
                ? "bg-[#1E3A8A] text-white shadow-xs"
                : "bg-white text-[#475569] hover:bg-[#F3EBE0] border border-[#E8DFD1]"
            }`}
          >
            সকল বছর (২০১৯ - ২০২৬+)
          </button>
          {years.map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap ${
                String(selectedYear) === String(yr)
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-[#F3EBE0] border border-[#E8DFD1]"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Timeline Tree Component */}
        <div className="relative border-l-2 border-[#CBD5E1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          
          {filteredTimeline.map((item, index) => {
            const isUpcoming = item.status === "আসন্ন";

            return (
              <div key={item.id} className="relative group">
                
                {/* Node indicator */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-[#FAF7F2] flex items-center justify-center text-white shadow-sm ${
                    isUpcoming 
                      ? "bg-amber-500 ring-4 ring-amber-200 animate-bounce" 
                      : "bg-[#1E3A8A]"
                  }`}
                >
                  {isUpcoming ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className="card-warm rounded-2xl p-5 sm:p-7 bg-white border border-[#E8DFD1] hover:border-[#1E3A8A]/40 transition-all shadow-xs">
                  
                  {/* Meta tag row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span 
                        className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                          isUpcoming 
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]"
                        }`}
                      >
                        {item.status === "আসন্ন" ? "পরবর্তী আসন্ন পরিকল্পনা" : "সম্পন্ন কার্যক্রম"}
                      </span>
                      <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        {item.date}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-[#475569] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {item.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Content & Image Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    
                    <div className={item.photoUrl ? "md:col-span-8" : "md:col-span-12"}>
                      <p className="text-sm text-[#334155] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] font-semibold text-[#1E3A8A]">
                          <Users className="w-3.5 h-3.5" />
                          সুবিধাভোগী: {item.beneficiaries}
                        </span>
                        {item.leadMember && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] text-[#475569]">
                            দায়িত্বে: <strong className="text-[#0F172A]">{item.leadMember}</strong>
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => onSelectActivity(item)}
                          className="text-xs font-bold text-[#1E3A8A] hover:text-[#2563EB] flex items-center gap-1"
                        >
                          সম্পূর্ণ বিবরণ পড়ুন <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        
                        {item.youtubeId && (
                          <button
                            onClick={() => onWatchVideo(item.youtubeId, item.title)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 flex items-center gap-1.5 transition-colors"
                          >
                            <Video className="w-3.5 h-3.5 text-red-600" />
                            ইউটিউব ভিডিও ডকুমেন্টারি
                          </button>
                        )}
                      </div>
                    </div>

                    {item.photoUrl && (
                      <div className="md:col-span-4">
                        <div 
                          onClick={() => onSelectActivity(item)}
                          className="rounded-xl overflow-hidden h-40 bg-[#FAF7F2] border border-[#E8DFD1] cursor-pointer group/img relative"
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#0F172A]/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                            ছবি বড় করে দেখুন
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
