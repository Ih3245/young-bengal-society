import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
import {
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Clock,
  Pill,
  Send,
  Building2,
  ShieldAlert,
  ShieldCheck,
  Info,
  ChevronRight,
  Flame,
  Activity,
  Check
} from 'lucide-react';

export const PatientPortal = () => {
  const {
    language,
    patients,
    activePatientId,
    setActivePatientId,
    activePatient,
    prescriptions,
    submitTriageCase,
    setActivePortal,
    logAdherenceDose,
    reportAdverseReaction,
    pharmacies
  } = useClinical();

  // Triage state
  const [feverDays, setFeverDays] = useState(3);
  const [temperatureF, setTemperatureF] = useState(101.4);
  const [coughType, setCoughType] = useState('productive');
  const [hasDysuria, setHasDysuria] = useState(false);
  const [hasSoreThroat, setHasSoreThroat] = useState(true);
  const [narrativeText, setNarrativeText] = useState(
    'গত ৩ দিন ধরে তীব্র জ্বর ও গলা ব্যথা। কফের সাথে হলুদ শ্লেষ্মা আসছে, ফার্মেসি থেকে অ্যান্টিবায়োটিক নিতে চাই।'
  );
  const [triageResult, setTriageResult] = useState(null);
  const [isSubmittingTriage, setIsSubmittingTriage] = useState(false);
  const [adrInput, setAdrInput] = useState('');
  const [adrSubmitted, setAdrSubmitted] = useState(false);

  // Active patient's prescriptions
  const patientPrescriptions = prescriptions.filter(
    (rx) => rx.patientId === activePatient.id
  );

  // Handle Triage Submission
  const handleRunTriage = (e) => {
    e.preventDefault();
    setIsSubmittingTriage(true);

    const inputData = {
      feverDays: Number(feverDays),
      temperatureF: Number(temperatureF),
      coughType,
      hasDysuria,
      hasSoreThroat,
      narrativeText,
      age: activePatient.age,
      comorbidities: activePatient.chronicConditions,
      source: 'Patient Self-Service Triage Portal'
    };

    const res = submitTriageCase(inputData);
    setTriageResult(res.verdict);
    setIsSubmittingTriage(false);
  };

  // Quick preset sample narratives
  const samplePrompts = [
    {
      label: 'Sample A: Viral Cold (Green)',
      text: 'Mild runny nose, sneezing, scratchy throat for 24 hours. No high fever.',
      temp: 98.8,
      days: 1,
      cough: 'none',
      dysuria: false,
      throat: true
    },
    {
      label: 'Sample B: Bacterial Pharyngitis (Amber)',
      text: 'গত ৩ দিন ধরে জ্বর ও গলা ব্যথা, কফে হলুদ শ্লেষ্মা, ফার্মেসি থেকে অ্যান্টিবায়োটিক নিতে চাই।',
      temp: 101.4,
      days: 3,
      cough: 'productive',
      dysuria: false,
      throat: true
    },
    {
      label: 'Sample C: Sepsis / Red-Flag (Red)',
      text: 'Severe chills, temperature 103.8°F, breathing difficulty, severe flank pain and vomiting.',
      temp: 103.8,
      days: 3,
      cough: 'hemoptysis',
      dysuria: true,
      throat: false
    }
  ];

  const handleApplySample = (sample) => {
    setNarrativeText(sample.text);
    setTemperatureF(sample.temp);
    setFeverDays(sample.days);
    setCoughType(sample.cough);
    setHasDysuria(sample.dysuria);
    setHasSoreThroat(sample.throat);
    setTriageResult(null);
  };

  // Active adherence prescription
  const activeAdherenceRx = patientPrescriptions.find(
    (rx) => rx.status === 'DISPENSED' && rx.adherenceCourse
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Patient Persona Switcher & Clinical Bar */}
      <section className="clinical-card p-4 sm:p-5 bg-white border border-[#141817]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#CFD2CE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5A605D] uppercase tracking-wider mb-1">
              <span>PORTAL 01</span>
              <span>•</span>
              <span className="font-bold text-[#0F6B53]">PATIENT CLINICAL PERSPECTIVE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-[#141817]">
              {language === 'bn' ? activePatient.nameBn : activePatient.name}
            </h1>
            <p className="text-xs text-[#5A605D] mt-0.5">
              ID: <span className="font-mono font-bold text-[#141817]">{activePatient.id}</span> | {activePatient.age} yrs, {activePatient.gender} | {activePatient.location} | Phone: {activePatient.phone}
            </p>
          </div>

          {/* Quick Patient Switcher */}
          <div className="flex items-center gap-2">
            <label htmlFor="patient-select" className="text-xs font-semibold text-[#5A605D] whitespace-nowrap">
              Switch Test Case:
            </label>
            <select
              id="patient-select"
              value={activePatientId}
              onChange={(e) => {
                setActivePatientId(e.target.value);
                setTriageResult(null);
              }}
              className="clinical-input text-xs font-semibold bg-[#F4F3EF] border-[#141817]"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age}y, {p.location})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clinical Snapshot Tags (Allergies, eGFR, Vitals) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
          <div className="p-2.5 rounded bg-[#F4F3EF] border border-[#CFD2CE]">
            <span className="text-[10px] font-mono uppercase text-[#5A605D] block">DOCUMENTED ALLERGIES</span>
            <span className="font-bold text-[#C84B24] truncate block mt-0.5">
              {activePatient.allergies.join(', ')}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#F4F3EF] border border-[#CFD2CE]">
            <span className="text-[10px] font-mono uppercase text-[#5A605D] block">RENAL FUNCTION (eGFR)</span>
            <span className="font-mono font-bold text-[#141817] block mt-0.5">
              {activePatient.vitals.eGFR} mL/min
              {activePatient.vitals.eGFR < 50 && (
                <span className="text-[#C84B24] text-[10px] ml-1 font-bold">(Impaired)</span>
              )}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#F4F3EF] border border-[#CFD2CE]">
            <span className="text-[10px] font-mono uppercase text-[#5A605D] block">BASELINE VITALS</span>
            <span className="font-mono font-medium text-[#141817] block mt-0.5">
              BP: {activePatient.vitals.bp} | HR: {activePatient.vitals.pulse} bpm
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#F4F3EF] border border-[#CFD2CE]">
            <span className="text-[10px] font-mono uppercase text-[#5A605D] block">CHRONIC CONDITIONS</span>
            <span className="font-medium text-[#141817] truncate block mt-0.5">
              {activePatient.chronicConditions.join(', ')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Triage Engine on Left, Prescriptions & Adherence on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Feature 1 - Hybrid AI Symptom Checker & Red-Flag Triage Engine */}
        <div className="lg:col-span-7 space-y-6">
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#0F6B53]" />
                <div>
                  <h2 className="font-headline font-bold text-base text-[#141817]">
                    {language === 'bn' ? 'হাইব্রিড এআই ট্রায়াজ ও রেড-ফ্ল্যাগ ইঞ্জিন' : 'Hybrid AI Triage & Red-Flag Engine'}
                  </h2>
                  <p className="text-[11px] font-mono text-[#5A605D]">
                    Grounded in Ghosh et al., 2026 (AAAI/PMLR 317)
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E6F3EE] text-[#0F6B53] border border-[#0F6B53] rounded font-bold">
                WHO PROTOCOL
              </span>
            </div>

            {/* Quick Sample Presets */}
            <div className="mb-4 p-2.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
              <span className="text-[11px] font-bold text-[#5A605D] block mb-1.5">
                Load Test Symptom Scenario:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySample(s)}
                    className="text-[11px] font-medium px-2 py-1 bg-white border border-[#141817] rounded hover:bg-[#E8E6DF] shadow-[1px_1px_0px_#141817] transition-all"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRunTriage} className="space-y-4">
              {/* Structured Clinical Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
                    Fever Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={feverDays}
                    onChange={(e) => setFeverDays(e.target.value)}
                    className="clinical-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
                    Body Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="96"
                    max="108"
                    value={temperatureF}
                    onChange={(e) => setTemperatureF(e.target.value)}
                    className="clinical-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
                    Cough Presentation
                  </label>
                  <select
                    value={coughType}
                    onChange={(e) => setCoughType(e.target.value)}
                    className="clinical-input w-full"
                  >
                    <option value="none">No Cough</option>
                    <option value="dry">Dry / Non-productive</option>
                    <option value="productive">Productive (Purulent Sputum)</option>
                    <option value="hemoptysis">Hemoptysis (Bloody Sputum)</option>
                  </select>
                </div>
              </div>

              {/* Toggles: Sore throat & Dysuria */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded border border-[#CFD2CE] bg-[#F4F3EF] cursor-pointer hover:border-[#141817]">
                  <input
                    type="checkbox"
                    checked={hasSoreThroat}
                    onChange={(e) => setHasSoreThroat(e.target.checked)}
                    className="w-4 h-4 accent-[#0F6B53]"
                  />
                  <span className="text-xs font-medium text-[#141817]">
                    Severe Sore Throat / Pharyngitis
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded border border-[#CFD2CE] bg-[#F4F3EF] cursor-pointer hover:border-[#141817]">
                  <input
                    type="checkbox"
                    checked={hasDysuria}
                    onChange={(e) => setHasDysuria(e.target.checked)}
                    className="w-4 h-4 accent-[#0F6B53]"
                  />
                  <span className="text-xs font-medium text-[#141817]">
                    Dysuria (Urinary Burning / Pain)
                  </span>
                </label>
              </div>

              {/* Narrative Input in Bangla & English */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
                  Narrative Clinical Symptoms (Bangla or English)
                </label>
                <textarea
                  rows="3"
                  value={narrativeText}
                  onChange={(e) => setNarrativeText(e.target.value)}
                  placeholder="বর্ণনা লিখুন (যেমন: গত ৩ দিন ধরে জ্বর ও গলা ব্যথা, কফে হলুদ শ্লেষ্মা আসছে...)"
                  className="clinical-input w-full font-['Hind_Siliguri','Plus_Jakarta_Sans',sans-serif] text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingTriage}
                className="clinical-btn clinical-btn-primary w-full py-2.5 text-sm"
              >
                <Activity className="w-4 h-4" />
                <span>Evaluate Clinical Triage & Red-Flag Gates</span>
              </button>
            </form>

            {/* Deterministic + AI Verdict Display */}
            {triageResult && (
              <div
                className={`mt-5 p-4 rounded border ${
                  triageResult.tier === 'RED'
                    ? 'bg-[#FAECE7] border-[#C84B24]'
                    : triageResult.tier === 'AMBER'
                    ? 'bg-[#FEF3C7] border-[#B45309]'
                    : 'bg-[#E6F3EE] border-[#0F6B53]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {triageResult.tier === 'RED' ? (
                      <ShieldAlert className="w-5 h-5 text-[#C84B24]" />
                    ) : triageResult.tier === 'AMBER' ? (
                      <AlertTriangle className="w-5 h-5 text-[#B45309]" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-[#0F6B53]" />
                    )}
                    <div>
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase block">
                        TRIAGE TIER {triageResult.tier}
                      </span>
                      <h3 className="font-headline font-bold text-sm text-[#141817]">
                        {language === 'bn' ? triageResult.labelBn : triageResult.label}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#141817]">
                    Score: {triageResult.severityScore}/100
                  </span>
                </div>

                <p className="text-xs text-[#141817] mt-2.5 font-medium leading-relaxed">
                  {triageResult.clinicalJustification}
                </p>

                {/* Specific Protocol Actions */}
                {triageResult.tier === 'AMBER' && (
                  <div className="mt-3 pt-3 border-t border-[#B45309]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#B45309]">
                      OTC Antibiotic Prohibited. Physician Teleconsult Required.
                    </span>
                    <button
                      onClick={() => setActivePortal('doctor')}
                      className="clinical-btn clinical-btn-primary text-xs py-1.5 px-3 bg-[#B45309] border-[#78350F]"
                    >
                      <span>Open Doctor Tele-Queue</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {triageResult.tier === 'RED' && (
                  <div className="mt-3 pt-3 border-t border-[#C84B24]/30 space-y-1 text-xs">
                    <span className="font-bold text-[#C84B24] block">
                      CRITICAL EMERGENCY: Do not administer oral antibiotics.
                    </span>
                    <span className="text-[#141817] block">
                      Emergency Hotline: {triageResult.protocol.emergencyHotline} (Direct Ambulance Dispatch).
                    </span>
                  </div>
                )}

                {triageResult.tier === 'GREEN' && (
                  <div className="mt-3 pt-3 border-t border-[#0F6B53]/30 space-y-2">
                    <span className="text-xs font-bold text-[#0F6B53] block">
                      Non-Antibiotic Symptomatic Relief Regimen:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {triageResult.protocol.suggestedRegimen?.map((item, i) => (
                        <li key={i} className="p-2 bg-white rounded border border-[#0F6B53]/30">
                          <span className="font-bold text-[#141817] block">{item.item}</span>
                          <span className="text-[11px] text-[#5A605D]">{item.instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Feature 4: Nearby Community Pharmacy Price & Inventory Comparison */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0F6B53]" />
                <h2 className="font-headline font-bold text-base text-[#141817]">
                  Community Pharmacy Network & Live Inventory
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#5A605D]">Khulna District Grid</span>
            </div>

            <div className="space-y-3">
              {pharmacies.map((pharm) => (
                <div
                  key={pharm.id}
                  className="p-3 bg-[#F4F3EF] border border-[#CFD2CE] rounded hover:border-[#141817] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#141817]">
                        {language === 'bn' ? pharm.nameBn : pharm.name}
                      </h4>
                      <p className="text-xs text-[#5A605D]">
                        {pharm.address} • <span className="font-mono font-bold text-[#0F6B53]">{pharm.distanceKm} km away</span>
                      </p>
                      <p className="text-[11px] text-[#5A605D] mt-0.5">
                        Pharmacist: {pharm.pharmacistInCharge} (Lic: {pharm.licenseNo})
                      </p>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E6F3EE] text-[#0F6B53] font-bold border border-[#0F6B53] rounded">
                      TELE-NODE ACTIVE
                    </span>
                  </div>

                  {/* Stock list preview */}
                  <div className="mt-2 pt-2 border-t border-[#CFD2CE] flex flex-wrap gap-2 text-[11px]">
                    {pharm.inventory.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-[#CFD2CE] rounded font-mono">
                        {item.drug}: <strong className="text-[#141817]">৳{item.unitPriceBdt.toFixed(2)}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Active Prescriptions & Feature 5 Adherence Tracker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Prescriptions Tray */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#0F6B53]" />
                <h2 className="font-headline font-bold text-base text-[#141817]">
                  Active Prescriptions & Tokens
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#0F6B53]">
                {patientPrescriptions.length} Active
              </span>
            </div>

            {patientPrescriptions.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#5A605D] bg-[#F4F3EF] rounded border border-dashed border-[#CFD2CE]">
                No active prescriptions recorded for this patient. Run triage to initiate tele-consultation.
              </div>
            ) : (
              <div className="space-y-4">
                {patientPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-3.5 bg-[#F4F3EF] border border-[#141817] rounded shadow-[2px_2px_0px_#141817]"
                  >
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#CFD2CE]">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#141817] block">
                          {rx.id}
                        </span>
                        <span className="text-[11px] text-[#5A605D]">
                          By {rx.doctorName} • {rx.date}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        rx.status === 'DISPENSED'
                          ? 'bg-[#E6F3EE] text-[#0F6B53] border-[#0F6B53]'
                          : rx.status === 'DTP_FLAGGED'
                          ? 'bg-[#FAECE7] text-[#C84B24] border-[#C84B24]'
                          : 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                      }`}>
                        {rx.status}
                      </span>
                    </div>

                    <div className="my-2.5 space-y-1.5">
                      <span className="text-xs font-bold text-[#141817] block">
                        Diagnosis: {rx.diagnosis}
                      </span>
                      {rx.medications.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-white rounded border border-[#CFD2CE]">
                          <div>
                            <span className="font-semibold text-[#141817]">{m.name}</span>
                            <span className="text-[11px] text-[#5A605D] block">{m.dosage}</span>
                          </div>
                          <AwareBadge classification={m.awareClass} size="compact" />
                        </div>
                      ))}
                    </div>

                    {/* QR Code preview */}
                    <div className="mt-3 pt-2 border-t border-[#CFD2CE] flex items-center justify-between gap-3">
                      <div className="text-[11px] text-[#5A605D] font-mono">
                        Hash: {rx.hash?.slice(0, 12)}...
                      </div>
                      <RxQrCode token={rx.id} hash={rx.hash} payload={rx.qrPayload} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Feature 5: Day-3 / Day-5 Antibiotic Course Adherence Tracker */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0F6B53]" />
                <div>
                  <h2 className="font-headline font-bold text-base text-[#141817]">
                    Antibiotic Course Adherence Tracker
                  </h2>
                  <p className="text-[11px] font-mono text-[#5A605D]">
                    Grounded in Alshahrani et al., 2026 (JMDH 19:576)
                  </p>
                </div>
              </div>
            </div>

            {activeAdherenceRx ? (
              <div className="space-y-4">
                <div className="p-3 bg-[#E6F3EE] border border-[#0F6B53] rounded">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#0F6B53]">
                      Day {activeAdherenceRx.adherenceCourse.currentDay} of {activeAdherenceRx.adherenceCourse.totalDays}
                    </span>
                    <span className="font-mono font-bold text-[#141817]">
                      {activeAdherenceRx.adherenceCourse.dosesTaken} / {activeAdherenceRx.adherenceCourse.totalDoses} Doses
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#0F6B53]/30">
                    <div
                      className="bg-[#0F6B53] h-full transition-all duration-300"
                      style={{
                        width: `${(activeAdherenceRx.adherenceCourse.dosesTaken / activeAdherenceRx.adherenceCourse.totalDoses) * 100}%`
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-[#141817] mt-2 font-semibold">
                    Prescribed: {activeAdherenceRx.medications[0]?.name}
                  </p>
                </div>

                {/* Log Dose Button */}
                <button
                  type="button"
                  onClick={() => logAdherenceDose(activeAdherenceRx.id)}
                  disabled={activeAdherenceRx.adherenceCourse.dosesTaken >= activeAdherenceRx.adherenceCourse.totalDoses}
                  className="clinical-btn clinical-btn-primary w-full text-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Log Next Scheduled Dose (Synchronize Telemetry)</span>
                </button>

                {/* Clinical AMR Warning Callout */}
                <div className="p-3 bg-[#FAECE7] border border-[#C84B24] rounded text-xs space-y-1">
                  <span className="font-bold text-[#C84B24] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> CRITICAL STEWARDSHIP WARNING
                  </span>
                  <p className="text-[#141817] text-[11px] leading-relaxed">
                    Stopping antibiotic treatment prematurely upon feeling symptom relief allows surviving mutant bacteria to develop antimicrobial resistance (AMR). Complete the full 5-day cycle.
                  </p>
                </div>

                {/* Report Adverse Drug Reaction (ADR) */}
                <div className="pt-3 border-t border-[#CFD2CE]">
                  <span className="text-xs font-bold text-[#141817] block mb-1">
                    Report Adverse Reaction (ADR) to Pharmacist:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adrInput}
                      onChange={(e) => setAdrInput(e.target.value)}
                      placeholder="e.g. Mild nausea, rash, abdominal cramps"
                      className="clinical-input flex-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!adrInput) return;
                        reportAdverseReaction(activeAdherenceRx.id, adrInput);
                        setAdrInput('');
                        setAdrSubmitted(true);
                        setTimeout(() => setAdrSubmitted(false), 3000);
                      }}
                      className="clinical-btn clinical-btn-secondary text-xs px-3"
                    >
                      Report
                    </button>
                  </div>
                  {adrSubmitted && (
                    <span className="text-[11px] text-[#0F6B53] font-bold mt-1 block">
                      ✓ Adverse reaction logged & transmitted to Pharmacist & Physician console.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#5A605D] bg-[#F4F3EF] rounded border border-[#CFD2CE]">
                No active dispensed antibiotic regimen currently under tracking. Prescriptions dispensed at the community pharmacy automatically trigger this tracker.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
