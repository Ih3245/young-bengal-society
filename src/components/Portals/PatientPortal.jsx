import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
import { PrescriptionPrintModal } from '../Common/PrescriptionPrintModal';
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
  Check,
  Download,
  Printer,
  Sparkles
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

  // Modal for Viewing and Downloading Full Prescription
  const [selectedRxForPrint, setSelectedRxForPrint] = useState(null);

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
      {/* Top Patient Header Bar */}
      <section className="clinical-card p-5 sm:p-6 bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>PORTAL 01 • PATIENT CLINICAL PERSPECTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {language === 'bn' ? activePatient.nameBn : activePatient.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Patient ID: <span className="font-mono font-bold text-slate-800">{activePatient.id}</span> • {activePatient.age} yrs, {activePatient.gender} • {activePatient.location} • Phone: {activePatient.phone}
            </p>
          </div>

          {/* Quick Patient Switcher */}
          <div className="flex items-center gap-2">
            <label htmlFor="patient-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Switch Patient Profile:
            </label>
            <select
              id="patient-select"
              value={activePatientId}
              onChange={(e) => {
                setActivePatientId(e.target.value);
                setTriageResult(null);
              }}
              className="clinical-input text-xs font-semibold bg-slate-50 border-slate-300"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age}y, {p.location})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clinical Snapshot Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">DOCUMENTED ALLERGIES</span>
            <span className="font-bold text-rose-600 truncate block mt-0.5">
              {activePatient.allergies.join(', ')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">RENAL FUNCTION (eGFR)</span>
            <span className="font-mono font-bold text-slate-900 block mt-0.5">
              {activePatient.vitals.eGFR} mL/min
              {activePatient.vitals.eGFR < 50 && (
                <span className="text-rose-600 text-[10px] ml-1 font-bold">(Impaired)</span>
              )}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">BASELINE VITALS</span>
            <span className="font-mono font-medium text-slate-800 block mt-0.5">
              BP: {activePatient.vitals.bp} | HR: {activePatient.vitals.pulse} bpm
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">CHRONIC CONDITIONS</span>
            <span className="font-medium text-slate-800 truncate block mt-0.5">
              {activePatient.chronicConditions.join(', ')}
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Triage Engine on Left, Prescriptions & Adherence on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Feature 1 - Hybrid AI Symptom Checker */}
        <div className="lg:col-span-7 space-y-6">
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    {language === 'bn' ? 'হাইব্রিড এআই ট্রায়াজ ও রেড-ফ্ল্যাগ ইঞ্জিন' : 'Hybrid AI Triage & Red-Flag Engine'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Grounded in Ghosh et al., 2026 (PMLR 317)
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg">
                WHO PROTOCOL
              </span>
            </div>

            {/* Quick Test Scenarios */}
            <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 block mb-2">
                Quick Test Symptom Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySample(s)}
                    className="text-xs font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-teal-500 hover:text-teal-700 shadow-2xs transition-all"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={hasSoreThroat}
                    onChange={(e) => setHasSoreThroat(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 rounded"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Severe Sore Throat / Pharyngitis
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={hasDysuria}
                    onChange={(e) => setHasDysuria(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 rounded"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Dysuria (Urinary Burning / Pain)
                  </span>
                </label>
              </div>

              {/* Narrative Input in Bangla & English */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Narrative Clinical Symptoms (Bangla or English)
                </label>
                <textarea
                  rows="3"
                  value={narrativeText}
                  onChange={(e) => setNarrativeText(e.target.value)}
                  placeholder="বর্ণনা লিখুন (যেমন: গত ৩ দিন ধরে জ্বর ও গলা ব্যথা, কফে হলুদ শ্লেষ্মা আসছে...)"
                  className="clinical-input w-full text-sm leading-relaxed"
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

            {/* Verdict Display */}
            {triageResult && (
              <div
                className={`mt-6 p-4 rounded-xl border ${
                  triageResult.tier === 'RED'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : triageResult.tier === 'AMBER'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-teal-50 border-teal-200 text-teal-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {triageResult.tier === 'RED' ? (
                      <ShieldAlert className="w-6 h-6 text-rose-600" />
                    ) : triageResult.tier === 'AMBER' ? (
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-teal-600" />
                    )}
                    <div>
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase block opacity-80">
                        TRIAGE TIER {triageResult.tier}
                      </span>
                      <h3 className="font-bold text-sm">
                        {language === 'bn' ? triageResult.labelBn : triageResult.label}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white shadow-2xs border border-slate-200">
                    Score: {triageResult.severityScore}/100
                  </span>
                </div>

                <p className="text-xs mt-2.5 leading-relaxed font-medium">
                  {triageResult.clinicalJustification}
                </p>

                {/* Amber Action */}
                {triageResult.tier === 'AMBER' && (
                  <div className="mt-3.5 pt-3 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-900">
                      OTC Antibiotic Prohibited. Physician Teleconsult Required.
                    </span>
                    <button
                      onClick={() => setActivePortal('doctor')}
                      className="clinical-btn clinical-btn-primary text-xs py-1.5 px-3 bg-amber-600 hover:bg-amber-700 border-amber-700"
                    >
                      <span>Open Doctor Tele-Queue</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Red Action */}
                {triageResult.tier === 'RED' && (
                  <div className="mt-3.5 pt-3 border-t border-rose-200/80 space-y-1 text-xs">
                    <span className="font-bold text-rose-700 block">
                      CRITICAL EMERGENCY: Do not administer oral antibiotics.
                    </span>
                    <span className="block">
                      Emergency Hotline: {triageResult.protocol.emergencyHotline} (Direct Ambulance Dispatch).
                    </span>
                  </div>
                )}

                {/* Green Action */}
                {triageResult.tier === 'GREEN' && (
                  <div className="mt-3.5 pt-3 border-t border-teal-200/80 space-y-2">
                    <span className="text-xs font-bold text-teal-800 block">
                      Non-Antibiotic Symptomatic Relief Protocol:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {triageResult.protocol.suggestedRegimen?.map((item, i) => (
                        <li key={i} className="p-2.5 bg-white rounded-lg border border-teal-200 shadow-2xs">
                          <span className="font-bold text-slate-900 block">{item.item}</span>
                          <span className="text-[11px] text-slate-500">{item.instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Feature 4: Nearby Community Pharmacy Price & Inventory Comparison */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Community Pharmacy Network & Live Inventory
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">Khulna District Grid</span>
            </div>

            <div className="space-y-3">
              {pharmacies.map((pharm) => (
                <div
                  key={pharm.id}
                  className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {language === 'bn' ? pharm.nameBn : pharm.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {pharm.address} • <span className="font-bold text-teal-700">{pharm.distanceKm} km away</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pharmacist: {pharm.pharmacistInCharge} (Lic: {pharm.licenseNo})
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-teal-100 text-teal-800 rounded-md">
                      TELE-NODE ACTIVE
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap gap-2 text-[11px]">
                    {pharm.inventory.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md font-mono text-slate-700">
                        {item.drug}: <strong className="text-slate-900">৳{item.unitPriceBdt.toFixed(2)}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Active Prescriptions with Download Button & Adherence */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Prescriptions Tray with Download Button */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Pill className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Active Prescriptions
                </h2>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md">
                {patientPrescriptions.length} Active
              </span>
            </div>

            {patientPrescriptions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No active prescriptions recorded for this patient. Run triage to initiate tele-consultation.
              </div>
            ) : (
              <div className="space-y-4">
                {patientPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl hover:border-slate-300 shadow-2xs transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-900 block">
                          {rx.id}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          By {rx.doctorName} • {rx.date}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                        rx.status === 'DISPENSED'
                          ? 'bg-teal-50 text-teal-700 border-teal-200'
                          : rx.status === 'DTP_FLAGGED'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {rx.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800 block">
                        Diagnosis: {rx.diagnosis}
                      </span>
                      {rx.medications.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                          <div>
                            <span className="font-semibold text-slate-900 block">{m.name}</span>
                            <span className="text-[11px] text-slate-500">{m.dosage}</span>
                          </div>
                          <AwareBadge classification={m.awareClass} size="compact" />
                        </div>
                      ))}
                    </div>

                    {/* PROMINENT DOWNLOAD & PRINT OFFICIAL PRESCRIPTION BUTTON */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRxForPrint(rx)}
                        className="clinical-btn clinical-btn-primary w-full py-2 text-xs flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download & Print Official Rx (PDF)</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Token Hash: {rx.hash?.slice(0, 10)}...</span>
                      <span className="text-teal-700 font-bold">Verified QR</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Feature 5: Day-3 / Day-5 Antibiotic Course Adherence Tracker */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Antibiotic Course Adherence
                  </h2>
                  <p className="text-xs text-slate-500">
                    Grounded in Alshahrani et al., 2026
                  </p>
                </div>
              </div>
            </div>

            {activeAdherenceRx ? (
              <div className="space-y-4">
                <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-teal-900">
                      Day {activeAdherenceRx.adherenceCourse.currentDay} of {activeAdherenceRx.adherenceCourse.totalDays}
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {activeAdherenceRx.adherenceCourse.dosesTaken} / {activeAdherenceRx.adherenceCourse.totalDoses} Doses
                    </span>
                  </div>

                  {/* Modern Sleek Progress Bar */}
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-teal-200">
                    <div
                      className="bg-teal-600 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(activeAdherenceRx.adherenceCourse.dosesTaken / activeAdherenceRx.adherenceCourse.totalDoses) * 100}%`
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-700 mt-2 font-semibold">
                    Current Course: {activeAdherenceRx.medications[0]?.name}
                  </p>
                </div>

                {/* Log Dose Button */}
                <button
                  type="button"
                  onClick={() => logAdherenceDose(activeAdherenceRx.id)}
                  disabled={activeAdherenceRx.adherenceCourse.dosesTaken >= activeAdherenceRx.adherenceCourse.totalDoses}
                  className="clinical-btn clinical-btn-primary w-full text-xs py-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Log Next Scheduled Dose</span>
                </button>

                {/* Warning Card */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Complete Full Antibiotic Cycle
                  </span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Stopping antibiotics early because you feel better leaves resistant bacteria alive, causing recurrent infections and AMR.
                  </p>
                </div>

                {/* Report ADR */}
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">
                    Report Adverse Drug Reaction (ADR):
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adrInput}
                      onChange={(e) => setAdrInput(e.target.value)}
                      placeholder="e.g. Mild nausea, rash, cramps"
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
                    <span className="text-[11px] text-teal-700 font-bold mt-1.5 block">
                      ✓ Adverse reaction logged & alert sent to Doctor and Pharmacist.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-5 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                No active dispensed antibiotic regimen currently under tracking. Prescriptions dispensed at the community pharmacy automatically trigger this tracker.
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Official Prescription Download & Print Modal */}
      {selectedRxForPrint && (
        <PrescriptionPrintModal
          prescription={selectedRxForPrint}
          patient={activePatient}
          onClose={() => setSelectedRxForPrint(null)}
        />
      )}
    </div>
  );
};
