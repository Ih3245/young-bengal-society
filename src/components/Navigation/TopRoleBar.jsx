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
    <header className="sticky top-0 z-50 bg-[#F4F3EF] border-b border-[#141817] shadow-sm">
      {/* Top Telemetry & Capstone Identity Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 border-b border-[#CFD2CE] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Project title & Capstone Team */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F6B53] animate-pulse" />
            <span className="font-headline font-bold text-sm tracking-tight text-[#141817]">
              {language === 'bn' ? 'ইউনিফাইড ডিজিটাল হেলথকেয়ার প্ল্যাটফর্ম' : 'UNIFIED DIGITAL HEALTHCARE PLATFORM'}
            </span>
            <span className="hidden md:inline font-mono px-1.5 py-0.5 text-[10px] bg-[#E8E6DF] border border-[#CFD2CE] rounded text-[#5A605D]">
              CAPSTONE GROUP 3
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#5A605D] border-l border-[#CFD2CE] pl-3">
            <span>Md. Ibrahim Hussain (242002129)</span>
            <span>•</span>
            <span>Md Leon Ahammed (242002039)</span>
            <span>•</span>
            <span>Jakaria Hoque (242002012)</span>
          </div>
        </div>

        {/* Right: Actions, Live Sync Indicator, Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Sync telemetry tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#E6F3EE] border border-[#0F6B53] rounded text-[10px] font-mono font-semibold text-[#0F6B53]">
            <Activity className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            <span>SYNC: BROADCAST LIVE</span>
          </div>

          {/* Quick Simulation Button for evaluators */}
          <button
            onClick={simulateAcuteScenario}
            title="Simulate an acute patient seeking Watch-class antibiotic at counter"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFFFFF] border border-[#141817] rounded text-[11px] font-semibold text-[#141817] hover:bg-[#E8E6DF] shadow-[1px_1px_0px_#141817] active:translate-y-0.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C84B24]" />
            <span className="hidden sm:inline">Simulate Live Case</span>
          </button>

          {/* Reset Seed Data */}
          <button
            onClick={resetToSeedData}
            title="Reset to verified initial Bangladesh clinical dataset"
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFFFFF] border border-[#CFD2CE] rounded text-[11px] text-[#5A605D] hover:text-[#141817] hover:border-[#141817] transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Language Toggle */}
          <div className="inline-flex items-center border border-[#141817] rounded overflow-hidden shadow-[1px_1px_0px_#141817]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[11px] font-bold ${
                language === 'en' ? 'bg-[#141817] text-white' : 'bg-white text-[#141817] hover:bg-[#E8E6DF]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 text-[11px] font-bold font-['Hind_Siliguri'] ${
                language === 'bn' ? 'bg-[#141817] text-white' : 'bg-white text-[#141817] hover:bg-[#E8E6DF]'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Portal Interactive Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-1.5" aria-label="Portals">
          {portals.map((portal) => {
            const isActive = activePortal === portal.id;
            const Icon = portal.icon;

            return (
              <button
                key={portal.id}
                onClick={() => setActivePortal(portal.id)}
                className={`relative flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded transition-all whitespace-nowrap min-h-[42px] ${
                  isActive
                    ? 'bg-[#141817] text-[#FFFFFF] shadow-[2px_2px_0px_#0F6B53]'
                    : 'bg-[#FFFFFF] text-[#141817] border border-[#CFD2CE] hover:border-[#141817] hover:bg-[#E8E6DF]'
                }`}
              >
                <span className={`font-mono text-[10px] font-bold px-1 py-0.5 rounded ${
                  isActive ? 'bg-[#0F6B53] text-white' : 'bg-[#E8E6DF] text-[#5A605D]'
                }`}>
                  {portal.num}
                </span>

                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6F3EE]' : 'text-[#0F6B53]'}`} />

                <span className="font-semibold tracking-tight">
                  {language === 'bn' ? portal.titleBn : portal.title}
                </span>

                {portal.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    portal.badgeType === 'red'
                      ? 'bg-[#C84B24] text-white'
                      : portal.badgeType === 'amber'
                      ? 'bg-[#B45309] text-white'
                      : portal.badgeType === 'green'
                      ? 'bg-[#0F6B53] text-white'
                      : 'bg-[#E8E6DF] text-[#141817]'
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
