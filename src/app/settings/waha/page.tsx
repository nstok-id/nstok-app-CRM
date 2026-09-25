'use client';

import React, { useState } from 'react';
import { QrCode, RefreshCw, CheckCircle2, Smartphone, ShieldCheck } from 'lucide-react';

export default function WahaSettingsPage() {
  const [sessionStatus, setSessionStatus] = useState<'WORKING' | 'SCAN_QR_CODE' | 'STOPPED'>('WORKING');
  const [phoneNumber] = useState('6281234567890');
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pengaturan WhatsApp Engine (WAHA)</h1>
        <p className="text-sm text-slate-500 mt-1">
          Koneksikan nomor WhatsApp toko Anda ke sistem CRM &amp; e-receipt otomatis POS.
        </p>
      </div>

      {/* WAHA Public Configuration Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-semibold text-slate-900 text-base">Public WAHA Endpoint</h2>
            <p className="text-xs text-slate-500">Koneksi REST API WhatsApp siap untuk deployment serverless / Vercel.</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Status</span>
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Nomor Terhubung: +{phoneNumber}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                <CheckCircle2 className="w-3 h-3" />
                ONLINE (GOWS)
              </span>
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              Engine WAHA aktif menerima webhook &amp; mengirim pesan e-receipt.
            </p>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium">WAHA Base URL:</span>
            <div className="font-mono font-semibold text-slate-800">https://waha.nstok.my.id</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium">Session Identifier:</span>
            <div className="font-mono font-semibold text-slate-800">default (org-isolated)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
