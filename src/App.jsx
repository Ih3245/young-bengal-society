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
    <div className="min-h-screen flex flex-col bg-[#F4F3EF] text-[#141817]">
      {/* Live Perspective & Role Switcher Bar */}
      <TopRoleBar />

      {/* Main View Area */}
      <main className="flex-1 pb-12">
        {activePortal === 'patient' && <PatientPortal />}
        {activePortal === 'doctor' && <DoctorConsole />}
        {activePortal === 'pharmacy' && <PharmacyHub />}
        {activePortal === 'research' && <ResearchMatrix />}
      </main>

      {/* Academic Capstone & Research Grounding Footer */}
      <footer className="bg-white border-t border-[#141817] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-[#CFD2CE]">
            {/* Col 1: Platform Overview */}
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F6B53]" />
                <span className="font-headline font-bold text-sm text-[#141817]">
                  {teamInfo.projectTitle}
                </span>
              </div>
              <p className="text-xs text-[#5A605D] max-w-xl leading-relaxed">
                A closed-loop digital health ecosystem integrating Patients, Doctors, and Community Pharmacies in Bangladesh (LMICs) with rational antibiotic stewardship, shared EHR, and tele-triage.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-[#5A605D]">
                <span className="px-2 py-0.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">WHO AWaRe 2026</span>
                <span className="px-2 py-0.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">DGDA E-Prescription</span>
                <span className="px-2 py-0.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">WCAG AAA Contrast</span>
              </div>
            </div>

            {/* Col 2: Capstone Team Identity */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase text-[#5A605D] block">
                CAPSTONE GROUP 3 AUTHORS
              </span>
              <ul className="space-y-1 font-medium text-[#141817]">
                {teamInfo.members.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{m.name}</span>
                    <span className="font-mono text-[10px] text-[#5A605D]">{m.id}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Research Foundations */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase text-[#5A605D] block">
                PRIMARY 2026 EVIDENCE
              </span>
              <ul className="space-y-1 text-[11px] text-[#5A605D]">
                <li>• Ghosh et al., 2026 (PMLR 317)</li>
                <li>• Klimentidis et al., 2026 (JPPP 19:1)</li>
                <li>• Alshahrani et al., 2026 (JMDH 19)</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#5A605D]">
            <span>
              Clinical Apothecary & Diagnostic Telemetry Workbench • Hand-Crafted Design System
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
