import React from 'react';
import { 
  X, Printer, Droplet, Phone, Mail, MapPin, 
  Award, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export function MemberIdModal({ member, onClose }) {
  if (!member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD1] relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1] mb-5 no-print">
          <span className="text-xs font-bold text-[#1E3A8A] flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            অফিসিয়াল ডিজিটাল আইডি কার্ড
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 text-base font-bold rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Official ID Card Layout */}
        <div className="bg-gradient-to-b from-[#FAF7F2] to-[#FFFDF9] rounded-2xl border-2 border-[#1E3A8A] p-5 relative overflow-hidden shadow-sm">
          
          {/* Watermark Logo in background */}
          <div className="absolute right-2 -bottom-6 w-32 h-32 rounded-full border-8 border-[#1E3A8A]/5 pointer-events-none flex items-center justify-center text-5xl font-black text-[#1E3A8A]/5">
            YBS
          </div>

          {/* Card Header */}
          <div className="flex items-center justify-between border-b-2 border-[#1E3A8A] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                YBS
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E3A8A] uppercase tracking-tight leading-none">
                  YOUNG BENGAL SOCIETY
                </h3>
                <p className="text-[10px] text-[#475569] font-medium leading-tight mt-0.5">
                  ইয়ং বেঙ্গল সোসাইটি • রেজিঃ YBS-DH-২০১৯/৮৪
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              ভেরিফায়েড
            </span>
          </div>

          {/* Member Photo + Basic Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-20 rounded-xl bg-[#1E3A8A] text-white flex flex-col items-center justify-center font-bold text-lg border-2 border-white ring-2 ring-[#1E3A8A]/20 shadow-xs shrink-0">
              <span>{member.nameBn.slice(0, 2)}</span>
              <span className="text-[9px] font-normal text-blue-200 mt-1">সদস্য</span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-black text-[#0F172A] leading-tight">
                {member.nameBn}
              </h4>
              <p className="text-xs text-[#64748B] font-medium mb-1">
                {member.nameEn}
              </p>
              <div className="text-xs font-bold text-[#1E3A8A]">
                {member.roleBn}
              </div>
              <div className="text-[11px] text-[#475569]">
                {member.wingBn}
              </div>
            </div>
          </div>

          {/* Official Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-[#E8DFD1] mb-4">
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">মেম্বার আইডি</span>
              <span className="font-mono font-bold text-[#0F172A]">{member.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">রক্তের গ্রুপ</span>
              <span className="font-bold text-red-700 flex items-center gap-1">
                <Droplet className="w-3 h-3 fill-red-600 text-red-600" />
                {member.blood} (ডোনার)
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">জেলা ও এলাকা</span>
              <span className="font-medium text-[#0F172A] truncate block">
                {member.district}{member.upazila ? `, ${member.upazila}` : ''}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">যোগদানের বছর</span>
              <span className="font-semibold text-[#1E3A8A]">{member.joinYear} সাল</span>
            </div>
          </div>

          {/* Contact Row */}
          <div className="text-[11px] text-[#334155] space-y-1 mb-4 border-t border-[#E8DFD1] pt-2">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#1E3A8A]" />
              <span>মোবাইল: <strong>{member.phone}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#1E3A8A]" />
              <span className="truncate">ইমেইল: {member.email}</span>
            </div>
          </div>

          {/* Card Footer: Signature & Barcode representation */}
          <div className="border-t-2 border-[#1E3A8A] pt-3 flex items-end justify-between">
            <div className="space-y-0.5">
              {/* Simulated barcode */}
              <div className="flex items-center gap-0.5 h-6">
                {[4, 2, 5, 2, 1, 4, 3, 2, 5, 2, 4, 1, 3, 5, 2, 4, 2].map((w, i) => (
                  <span
                    key={i}
                    className="h-full bg-[#1E293B]"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-[#64748B] block">
                VERIFIED NGO MEMBER
              </span>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-xs text-[#1E3A8A] font-bold">
                তানভীর আহমেদ
              </div>
              <div className="text-[9px] text-[#64748B] uppercase tracking-wider border-t border-slate-300 pt-0.5">
                সভাপতি / অনুমোদিত স্বাক্ষর
              </div>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="mt-5 pt-3 border-t border-[#E8DFD1] flex items-center justify-between gap-3 no-print">
          <button
            onClick={handlePrint}
            className="flex-1 py-2 text-xs font-bold text-[#1E3A8A] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>আইডি কার্ড প্রিন্ট করুন</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-colors shadow-xs"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
