import React, { useState } from 'react';
import { 
  Users, HeartHandshake, PhoneCall, Calendar, Video, 
  Menu, X, Droplet, ShieldCheck, ChevronRight
} from 'lucide-react';

export function Navbar({ onOpenMemberModal, onOpenDonateModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "হোম", href: "#hero" },
    { label: "সংস্থার পরিচিতি", href: "#about" },
    { label: "মানবিক কার্যক্রম", href: "#activities" },
    { label: "টাইমলাইন ও ইতিহাস", href: "#timeline" },
    { label: "১০০ সদস্য তালিকা", href: "#members", badge: "১০০+" },
    { label: "ভিডিও গ্যালারি", href: "#videos" },
    { label: "জরুরি রক্তদান", href: "#blood-drive", icon: Droplet, isBlood: true },
    { label: "অনুদান সহায়তা", href: "#donate" },
    { label: "যোগাযোগ", href: "#contact" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1]">
      {/* Top emergency announcement bar */}
      <div className="bg-[#1E3A8A] text-[#FAF7F2] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">জরুরি মানবিক হটলাইন: <strong>+880 1711-234567</strong></span>
            <span className="hidden sm:inline text-blue-200">|</span>
            <span className="hidden sm:inline text-blue-200">পবিত্র মাহে রমজান ২০২৬ খাদ্য সহায়তা ক্যাম্পেইন চলমান</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#blood-drive" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <Droplet className="w-3 h-3 text-red-400" /> রক্তদান সেল
            </a>
            <span className="text-blue-300">|</span>
            <a href="mailto:info@youngbengalsociety.org" className="hover:text-amber-300 transition-colors">
              info@youngbengalsociety.org
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Emblem */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white shadow-sm border-2 border-[#FAF7F2] ring-2 ring-[#1E3A8A]/30 group-hover:scale-105 transition-transform">
              <div className="text-center">
                <span className="block text-xs font-bold tracking-widest text-amber-300 leading-none">YBS</span>
                <span className="block text-[8px] text-blue-200 leading-tight">২০১৯</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] tracking-tight leading-tight">
                  ইয়ং বেঙ্গল সোসাইটি
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#EFF6FF] text-[#1E40AF] rounded border border-[#DBEAFE]">
                  নিবন্ধিত অরাজনৈতিক যুব সংগঠন
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium tracking-wide">
                Young Bengal Society <span className="text-[#94A3B8]">•</span> তারুণ্যের শক্তিতে মানবসেবা
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  link.isBlood 
                    ? 'text-red-700 hover:bg-red-50 font-semibold' 
                    : 'text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F3EBE0]'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5 text-red-600" />}
                {link.label}
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#1E3A8A] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenMemberModal}
              className="px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              সদস্য হতে আবেদন
            </button>
            <a
              href="#donate"
              className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-lg transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              অনুদান দিন
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F3EBE0] rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF7F2] border-b border-[#E8DFD1] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in fade-in duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between ${
                  link.isBlood 
                    ? 'text-red-700 bg-red-50' 
                    : 'text-[#1E293B] hover:bg-[#F3EBE0]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4 text-red-600" />}
                  {link.label}
                </span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#1E3A8A] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8DFD1] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMemberModal();
              }}
              className="w-full py-2.5 text-sm font-semibold text-[#1E3A8A] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" /> সদস্য হতে আবেদন করুন
            </button>
            <a
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-sm font-bold text-white bg-[#1E3A8A] rounded-lg flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" /> অনুদান সহায়তা পাঠান
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
