import React, { useState, useMemo } from 'react';
import { 
  Droplet, Phone, MessageSquare, MapPin, 
  AlertCircle, ShieldCheck, Heart, Search, CheckCircle2
} from 'lucide-react';
import { bloodGroupsList } from '../data/membersData';

export function EmergencyBlood({ members }) {
  const [selectedBlood, setSelectedBlood] = useState("O+");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const availableDistricts = useMemo(() => {
    const set = new Set();
    members.forEach(m => {
      if (m.district) set.add(m.district);
    });
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const matchingDonors = useMemo(() => {
    return members.filter(m => {
      const matchBlood = selectedBlood === "All" || m.blood === selectedBlood;
      const matchDistrict = selectedDistrict === "All" || m.district === selectedDistrict;
      return matchBlood && matchDistrict;
    });
  }, [members, selectedBlood, selectedDistrict]);

  return (
    <section id="blood-drive" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="bg-gradient-to-br from-red-700 via-red-800 to-rose-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-10">
          
          {/* Subtle watermark circle */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Droplet className="w-4 h-4 fill-white" />
              <span>২৪ ঘণ্টা ফ্রি জরুরি রক্তদান সেল</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              জরুরি রক্তের প্রয়োজনে রক্তের গ্রুপ নির্বাচন করুন
            </h2>
            
            <p className="text-sm sm:text-base text-red-100 leading-relaxed mb-6 font-normal">
              মুহূর্তের নোটিশে থ্যালাসেমিয়া, ডেলিভারি বা অপারেশনের রোগীর জন্য রক্তের প্রয়োজন? আমাদের ১০০ জন সদস্যের ডাটাবেজ থেকে তাৎক্ষণিকভাবে রক্তদাতার মোবাইল নম্বর পেয়ে কল করতে পারেন। রক্তদানে কোনো টাকা নেওয়া হয় না—এটি সম্পূর্ণ বিনামূল্যে সেবামূলক।
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-red-200">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ১০০% স্বেচ্ছায় ও বিনামূল্যে
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                জরুরি হটলাইন: +880 1711-234567
              </span>
            </div>
          </div>
        </div>

        {/* Filter Card for Blood Donors */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD1] shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                রক্তের গ্রুপ পছন্দ করুন:
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {bloodGroupsList.map(bg => (
                  <button
                    key={bg}
                    onClick={() => setSelectedBlood(bg)}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                      selectedBlood === bg
                        ? "bg-red-700 text-white shadow-sm ring-2 ring-red-400/40"
                        : "bg-[#FAF7F2] text-[#334155] hover:bg-[#F3EBE0] border border-[#E8DFD1]"
                    }`}
                  >
                    {bg === "All" ? "সকল গ্রুপ" : bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                জেলা ফিল্টার:
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl text-[#0F172A] focus:outline-none"
              >
                <option value="All">সকল জেলা</option>
                {availableDistricts.filter(d => d !== "All").map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Matched Donors Grid */}
        <div className="mb-4 flex items-center justify-between text-xs sm:text-sm text-[#64748B] px-1 font-medium">
          <span>
            {selectedBlood !== "All" ? `${selectedBlood} গ্রুপের ` : ''}
            মোট <strong className="text-red-700 font-bold">{matchingDonors.length}</strong> জন সম্ভাব্য রক্তদাতা পাওয়া গেছে
          </span>
          <span className="text-[11px] text-[#94A3B8]">
            যেকোনো প্রয়োজনে সরাসরি ফোনে যোগাযোগ করুন
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {matchingDonors.slice(0, 12).map((donor) => (
            <div
              key={donor.id}
              className="card-warm rounded-2xl p-4 bg-white border border-[#E8DFD1] hover:border-red-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 text-xs font-black rounded-lg bg-red-100 text-red-800 border border-red-300 flex items-center gap-1 font-mono">
                    <Droplet className="w-3 h-3 fill-red-600 text-red-600" />
                    {donor.blood}
                  </span>
                  <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    {donor.district}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#0F172A] mb-0.5">
                  {donor.nameBn}
                </h4>
                <p className="text-xs text-[#64748B] mb-2 truncate">
                  {donor.roleBn}
                </p>

                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] text-[11px] text-[#475569] mb-3">
                  ফোন: <strong className="text-[#0F172A]">{donor.phone}</strong>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E8DFD1]">
                <a
                  href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-1.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  কল দিন
                </a>
                <a
                  href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-center transition-colors"
                  title="হোয়াটসঅ্যাপ"
                >
                  WA
                </a>
              </div>
            </div>
          ))}
        </div>

        {matchingDonors.length > 12 && (
          <div className="text-center mt-6">
            <a
              href="#members"
              className="text-xs font-bold text-[#1E3A8A] hover:underline"
            >
              সদস্য তালিকা সেকশনে গিয়ে বাকি {matchingDonors.length - 12} জন রক্তদাতার তথ্য দেখুন →
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
