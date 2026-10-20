import React from 'react';
import { useClinical } from '../../context/ClinicalContext';
import {
  User,
  Stethoscope,
  Pill,
  BookOpen,
  Activity,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const TopRoleBar = () => {
  const {
    activePortal,
    setActivePortal,
    language,
    setLanguage,
    triageQueue,
    prescriptions,
    researchPapers,
    teamInfo,
    resetToSeedData,
    simulateAcuteScenario
  } = useClinical();

  // Count pending doctor triage cases
  const pendingTriageCount = triageQueue.filter(
    (t) => t.status === 'PENDING_DOCTOR_CONSULT'
  ).length;

  // Count flagged DTPs needing resolution
  const pendingDtpCount = prescriptions.filter(
    (rx) => rx.status === 'DTP_FLAGGED'
  ).length;

  // Active locked prescriptions waiting for pharmacy check
  const issuedRxCount = prescriptions.filter(
    (rx) => rx.status === 'ISSUED'
  ).length;

  const portals = [
    {
      id: 'patient',
      num: '01',
      title: 'Patient Care & AI Triage',
      titleBn: 'রোগীর সেবা ও লক্ষণ যাচাই',
      icon: User,
      badge: null
    },
    {
      id: 'doctor',
      num: '02',
      title: 'Doctor Telemedicine & e-Rx',
      titleBn: 'ডাক্তার কনসোল ও ই-প্রেসক্রিপশন',
      icon: Stethoscope,
      badge: pendingTriageCount > 0 ? `${pendingTriageCount} Consults` : null,
      badgeType: 'amber'
    },
    {
      id: 'pharmacy',
      num: '03',
      title: 'Pharmacy Hub & Stewardship',
      titleBn: 'কমিউনিটি ফার্মেসি ও অ্যান্টিবায়োটিক লক',
      icon: Pill,
      badge: pendingDtpCount > 0 ? `${pendingDtpCount} DTP Alerts` : (issuedRxCount > 0 ? `${issuedRxCount} Ready` : null),
      badgeType: pendingDtpCount > 0 ? 'red' : 'green'
    },
    {
      id: 'research',
      num: '04',
      title: 'Literature Review Matrix',
      titleBn: 'গবেষণা ও লিটারেচার ম্যাট্রিক্স',
      icon: BookOpen,
      badge: `${researchPapers.length} Papers`,
      badgeType: 'neutral'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Identity & Sync Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Project Title & Team Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
            <span className="font-bold text-sm tracking-tight text-slate-900">
              {language === 'bn' ? 'ইউনিফাইড ডিজিটাল হেলথকেয়ার প্ল্যাটফর্ম' : 'UNIFIED DIGITAL HEALTHCARE PLATFORM'}
            </span>
            <span className="hidden md:inline font-mono px-2 py-0.5 text-[10px] bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-600">
              CAPSTONE GROUP 3
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-500 border-l border-slate-200 pl-3">
            <span>Md. Ibrahim Hussain (242002129)</span>
            <span>•</span>
            <span>Md Leon Ahammed (242002039)</span>
            <span>•</span>
            <span>Jakaria Hoque (242002012)</span>
          </div>
        </div>

        {/* Right: Sync Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg text-[10px] font-mono font-semibold text-teal-800">
            <Activity className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>SYNC: BROADCAST LIVE</span>
          </div>

          {/* Quick Simulation Button */}
          <button
            onClick={simulateAcuteScenario}
            title="Simulate an acute patient seeking Watch-class antibiotic at counter"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Simulate Live Case</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetToSeedData}
            title="Reset to verified initial Bangladesh clinical dataset"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs text-slate-600 hover:text-slate-900 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Language Switcher */}
          <div className="inline-flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${
                language === 'en' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all font-['Hind_Siliguri'] ${
                language === 'bn' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>

      {/* Modern 4-Portal Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 py-2" aria-label="Portals">
          {portals.map((portal) => {
            const isActive = activePortal === portal.id;
            const Icon = portal.icon;

            return (
              <button
                key={portal.id}
                onClick={() => setActivePortal(portal.id)}
                className={`relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[42px] ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-600'
                }`}>
                  {portal.num}
                </span>

                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-200' : 'text-teal-700'}`} />

                <span>
                  {language === 'bn' ? portal.titleBn : portal.title}
                </span>

                {portal.badge && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    portal.badgeType === 'red'
                      ? 'bg-rose-500 text-white'
                      : portal.badgeType === 'amber'
                      ? 'bg-amber-500 text-white'
                      : portal.badgeType === 'green'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {portal.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
