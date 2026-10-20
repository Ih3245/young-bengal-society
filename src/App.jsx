import React from 'react';
import { ClinicalProvider, useClinical } from './context/ClinicalContext';
import { TopRoleBar } from './components/Navigation/TopRoleBar';
import { PatientPortal } from './components/Portals/PatientPortal';
import { DoctorConsole } from './components/Portals/DoctorConsole';
import { PharmacyHub } from './components/Portals/PharmacyHub';
import { ResearchMatrix } from './components/Portals/ResearchMatrix';
import { ShieldCheck, BookOpen, Activity, HeartPulse } from 'lucide-react';

const MainLayout = () => {
  const { activePortal, teamInfo, language } = useClinical();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Live Perspective & Role Switcher Bar */}
      <TopRoleBar />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activePortal === 'patient' && <PatientPortal />}
        {activePortal === 'doctor' && <DoctorConsole />}
        {activePortal === 'pharmacy' && <PharmacyHub />}
        {activePortal === 'research' && <ResearchMatrix />}
      </main>

      {/* Academic Capstone & Research Grounding Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Col 1: Platform Overview */}
            <div className="md:col-span-2 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="font-bold text-sm text-slate-900">
                  {teamInfo.projectTitle}
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                A closed-loop digital health ecosystem connecting Patients, Doctors, and Community Pharmacies in Bangladesh (LMICs) with rational antibiotic stewardship, shared EHR, and tele-triage.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-slate-600">
                <span className="px-2.5 py-1 bg-slate-100 rounded-md">WHO AWaRe 2026</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-md">DGDA E-Prescribing</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-md">WCAG AAA Contrast</span>
              </div>
            </div>

            {/* Col 2: Capstone Team Identity */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                CAPSTONE GROUP 3 AUTHORS
              </span>
              <ul className="space-y-1.5 font-medium text-slate-800">
                {teamInfo.members.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{m.name}</span>
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">{m.id}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Research Foundations */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                PRIMARY 2026 EVIDENCE
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>• Ghosh et al., 2026 (PMLR 317)</li>
                <li>• Klimentidis et al., 2026 (JPPP 19:1)</li>
                <li>• Alshahrani et al., 2026 (JMDH 19)</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Modern Clinical Healthcare Platform • Capstone Senior Thesis
            </span>
            <span>
              Academic Session 2025–2026 • Verified Vercel Production Build
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <ClinicalProvider>
      <MainLayout />
    </ClinicalProvider>
  );
}

export default App;
