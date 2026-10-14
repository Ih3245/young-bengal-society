import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, Droplet, Phone, Mail, MapPin, 
  Award, Shield, Calendar, Download, Eye, PlusCircle, 
  CheckCircle, ChevronLeft, ChevronRight, Grid, List, Printer
} from 'lucide-react';
import { bloodGroupsList, wingsList } from '../data/membersData';

export function MembersDirectory({ 
  members, 
  onSelectMember, 
  onOpenAddMemberModal 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("All");
  const [selectedWing, setSelectedWing] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Extract unique districts
  const districts = useMemo(() => {
    const set = new Set();
    members.forEach(m => {
      if (m.district) set.add(m.district);
    });
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        m.nameBn.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.roleBn.toLowerCase().includes(q) ||
        m.district.toLowerCase().includes(q) ||
        (m.upazila && m.upazila.toLowerCase().includes(q)) ||
        m.phone.includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.blood.toLowerCase().includes(q)
      );

      const matchBlood = selectedBlood === "All" || m.blood === selectedBlood;
      const matchWing = selectedWing === "All" || m.wingBn === selectedWing;
      const matchDistrict = selectedDistrict === "All" || m.district === selectedDistrict;
      const matchStatus = selectedStatus === "All" || m.status.includes(selectedStatus);

      return matchSearch && matchBlood && matchWing && matchDistrict && matchStatus;
    });
  }, [members, searchQuery, selectedBlood, selectedWing, selectedDistrict, selectedStatus]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  // Reset page when filters change
  const handleFilterChange = (setter, val) => {
    setter(val);
    setCurrentPage(1);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Member ID,Name (Bengali),Name (English),Designation,Wing,Blood Group,District,Upazila,Phone,Email,Join Year,Status\n"];
    const rows = filteredMembers.map(m => 
      `"${m.id}","${m.nameBn}","${m.nameEn}","${m.roleBn}","${m.wingBn}","${m.blood}","${m.district}","${m.upazila || ''}","${m.phone}","${m.email}","${m.joinYear}","${m.status}"`
    );
    const blob = new Blob([headers.concat(rows.join("\n"))], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Young_Bengal_Society_Members_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="members" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>১০০ জন নিবন্ধিত সদস্য ও উপদেষ্টার তালিকা</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
              সদস্য পরিচিতি ও ডাটাবেজ
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 max-w-2xl">
              ইয়ং বেঙ্গল সোসাইটির কেন্দ্রীয় কার্যনির্বাহী পরিষদ, বিভাগীয় সমন্বয়ক ও সক্রিয় রক্তদাতা সদস্যদের পূর্ণাঙ্গ তথ্যভাণ্ডার।
            </p>
          </div>

          {/* Action buttons on top right */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-bold text-[#1E3A8A] bg-white hover:bg-[#F3EBE0] border border-[#CBD5E1] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              title="CSV স্প্রেডশিট ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>এক্সেল / CSV ডাউনলোড</span>
            </button>

            <button
              onClick={onOpenAddMemberModal}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>+ নতুন সদস্য যুক্ত করুন</span>
            </button>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8DFD1] shadow-xs mb-8 space-y-4">
          
          {/* Search + Quick stats row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                placeholder="সদস্যের নাম (বাংলা/ইংরেজি), পদবি, ফোন বা জেলা দিয়ে সার্চ করুন..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedWing}
                onChange={(e) => handleFilterChange(setSelectedWing, e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl text-[#0F172A] focus:outline-none"
              >
                <option value="All">সকল উইং ও কমিটি ({members.length})</option>
                {wingsList.filter(w => w !== "All").map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <select
                value={selectedDistrict}
                onChange={(e) => handleFilterChange(setSelectedDistrict, e.target.value)}
                className="flex-1 px-3 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl text-[#0F172A] focus:outline-none"
              >
                <option value="All">সকল জেলা</option>
                {districts.filter(d => d !== "All").map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* View mode toggle */}
              <div className="flex items-center bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-[#1E3A8A] text-white" : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                  title="গ্রিড ভিউ"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table" ? "bg-[#1E3A8A] text-white" : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                  title="টেবিল ভিউ"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Blood Group Quick Filter Tabs */}
          <div className="pt-2 border-t border-[#E8DFD1] flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[#64748B] flex items-center gap-1 shrink-0 mr-1">
              <Droplet className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              রক্তের গ্রুপ:
            </span>
            {bloodGroupsList.map((bg) => (
              <button
                key={bg}
                onClick={() => handleFilterChange(setSelectedBlood, bg)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedBlood === bg
                    ? "bg-red-700 text-white font-bold"
                    : "bg-[#FAF7F2] text-[#334155] hover:bg-[#F3EBE0] border border-[#E8DFD1]"
                }`}
              >
                {bg === "All" ? "সকল গ্রুপ" : bg}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#64748B] mb-5 font-medium px-1">
          <div>
            মোট <strong className="text-[#0F172A]">{members.length}</strong> জন সদস্যের মধ্যে{' '}
            <strong className="text-[#1E3A8A]">{filteredMembers.length}</strong> জন ফলাফল প্রদর্শিত
            {selectedBlood !== "All" && <span className="ml-1 text-red-600 font-bold">({selectedBlood} গ্রুপের রক্তদাতা)</span>}
          </div>
          <div>
            পৃষ্ঠা {currentPage} / {totalPages}
          </div>
        </div>

        {/* Member Grid or Table */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD1]">
            <Users className="w-12 h-12 text-[#94A3B8] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-[#0F172A]">কোনো সদস্য পাওয়া যায়নি</h3>
            <p className="text-xs text-[#64748B] mt-1">
              অন্য কোনো নাম বা ফিল্টার নির্বাচন করে চেষ্টা করুন।
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View of Member Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedMembers.map((member) => (
              <div
                key={member.id}
                className="card-warm card-warm-hover rounded-2xl p-5 bg-white border border-[#E8DFD1] flex flex-col justify-between group"
              >
                <div>
                  {/* Top card row: ID, Status, Blood Group */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#64748B] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD1]">
                      {member.id}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                        <Droplet className="w-3 h-3 fill-red-600 text-red-600" />
                        {member.blood}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {member.status}
                      </span>
                    </div>
                  </div>

                  {/* Member Profile Info */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    {/* Avatar Initial Circle */}
                    <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs border-2 border-white ring-2 ring-[#1E3A8A]/20">
                      {member.nameBn.slice(0, 2)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug truncate">
                        {member.nameBn}
                      </h3>
                      <p className="text-xs text-[#64748B] font-medium truncate">
                        {member.nameEn}
                      </p>
                      <div className="text-xs font-semibold text-[#B45309] mt-0.5">
                        {member.roleBn}
                      </div>
                    </div>
                  </div>

                  {/* Details Pill Box */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] text-xs space-y-1.5 mb-3.5">
                    <div className="flex items-center justify-between text-[#334155]">
                      <span className="text-[#64748B]">উইং / বিভাগ:</span>
                      <span className="font-medium text-[#0F172A] truncate max-w-[170px]">{member.wingBn}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#334155]">
                      <span className="text-[#64748B]">জেলা ও এলাকা:</span>
                      <span className="font-medium text-[#0F172A] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {member.district}{member.upazila ? `, ${member.upazila}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#334155]">
                      <span className="text-[#64748B]">যোগদান ও প্রকল্প:</span>
                      <span className="font-medium text-[#1E3A8A]">
                        {member.joinYear} সাল • {member.projects}টি প্রজেক্ট
                      </span>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  {member.bio && (
                    <p className="text-xs text-[#475569] italic line-clamp-2 mb-3">
                      "{member.bio}"
                    </p>
                  )}
                </div>

                {/* Card Footer: Contact buttons & ID modal */}
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="p-2 text-xs font-semibold text-[#1E3A8A] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-lg transition-colors flex items-center gap-1"
                      title="সরাসরি কল করুন"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">কল</span>
                    </a>

                    <a
                      href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1"
                      title="হোয়াটসঅ্যাপে যোগাযোগ"
                    >
                      <span className="text-[11px] font-bold">WA</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onSelectMember(member)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-lg transition-all flex items-center gap-1 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-300" />
                    <span>আইডি কার্ড</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Table View of Members */
          <div className="bg-white rounded-2xl border border-[#E8DFD1] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF7F2] text-[#475569] font-bold uppercase text-[11px] border-b border-[#E8DFD1]">
                  <tr>
                    <th className="px-4 py-3.5">আইডি</th>
                    <th className="px-4 py-3.5">নাম ও পরিচিতি</th>
                    <th className="px-4 py-3.5">পদবি ও উইং</th>
                    <th className="px-4 py-3.5 text-center">রক্ত</th>
                    <th className="px-4 py-3.5">জেলা</th>
                    <th className="px-4 py-3.5">যোগাযোগ</th>
                    <th className="px-4 py-3.5 text-right">আইডি কার্ড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD1]">
                  {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#64748B]">
                        {member.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-[#0F172A]">{member.nameBn}</div>
                        <div className="text-xs text-[#64748B]">{member.nameEn}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#1E3A8A]">{member.roleBn}</div>
                        <div className="text-xs text-[#64748B]">{member.wingBn}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-red-50 text-red-700 border border-red-200">
                          {member.blood}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#334155]">
                        {member.district}{member.upazila ? ` (${member.upazila})` : ''}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#0F172A]">{member.phone}</div>
                        <div className="text-[11px] text-[#64748B] truncate max-w-[140px]">{member.email}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onSelectMember(member)}
                          className="px-2.5 py-1 text-xs font-bold text-[#1E3A8A] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-md transition-colors"
                        >
                          দেখুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DFD1]">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-bold text-[#334155] bg-[#FAF7F2] hover:bg-[#F3EBE0] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl border border-[#E8DFD1] flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              পূর্ববর্তী
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === pg
                      ? "bg-[#1E3A8A] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-[#475569] hover:bg-[#EBE3D5]"
                  }`}
                >
                  {pg}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-bold text-[#334155] bg-[#FAF7F2] hover:bg-[#F3EBE0] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl border border-[#E8DFD1] flex items-center gap-1.5 transition-colors"
            >
              পরবর্তী
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
