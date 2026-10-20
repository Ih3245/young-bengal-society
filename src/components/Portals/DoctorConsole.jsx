import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
import { PrescriptionPrintModal } from '../Common/PrescriptionPrintModal';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ShieldCheck,
  User,
  Plus,
  FileText,
  Activity,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Printer,
  Download
} from 'lucide-react';

export const DoctorConsole = () => {
  const {
    language,
    patients,
    activePatientId,
    setActivePatientId,
    activePatient,
    prescriptions,
    triageQueue,
    whoAwareDb,
    issuePrescription,
    resolveDtp,
    evaluateClinicalSafety
  } = useClinical();

  // State for active e-prescription drafting
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('Acute Bacterial Sinusitis');
  const [selectedDrug, setSelectedDrug] = useState('Amoxicillin 500mg');
  const [dosageText, setDosageText] = useState('1 Capsule 3 times daily (every 8h) after meals');
  const [durationDays, setDurationDays] = useState(5);
  const [clinicalNotes, setClinicalNotes] = useState('First-line antimicrobial regimen per WHO AWaRe guidelines.');
  const [selectedTriageId, setSelectedTriageId] = useState(null);

  // Modal state for viewing & printing prescription
  const [selectedRxForPrint, setSelectedRxForPrint] = useState(null);

  // Pending triage consults
  const pendingTriageCases = triageQueue.filter(
    (t) => t.status === 'PENDING_DOCTOR_CONSULT'
  );

  // Pending DTP flagged prescriptions
  const flaggedDtpPrescriptions = prescriptions.filter(
    (rx) => rx.status === 'DTP_FLAGGED'
  );

  // Check real-time CDS safety for drafted med against active patient
  const draftedMed = {
    name: selectedDrug,
    generic: whoAwareDb[selectedDrug]?.generic || selectedDrug,
    awareClass: whoAwareDb[selectedDrug]?.class || 'ACCESS'
  };

  const activeCdsAlerts = evaluateClinicalSafety({
    patient: activePatient,
    prescribedMeds: [draftedMed]
  });

  const handleSelectTriage = (triageCase) => {
    setSelectedTriageId(triageCase.id);
    setActivePatientId(triageCase.patientId);

    if (triageCase.narrative.toLowerCase().includes('cough') || triageCase.narrative.toLowerCase().includes('কাশি')) {
      setSelectedDiagnosis('Acute Bacterial Pharyngitis / Sinusitis');
      setSelectedDrug('Cefixime 200mg');
    } else if (triageCase.narrative.toLowerCase().includes('burning') || triageCase.narrative.toLowerCase().includes('জ্বালা')) {
      setSelectedDiagnosis('Complicated Urinary Tract Infection');
      setSelectedDrug('Ciprofloxacin 500mg');
    }
  };

  const handleIssueRx = (e) => {
    e.preventDefault();

    const medObj = {
      name: selectedDrug,
      generic: whoAwareDb[selectedDrug]?.generic || selectedDrug,
      strength: selectedDrug.split(' ')[1] || '500mg',
      awareClass: whoAwareDb[selectedDrug]?.class || 'ACCESS',
      dosage: dosageText,
      duration: `${durationDays} days`,
      quantity: durationDays * 2,
      instructions: `Complete full ${durationDays}-day course.`
    };

    const newIssuedRx = issuePrescription({
      patientId: activePatient.id,
      patientName: activePatient.name,
      diagnosis: selectedDiagnosis,
      medications: [medObj],
      clinicalNotes,
      originatingTriageId: selectedTriageId
    });

    setSelectedTriageId(null);
    setClinicalNotes('');
    // Automatically open the print modal for immediate review/download
    setSelectedRxForPrint(newIssuedRx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Doctor Header & Active Physician Credentials */}
      <section className="clinical-card p-5 sm:p-6 bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-0.5">
                <span>PORTAL 02 • PHYSICIAN TELEMEDICINE WORKBENCH</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Dr. Anisur Rahman, MBBS, FCPS
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                BMDC Reg: <span className="font-mono font-bold text-slate-800">#A-48291</span> • Khulna Medical College & Hospital • Tele-Triage Desk 04
              </p>
            </div>
          </div>

          {/* Real-time Queue Counters */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{pendingTriageCases.length} Pending Consults</span>
            </div>

            {flaggedDtpPrescriptions.length > 0 && (
              <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold text-rose-700 flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{flaggedDtpPrescriptions.length} DTP Alerts</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Queue & DTP Desk */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pharmacist DTP Resolution Desk */}
          {flaggedDtpPrescriptions.length > 0 && (
            <section className="clinical-card p-5 bg-rose-50/50 border border-rose-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200/80 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h2 className="font-bold text-base text-rose-900">
                    Pharmacist DTP Alerts ({flaggedDtpPrescriptions.length})
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-rose-600 text-white rounded-md">
                  ACTION REQUIRED
                </span>
              </div>

              <div className="space-y-3">
                {flaggedDtpPrescriptions.map((rx) => (
                  <div key={rx.id} className="p-3.5 bg-white border border-rose-200 rounded-xl text-xs space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900">{rx.id}</span>
                      <span className="font-semibold text-slate-600">{rx.patientName}</span>
                    </div>

                    <div className="p-2.5 bg-rose-50/60 rounded-lg text-slate-800">
                      <span className="font-bold text-rose-700 block mb-0.5">
                        {rx.dtpAlert?.type || 'DRUG_THERAPY_PROBLEM'}:
                      </span>
                      <p className="leading-relaxed">{rx.dtpAlert?.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">
                        Flagged by: {rx.dtpAlert?.flaggedBy}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          resolveDtp(
                            rx.id,
                            'UPDATE_MED',
                            { dosage: '250mg BID (Adjusted for eGFR 38 mL/min)' },
                            'Approved renal dose titration per clinical pharmacist recommendation.'
                          );
                        }}
                        className="clinical-btn clinical-btn-primary flex-1 py-1.5 text-xs bg-teal-600 hover:bg-teal-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Dose Titration (250mg BID)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const note = prompt('Enter clinical justification for overriding DTP alert:');
                          if (note) {
                            resolveDtp(rx.id, 'OVERRIDE_CLINICAL_JUSTIFICATION', null, note);
                          }
                        }}
                        className="clinical-btn clinical-btn-secondary text-xs px-3"
                      >
                        Override
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tele-Triage Consult Queue */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Incoming Tele-Triage Queue
                </h2>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                {pendingTriageCases.length} Waiting
              </span>
            </div>

            {pendingTriageCases.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Tele-triage queue is clear. Cases referred from Patient Portal or Pharmacy Counter will appear here live.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingTriageCases.map((tc) => (
                  <div
                    key={tc.id}
                    onClick={() => handleSelectTriage(tc)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTriageId === tc.id
                        ? 'bg-teal-50/70 border-teal-500 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{tc.patientName}</span>
                          <span className="text-xs text-slate-500">({tc.patientAge || 34} yrs)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Source: {tc.source}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                        tc.tier === 'RED'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        TIER {tc.tier}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 mt-2 font-medium line-clamp-2">
                      "{tc.narrative}"
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Temp: {tc.vitals?.temp} | BP: {tc.vitals?.bp}</span>
                      <span className="text-teal-700 font-bold flex items-center gap-1">
                        Review & Issue Rx <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Shared Longitudinal Patient EHR Snapshot */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Shared Longitudinal EHR Snapshot
                </h2>
              </div>
              <span className="text-[10px] font-semibold text-teal-700 px-2 py-0.5 bg-teal-50 rounded-md">
                EHR SYNC ACTIVE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">PATIENT RECORD</span>
                <span className="font-bold text-sm text-slate-900 block mt-0.5">
                  {activePatient.name} ({activePatient.id})
                </span>
                <p className="text-slate-600 mt-1">{activePatient.caseSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">ALLERGIES</span>
                  <span className="font-bold text-rose-600 block mt-0.5">
                    {activePatient.allergies.join(', ')}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">RENAL FUNCTION</span>
                  <span className="font-mono font-bold text-slate-900 block mt-0.5">
                    eGFR: {activePatient.vitals.eGFR} mL/min
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">CURRENT ACTIVE MEDICATIONS</span>
                <span className="font-medium text-slate-800 block mt-0.5">
                  {activePatient.activeMeds.join(', ')}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Closed-Loop e-Prescription Console */}
        <div className="lg:col-span-7 space-y-6">
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Closed-Loop Digital e-Prescription Console
                  </h2>
                  <p className="text-xs text-slate-500">
                    Grounded in Klimentidis et al., 2026 & Ghosh et al., 2026
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-teal-700 px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg">
                DGDA COMPLIANT
              </span>
            </div>

            {/* CDS Hard Alert Box */}
            {activeCdsAlerts.length > 0 && (
              <div className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-xs uppercase text-rose-700 tracking-wider">
                    CLINICAL DECISION SUPPORT (CDS) HARD ALERT
                  </span>
                </div>

                {activeCdsAlerts.map((alert, idx) => (
                  <div key={idx} className="text-xs text-slate-800 pl-7 space-y-1">
                    <strong className="text-rose-700 block">{alert.title}</strong>
                    <p className="leading-relaxed">{alert.message}</p>
                    <p className="text-[11px] font-semibold text-teal-800">
                      Action: {alert.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleIssueRx} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Prescription Recipient
                  </label>
                  <select
                    value={activePatientId}
                    onChange={(e) => setActivePatientId(e.target.value)}
                    className="clinical-input w-full font-semibold"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.age}y, {p.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Clinical Diagnosis
                  </label>
                  <input
                    type="text"
                    value={selectedDiagnosis}
                    onChange={(e) => setSelectedDiagnosis(e.target.value)}
                    className="clinical-input w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Antimicrobial Agent (WHO AWaRe Classification)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    value={selectedDrug}
                    onChange={(e) => setSelectedDrug(e.target.value)}
                    className="clinical-input sm:col-span-2 font-mono text-xs font-bold"
                  >
                    <optgroup label="WHO ACCESS CLASS (First-Line / Rational)">
                      <option value="Amoxicillin 500mg">Amoxicillin 500mg Cap (Access)</option>
                      <option value="Cephalexin 500mg">Cephalexin 500mg Cap (Access)</option>
                      <option value="Doxycycline 100mg">Doxycycline 100mg Cap (Access)</option>
                      <option value="Metronidazole 400mg">Metronidazole 400mg Tab (Access)</option>
                      <option value="Nitrofurantoin 100mg SR">Nitrofurantoin 100mg SR (Access)</option>
                    </optgroup>
                    <optgroup label="WHO WATCH CLASS (Restricted Stewardship)">
                      <option value="Cefixime 200mg">Cefixime 200mg Tab (Watch)</option>
                      <option value="Ciprofloxacin 500mg">Ciprofloxacin 500mg Tab (Watch)</option>
                      <option value="Azithromycin 500mg">Azithromycin 500mg Tab (Watch)</option>
                      <option value="Levofloxacin 500mg">Levofloxacin 500mg Tab (Watch)</option>
                    </optgroup>
                    <optgroup label="WHO RESERVE CLASS (Hospital-Only Pan-Drug)">
                      <option value="Meropenem 1g IV">Meropenem 1g IV (Reserve - Restricted)</option>
                      <option value="Linezolid 600mg">Linezolid 600mg Tab (Reserve - Restricted)</option>
                    </optgroup>
                  </select>

                  <div className="flex items-center justify-center">
                    <AwareBadge classification={whoAwareDb[selectedDrug]?.class} />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-1.5">
                  {whoAwareDb[selectedDrug]?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Structured Dosage & Frequency
                  </label>
                  <input
                    type="text"
                    value={dosageText}
                    onChange={(e) => setDosageText(e.target.value)}
                    className="clinical-input w-full text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course Duration
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="clinical-input w-full text-xs font-bold"
                  >
                    <option value={3}>3 Days Course</option>
                    <option value={5}>5 Days Course (Standard)</option>
                    <option value={7}>7 Days Course</option>
                    <option value={10}>10 Days Course</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Physician Clinical Justification & Counseling Notes
                </label>
                <textarea
                  rows="2"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="clinical-input w-full text-xs"
                  placeholder="Record antimicrobial justification, culture status, or patient counseling..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={activeCdsAlerts.some(a => a.severity === 'CRITICAL')}
                  className="clinical-btn clinical-btn-primary w-full py-2.5 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Digitally Sign, Issue e-Prescription & View Print Slip
                  </span>
                </button>

                {activeCdsAlerts.some(a => a.severity === 'CRITICAL') && (
                  <p className="text-[11px] font-bold text-rose-600 text-center mt-1.5">
                    Issuance blocked by critical CDS allergy conflict. Discontinue beta-lactam agent.
                  </p>
                )}
              </div>
            </form>
          </section>

          {/* Issued Prescriptions Ledger */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Issued Prescriptions Ledger (Click to Download / Print PDF)
            </h3>

            <div className="space-y-3">
              {prescriptions.map((rx) => {
                const targetPatient = patients.find(p => p.id === rx.patientId);
                return (
                  <div
                    key={rx.id}
                    className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{rx.id}</span>
                        <span className="font-semibold text-slate-700">→ {rx.patientName}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {rx.diagnosis} • {rx.medications[0]?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <AwareBadge classification={rx.medications[0]?.awareClass} size="compact" />
                      <button
                        type="button"
                        onClick={() => setSelectedRxForPrint(rx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-teal-600 hover:text-teal-700 rounded-lg text-xs font-semibold transition-all shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-teal-600" />
                        <span>Print / PDF</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Official Prescription Download & Print Modal */}
      {selectedRxForPrint && (
        <PrescriptionPrintModal
          prescription={selectedRxForPrint}
          patient={patients.find(p => p.id === selectedRxForPrint.patientId) || activePatient}
          onClose={() => setSelectedRxForPrint(null)}
        />
      )}
    </div>
  );
};
