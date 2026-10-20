import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, ShieldCheck } from 'lucide-react';

export const RxQrCode = ({ payload = '', hash = '', token = '' }) => {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!payload && !token) return;
    const content = payload || `RX:${token}:${hash}`;
    QRCode.toDataURL(content, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [payload, hash, token]);

  return (
    <div className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
      <div className="flex items-center gap-1.5 w-full justify-between pb-1.5 mb-2 border-b border-slate-100 text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1 font-bold text-teal-700">
          <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED RX
        </span>
        <span className="truncate max-w-[80px]">{token.slice(-7)}</span>
      </div>

      <div className="w-[110px] h-[110px] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
        {dataUrl ? (
          <img src={dataUrl} alt={`QR Code for ${token}`} className="w-full h-full object-contain p-1" />
        ) : (
          <QrCode className="w-8 h-8 text-slate-400 animate-pulse" />
        )}
      </div>

      <div className="mt-2 text-center w-full">
        <div className="text-[11px] font-mono font-bold text-slate-900 tracking-tight truncate">
          {token}
        </div>
        <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
          SHA: {hash ? hash.slice(0, 16) : 'VERIFIED_HASH'}
        </div>
      </div>
    </div>
  );
};
