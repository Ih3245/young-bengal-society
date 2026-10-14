import React, { useState, useMemo } from 'react';
import { 
  Heart, Calendar, MapPin, Users, Video, Search, 
  ExternalLink, Sparkles, Filter, PlusCircle, CheckCircle, Clock
} from 'lucide-react';
import { activityCategories } from '../data/activitiesData';

export function ActivitiesSection({ 
  activities, 
  onWatchVideo, 
  onOpenAddModal, 
  onSelectActivity 
}) {
  const [selectedCategory, setSelectedCategory] = useState("সকল কার্যক্রম");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchCategory = selectedCategory === "সকল কার্যক্রম" || act.category === selectedCategory;
      const matchSearch = 
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.description && act.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (act.leadMember && act.leadMember.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = 
        statusFilter === "all" ? true :
        statusFilter === "upcoming" ? act.status === "আসন্ন" :
        statusFilter === "completed" ? act.status === "সম্পন্ন" : true;

      return matchCategory && matchSearch && matchStatus;
    });
  }, [activities, selectedCategory, searchQuery, statusFilter]);

  return (
    <section id="activities" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-2">
              মাঠপর্যায়ের কাজের অ্যালবাম ও ডকুমেন্টেশন
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
              আমাদের সকল মানবিক কার্যক্রম
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 max-w-2xl">
              মাহে রমজানে খাদ্য সহায়তা, চরাঞ্চলে তীব্র শীতে কম্বল, বন্যা উদ্ধার অভিযান ও রক্তদান ক্যাম্পেইনের বিস্তারিত ছবি ও ভিডিও প্রতিবেদন।
            </p>
          </div>

          {/* Add New Activity Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>+ নতুন কাজ / আপডেট যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD1] shadow-xs mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কার্যক্রমের নাম, এলাকা বা দায়িত্বপ্রাপ্তদের খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A]"
              />
            </div>

            {/* Status Filter buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  statusFilter === "all"
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-[#F5EFEB] text-[#475569] hover:bg-[#EBE3D5]"
                }`}
              >
                সকল কাজ ({activities.length})
              </button>
              <button
                onClick={() => setStatusFilter("upcoming")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === "upcoming"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <Clock className="w-3 h-3" />
                আসন্ন পরিকল্পনা
              </button>
              <button
                onClick={() => setStatusFilter("completed")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === "completed"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                সম্পন্ন সেবা
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            {activityCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#1E3A8A] text-white font-semibold"
                    : "bg-[#FAF7F2] text-[#475569] hover:bg-[#F3EBE0] border border-[#E8DFD1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Activities Grid */}
        {filteredActivities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD1]">
            <Heart className="w-12 h-12 text-[#94A3B8] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-[#1E293B]">কোনো কার্যক্রম পাওয়া যায়নি</h3>
            <p className="text-sm text-[#64748B] mt-1">
              অন্য কোনো ক্যাটাগরি বা শব্দ দিয়ে অনুসন্ধান করে দেখুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => {
              const isUpcoming = act.status === "আসন্ন";
              return (
                <div
                  key={act.id}
                  className="card-warm card-warm-hover rounded-2xl overflow-hidden bg-white border border-[#E8DFD1] flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative h-52 sm:h-56 bg-[#E2D9CC] overflow-hidden">
                    <img
                      src={act.photoUrl || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#1E3A8A] text-white shadow-xs">
                        {act.category}
                      </span>
                    </div>

                    {/* Status pill */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md shadow-xs ${
                          isUpcoming
                            ? "bg-amber-500 text-white animate-pulse"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>

                    {/* YouTube Video Badge trigger if available */}
                    {act.youtubeId && (
                      <button
                        onClick={() => onWatchVideo(act.youtubeId, act.title)}
                        className="absolute bottom-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95"
                      >
                        <Video className="w-3.5 h-3.5 fill-white" />
                        <span>ভিডিও দেখুন</span>
                      </button>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Location */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#64748B] mb-2.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#1E3A8A]" />
                          {act.date}
                        </span>
                        <span className="flex items-center gap-1 text-[#475569]">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          {act.location}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#1E3A8A] transition-colors mb-3">
                        {act.title}
                      </h3>

                      {/* Beneficiaries & Team */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] text-xs space-y-1.5 mb-3.5">
                        <div className="flex items-center justify-between text-[#334155]">
                          <span className="text-[#64748B]">সুবিধাভোগী:</span>
                          <span className="font-bold text-[#1E3A8A]">{act.beneficiaries}</span>
                        </div>
                        {act.budget && (
                          <div className="flex items-center justify-between text-[#334155]">
                            <span className="text-[#64748B]">বাজেট / তহবিল:</span>
                            <span className="font-medium text-emerald-800">{act.budget}</span>
                          </div>
                        )}
                        {act.leadMember && (
                          <div className="flex items-center justify-between text-[#334155] pt-0.5 border-t border-[#E8DFD1]/60">
                            <span className="text-[#64748B]">তত্ত্বাবধানে:</span>
                            <span className="font-medium text-[#0F172A] truncate max-w-[170px]">{act.leadMember}</span>
                          </div>
                        )}
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 mb-4">
                        {act.description}
                      </p>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                      <button
                        onClick={() => onSelectActivity(act)}
                        className="text-xs font-bold text-[#1E3A8A] hover:text-[#2563EB] flex items-center gap-1 transition-colors"
                      >
                        বিস্তারিত ডকুমেন্ট ও ছবি পড়ুন →
                      </button>

                      {act.youtubeId && (
                        <button
                          onClick={() => onWatchVideo(act.youtubeId, act.title)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <Video className="w-3.5 h-3.5" />
                          ইউটিউব
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
