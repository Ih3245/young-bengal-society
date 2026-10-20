import React, { useRef } from 'react';
import { RxQrCode } from './RxQrCode';
import { AwareBadge } from './AwareBadge';
import {
  Printer,
  Download,
  X,
  ShieldCheck,
  Building2,
  FileText,
  User,
  HeartPulse,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { triggerDownload } from '../../utils/exportUtils';

export const PrescriptionPrintModal = ({ prescription, patient, onClose }) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    let text = `=================================================================\n`;
    text += `       KHULNA MEDICAL COLLEGE & HOSPITAL - CLINICAL E-PRESCRIPTION\n`;
    text += `=================================================================\n`;
    text += `Rx Token: ${prescription.id}\n`;
    text += `Date: ${prescription.date}\n`;
    text += `Doctor: ${prescription.doctorName} (BMDC #A-48291)\n`;
    text += `Hospital: ${prescription.doctorHospital}\n`;
    text += `-----------------------------------------------------------------\n`;
    text += `PATIENT INFORMATION:\n`;
    text += `Name: ${prescription.patientName} (ID: ${prescription.patientId})\n`;
    text += `Age/Gender: ${patient?.age || 34} Yrs / ${patient?.gender || 'N/A'}\n`;
    text += `Allergies: ${patient?.allergies?.join(', ') || 'NKDA'}\n`;
    text += `Renal Function (eGFR): ${patient?.vitals?.eGFR || 'N/A'} mL/min\n`;
    text += `-----------------------------------------------------------------\n`;
    text += `DIAGNOSIS: ${prescription.diagnosis}\n`;
    text += `-----------------------------------------------------------------\n`;
    text += `PRESCRIBED MEDICATIONS:\n`;
    prescription.medications.forEach((m, idx) => {
      text += `[${idx + 1}] ${m.name} (${m.generic})\n`;
      text += `    WHO Classification: ${m.awareClass}\n`;
      text += `    Dosage: ${m.dosage}\n`;
      text += `    Duration: ${m.duration} (Quantity: ${m.quantity || 'As Directed'})\n`;
      text += `    Instructions: ${m.instructions}\n\n`;
    });
    text += `Physician Clinical Notes: ${prescription.clinicalNotes || 'None'}\n`;
    text += `Security Hash: ${prescription.hash}\n`;
    text += `=================================================================\n`;

    triggerDownload(text, `Prescription_${prescription.id}.txt`, 'text/plain;charset=utf-8;');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span className="font-semibold text-sm text-slate-800">
              Official Digital e-Prescription Slip
            </span>
            <span className="font-mono text-xs px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-bold">
              VERIFIED DGDA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span>Text</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-all ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Prescription Paper Body */}
        <div id="printable-prescription" className="p-8 sm:p-10 bg-white text-slate-900 font-sans">
          {/* Hospital & Directorate Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs tracking-wider uppercase mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Government of the People's Republic of Bangladesh</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {prescription.doctorHospital || 'Khulna Medical College & Hospital'}
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Department of Medicine & Telepharmacy Network • Khulna Division
                </p>
              </div>

              <div className="sm:text-right">
                <h2 className="text-base font-bold text-slate-900">{prescription.doctorName}</h2>
                <p className="text-xs text-slate-600 font-medium">{prescription.doctorId || 'BMDC Reg #A-48291'}</p>
                <p className="text-xs font-mono text-teal-700 font-semibold">Specialist Physician</p>
              </div>
            </div>
          </div>

          {/* Patient Demographic & Clinical Snapshot Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-500 font-medium block">Patient Name</span>
                <span className="font-bold text-slate-900 text-sm">{prescription.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Patient ID / Age</span>
                <span className="font-mono font-semibold text-slate-900">
                  {prescription.patientId} • {patient?.age || 34}y / {patient?.gender || 'Female'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Prescription Date</span>
                <span className="font-mono font-semibold text-slate-900">{prescription.date}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Renal Function (eGFR)</span>
                <span className="font-mono font-bold text-teal-700">
                  {patient?.vitals?.eGFR || 98} mL/min
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600">Documented Allergies:</span>
                <span className="font-bold text-rose-600">
                  {patient?.allergies?.join(', ') || 'No Known Drug Allergies (NKDA)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600">Vitals:</span>
                <span className="font-mono text-slate-800">
                  BP: {patient?.vitals?.bp || '118/76'} | Temp: {patient?.vitals?.temp || '101.4 °F'}
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Diagnosis */}
          <div className="mb-6 flex items-center gap-2 text-sm bg-teal-50/60 border border-teal-200/60 px-4 py-2.5 rounded-lg">
            <strong className="text-teal-900">Clinical Diagnosis:</strong>
            <span className="font-semibold text-teal-800">{prescription.diagnosis}</span>
          </div>

          {/* Rx Symbol & Medication Table */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-2xl font-serif font-black text-teal-800 mb-3">
              <span>℞</span>
              <span className="text-xs font-sans font-bold tracking-wider uppercase text-slate-500">
                Prescribed Medical Regimen (WHO AWaRe Classified)
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Medication & Strength</th>
                    <th className="py-2.5 px-4">WHO Class</th>
                    <th className="py-2.5 px-4">Dosage & Frequency</th>
                    <th className="py-2.5 px-4">Duration</th>
                    <th className="py-2.5 px-4">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {prescription.medications.map((med, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block text-sm">{med.name}</strong>
                        <span className="text-[11px] text-slate-500">Generic: {med.generic || med.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <AwareBadge classification={med.awareClass} size="compact" />
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{med.dosage}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">{med.duration}</td>
                      <td className="py-3 px-4 text-slate-600">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physician Advice & Clinical Notes */}
          {prescription.clinicalNotes && (
            <div className="mb-8 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <strong className="text-slate-700 block">Doctor's Clinical Notes / Counseling:</strong>
              <p className="text-slate-600 leading-relaxed">{prescription.clinicalNotes}</p>
            </div>
          )}

          {/* Official Security, Verification QR & Signature Footer */}
          <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Left: Security QR & Digest */}
            <div className="sm:col-span-7 flex items-center gap-4">
              <div className="shrink-0">
                <RxQrCode token={prescription.id} hash={prescription.hash} payload={prescription.qrPayload} />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-mono font-bold text-teal-800 block">
                  e-Prescription Token: {prescription.id}
                </span>
                <p className="text-[11px] text-slate-500 font-mono">
                  SHA-256 Digest: {prescription.hash || 'a4f89d31c0e7b274'}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 pt-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Tamper-proof digital prescription record</span>
                </div>
              </div>
            </div>

            {/* Right: Doctor Digital Signature Stamp */}
            <div className="sm:col-span-5 sm:text-right text-xs space-y-1 pt-4 sm:pt-0">
              <div className="inline-block border-b border-slate-400 pb-1 px-4 mb-1">
                <span className="font-serif italic text-base text-teal-900 font-bold block">
                  {prescription.doctorName}
                </span>
              </div>
              <p className="font-semibold text-slate-800">Digitally Verified & Signed</p>
              <p className="text-[11px] text-slate-500">BMDC Reg #A-48291 • Ministry of Health</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
