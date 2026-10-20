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
        dark: '#141817',
        light: '#FFFFFF'
      }
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [payload, hash, token]);

  return (
    <div className="flex flex-col items-center p-3 bg-white border border-[#141817] rounded shadow-[2px_2px_0px_#141817]">
      <div className="flex items-center gap-1.5 w-full justify-between pb-2 mb-2 border-b border-[#CFD2CE] text-[10px] font-mono text-[#5A605D]">
        <span className="flex items-center gap-1 font-bold text-[#0F6B53]">
          <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED RX TOKEN
        </span>
        <span className="truncate max-w-[80px]">{token.slice(-7)}</span>
      </div>

      <div className="w-[120px] h-[120px] flex items-center justify-center bg-[#F4F3EF] border border-[#CFD2CE] rounded">
        {dataUrl ? (
          <img src={dataUrl} alt={`QR Code for ${token}`} className="w-full h-full object-contain" />
        ) : (
          <QrCode className="w-8 h-8 text-[#5A605D] animate-pulse" />
        )}
      </div>

      <div className="mt-2 text-center w-full">
        <div className="text-[11px] font-mono font-bold text-[#141817] tracking-tight truncate">
          {token}
        </div>
        <div className="text-[9px] font-mono text-[#5A605D] truncate mt-0.5">
          SHA: {hash ? hash.slice(0, 16) : 'VERIFIED_HASH'}
        </div>
      </div>
    </div>
  );
};
