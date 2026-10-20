import React from 'react';
import { ShieldCheck, ShieldAlert, Lock, AlertCircle } from 'lucide-react';

export const AwareBadge = ({ classification = 'ACCESS', size = 'normal' }) => {
  const normalized = (classification || 'ACCESS').toUpperCase();

  const config = {
    ACCESS: {
      label: 'WHO ACCESS',
      labelBn: 'অ্যাক্সেস শ্রেণি',
      bg: '#F0FDF4',
      text: '#15803D',
      border: '#BBF7D0',
      icon: ShieldCheck,
      tooltip: 'First-line antimicrobial with narrow spectrum and low resistance selection pressure.'
    },
    WATCH: {
      label: 'WHO WATCH',
      labelBn: 'ওয়াচ শ্রেণি (সংরক্ষিত)',
      bg: '#FFF1F2',
      text: '#BE123C',
      border: '#FECDD3',
      icon: ShieldAlert,
      tooltip: 'Critically important broad-spectrum antibiotic. High resistance driver; strictly stewardship-locked.'
    },
    RESERVE: {
      label: 'WHO RESERVE',
      labelBn: 'রিজার্ভ শ্রেণি (চরম জরুরি)',
      bg: '#0F172A',
      text: '#FFFFFF',
      border: '#334155',
      icon: Lock,
      tooltip: 'Last-resort hospital antimicrobials. Retail pharmacy dispensing strictly prohibited.'
    },
    OTC: {
      label: 'OTC / NON-AMR',
      labelBn: 'ওটিসি ওষুধ',
      bg: '#F8FAFC',
      text: '#475569',
      border: '#E2E8F0',
      icon: AlertCircle,
      tooltip: 'Symptomatic non-antibiotic medication.'
    }
  };

  const current = config[normalized] || config.ACCESS;
  const Icon = current.icon;
  const isCompact = size === 'compact';

  return (
    <span
      title={current.tooltip}
      style={{
        backgroundColor: current.bg,
        color: current.text,
        borderColor: current.border
      }}
      className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider border rounded-lg shadow-2xs ${
        isCompact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
    >
      <Icon className={isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{current.label}</span>
    </span>
  );
};
