import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
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
  Sparkles
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

  // Resolution modal state for DTP
  const [activeDtpRx, setActiveDtpRx] = useState(null);
  const [dtpOverrideNote, setDtpOverrideNote] = useState('');

  // Pending triage consults
  const pendingTriageCases = triageQueue.filter(
    (t) => t.status === 'PENDING_DOCTOR_CONSULT'
  );

  // Pending DTP flagged prescriptions
  const flaggedDtpPrescriptions = prescriptions.filter(
    (rx) => rx.status === 'DTP_FLAGGED'
  );

  // Check real-time CDS safety for the currently drafted medication against active patient
  const draftedMed = {
    name: selectedDrug,
    generic: whoAwareDb[selectedDrug]?.generic || selectedDrug,
    awareClass: whoAwareDb[selectedDrug]?.class || 'ACCESS'
  };

  const activeCdsAlerts = evaluateClinicalSafety({
    patient: activePatient,
    prescribedMeds: [draftedMed]
  });

  // Handle Loading Triage Case into Doctor Prescription Builder
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

  // Handle Issuing Digital e-Prescription
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

    issuePrescription({
      patientId: activePatient.id,
      patientName: activePatient.name,
      diagnosis: selectedDiagnosis,
      medications: [medObj],
      clinicalNotes,
      originatingTriageId: selectedTriageId
    });

    setSelectedTriageId(null);
    setClinicalNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Doctor Header & Active Physician Credentials */}
      <section className="clinical-card p-4 sm:p-5 bg-white border border-[#141817]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#0F6B53] flex items-center justify-center text-white border border-[#141817]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5A605D] uppercase tracking-wider">
                <span>PORTAL 02</span>
                <span>•</span>
                <span className="font-bold text-[#0F6B53]">PHYSICIAN TELEMEDICINE WORKBENCH</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-[#141817]">
                Dr. Anisur Rahman, MBBS, FCPS
              </h1>
              <p className="text-xs text-[#5A605D]">
                BMDC Reg: <span className="font-mono font-bold text-[#141817]">#A-48291</span> • Khulna Medical College & Hospital • Tele-Triage Desk 04
              </p>
            </div>
          </div>

          {/* Real-time Queue Counters */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#FEF3C7] border border-[#B45309] rounded text-xs font-bold text-[#B45309] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{pendingTriageCases.length} Pending Consults</span>
            </div>

            {flaggedDtpPrescriptions.length > 0 && (
              <div className="px-3 py-1.5 bg-[#FAECE7] border border-[#C84B24] rounded text-xs font-bold text-[#C84B24] flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>{flaggedDtpPrescriptions.length} DTP Alerts</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Feature 2 Tele-Triage Queue & Feature 3 DTP Desk */}
        <div className="lg:col-span-5 space-y-6">
          {/* Feature 3: Pharmacist DTP Resolution Desk */}
          {flaggedDtpPrescriptions.length > 0 && (
            <section className="clinical-card p-5 bg-[#FFFBF8] border-2 border-[#C84B24] shadow-[3px_3px_0px_#C84B24]">
              <div className="flex items-center justify-between pb-3 border-b border-[#C84B24]/30 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#C84B24]" />
                  <h2 className="font-headline font-bold text-base text-[#C84B24]">
                    Pharmacist DTP Intervention Alerts ({flaggedDtpPrescriptions.length})
                  </h2>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#C84B24] text-white rounded">
                  ACTION REQUIRED
                </span>
              </div>

              <div className="space-y-3">
                {flaggedDtpPrescriptions.map((rx) => (
                  <div key={rx.id} className="p-3 bg-white border border-[#C84B24] rounded text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#141817]">{rx.id}</span>
                      <span className="font-semibold text-[#5A605D]">{rx.patientName}</span>
                    </div>

                    <div className="p-2 bg-[#FAECE7] rounded text-[#141817]">
                      <span className="font-bold text-[#C84B24] block mb-0.5">
                        {rx.dtpAlert?.type || 'DRUG_THERAPY_PROBLEM'}:
                      </span>
                      <p className="text-[11px] leading-relaxed">{rx.dtpAlert?.message}</p>
                      <p className="text-[10px] font-mono text-[#5A605D] mt-1">
                        Flagged by: {rx.dtpAlert?.flaggedBy}
                      </p>
                    </div>

                    {/* Quick Resolution Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          // Approve modification with renal titration
                          resolveDtp(
                            rx.id,
                            'UPDATE_MED',
                            { dosage: '250mg BID (Adjusted for eGFR 38 mL/min)' },
                            'Approved renal dose titration per clinical pharmacist recommendation.'
                          );
                        }}
                        className="clinical-btn clinical-btn-primary flex-1 py-1.5 text-xs bg-[#0F6B53]"
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
                        className="clinical-btn clinical-btn-secondary text-xs px-2.5"
                      >
                        Override
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Feature 1: Incoming Tele-Triage Consult Queue (Ghosh et al., 2026) */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0F6B53]" />
                <h2 className="font-headline font-bold text-base text-[#141817]">
                  Incoming Tele-Triage Queue
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#5A605D]">
                {pendingTriageCases.length} Waiting
              </span>
            </div>

            {pendingTriageCases.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#5A605D] bg-[#F4F3EF] rounded border border-dashed border-[#CFD2CE]">
                Tele-triage queue is clear. Cases referred from Patient Portal or Pharmacy Counter will appear here live.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingTriageCases.map((tc) => (
                  <div
                    key={tc.id}
                    onClick={() => handleSelectTriage(tc)}
                    className={`p-3.5 rounded border cursor-pointer transition-all ${
                      selectedTriageId === tc.id
                        ? 'bg-[#E6F3EE] border-[#0F6B53] shadow-[2px_2px_0px_#0F6B53]'
                        : 'bg-[#F4F3EF] border-[#CFD2CE] hover:border-[#141817]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#141817]">{tc.patientName}</span>
                          <span className="text-xs text-[#5A605D]">({tc.patientAge || 34} yrs)</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#5A605D] block mt-0.5">
                          Source: {tc.source}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        tc.tier === 'RED'
                          ? 'bg-[#C84B24] text-white border-[#C84B24]'
                          : 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                      }`}>
                        TIER {tc.tier}
                      </span>
                    </div>

                    <p className="text-xs text-[#141817] mt-2 font-medium line-clamp-2">
                      "{tc.narrative}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-[#CFD2CE] flex items-center justify-between text-[11px] font-mono text-[#5A605D]">
                      <span>Temp: {tc.vitals?.temp} | BP: {tc.vitals?.bp}</span>
                      <span className="text-[#0F6B53] font-bold flex items-center gap-1">
                        Review & Issue Rx <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Shared Longitudinal Patient EHR Snapshot */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#0F6B53]" />
                <h2 className="font-headline font-bold text-base text-[#141817]">
                  Shared Longitudinal EHR Snapshot
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#0F6B53] font-bold">
                EHR SYNC ACTIVE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
                <span className="text-[10px] font-mono text-[#5A605D] uppercase block">PATIENT RECORD</span>
                <span className="font-bold text-sm text-[#141817] block mt-0.5">
                  {activePatient.name} ({activePatient.id})
                </span>
                <p className="text-[11px] text-[#5A605D] mt-1">{activePatient.caseSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
                  <span className="text-[10px] font-mono uppercase text-[#5A605D] block">ALLERGIES</span>
                  <span className="font-bold text-[#C84B24] block mt-0.5">
                    {activePatient.allergies.join(', ')}
                  </span>
                </div>

                <div className="p-2.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
                  <span className="text-[10px] font-mono uppercase text-[#5A605D] block">RENAL FUNCTION</span>
                  <span className="font-mono font-bold text-[#141817] block mt-0.5">
                    eGFR: {activePatient.vitals.eGFR} mL/min
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
                <span className="text-[10px] font-mono uppercase text-[#5A605D] block">CURRENT ACTIVE MEDICATIONS</span>
                <span className="font-medium text-[#141817] block mt-0.5">
                  {activePatient.activeMeds.join(', ')}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Feature 2 - Closed-Loop e-Prescription & WHO AWaRe Rational Stewardship Builder */}
        <div className="lg:col-span-7 space-y-6">
          <section className="clinical-card p-5 sm:p-6 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0F6B53]" />
                <div>
                  <h2 className="font-headline font-bold text-lg text-[#141817]">
                    Closed-Loop Digital e-Prescription Console
                  </h2>
                  <p className="text-xs font-mono text-[#5A605D]">
                    Grounded in Klimentidis et al., 2026 & Ghosh et al., 2026
                  </p>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[#0F6B53] px-2 py-0.5 bg-[#E6F3EE] border border-[#0F6B53] rounded">
                DGDA COMPLIANT
              </span>
            </div>

            {/* Real-time CDS Safety Engine Alert Display */}
            {activeCdsAlerts.length > 0 && (
              <div className="mb-5 p-3.5 bg-[#FAECE7] border-2 border-[#C84B24] rounded shadow-[2px_2px_0px_#C84B24] space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#C84B24]" />
                  <span className="font-mono font-bold text-xs uppercase text-[#C84B24] tracking-wider">
                    CLINICAL DECISION SUPPORT (CDS) HARD ALERT
                  </span>
                </div>

                {activeCdsAlerts.map((alert, idx) => (
                  <div key={idx} className="text-xs text-[#141817] pl-7 space-y-1">
                    <strong className="text-[#C84B24] block">{alert.title}</strong>
                    <p className="leading-relaxed">{alert.message}</p>
                    <p className="text-[11px] font-semibold text-[#0F6B53]">
                      Action: {alert.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleIssueRx} className="space-y-4">
              {/* Patient Selection & Diagnosis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
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
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
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

              {/* WHO AWaRe Medication Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
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

                <p className="text-[11px] text-[#5A605D] mt-1.5 font-medium">
                  {whoAwareDb[selectedDrug]?.description}
                </p>
              </div>

              {/* Dosage, Duration, Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
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
                  <label className="block text-xs font-semibold text-[#141817] mb-1">
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

              {/* Physician Clinical Justification */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
                  Physician Clinical Justification & Counseling Notes
                </label>
                <textarea
                  rows="2"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="clinical-input w-full text-xs"
                  placeholder="Record antimicrobial justification, culture status, or patient counseling instructions..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={activeCdsAlerts.some(a => a.severity === 'CRITICAL')}
                  className="clinical-btn clinical-btn-primary w-full py-2.5 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Digitally Sign & Issue Closed-Loop e-Prescription (SHA-256 Token)
                  </span>
                </button>

                {activeCdsAlerts.some(a => a.severity === 'CRITICAL') && (
                  <p className="text-[11px] font-bold text-[#C84B24] text-center mt-1.5">
                    Issuance blocked by critical CDS allergy conflict. Discontinue beta-lactam agent.
                  </p>
                )}
              </div>
            </form>
          </section>

          {/* Historical Prescriptions Issued by this Doctor */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <h3 className="font-headline font-bold text-sm text-[#141817] mb-3 pb-2 border-b border-[#CFD2CE]">
              Issued Prescriptions Ledger (Khulna Division Node)
            </h3>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-3 bg-[#F4F3EF] border border-[#CFD2CE] rounded flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#141817]">{rx.id}</span>
                      <span className="font-semibold text-[#141817]">→ {rx.patientName}</span>
                    </div>
                    <span className="text-[11px] text-[#5A605D] block mt-0.5">
                      {rx.diagnosis} • {rx.medications[0]?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AwareBadge classification={rx.medications[0]?.awareClass} size="compact" />
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-[#CFD2CE] rounded">
                      {rx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
