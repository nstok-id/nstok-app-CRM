'use client';

import React, { useState } from 'react';
import { Send, Users, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CampaignsPage() {
  const [selectedSegment, setSelectedSegment] = useState('AT_RISK');
  const [messageTemplate, setMessageTemplate] = useState('Halo {nama}! Kami rindu kehadiran Anda di nStok Store. Gunakan kode voucher KANGEN20 untuk diskon 20% khusus transaksi hari ini!');
  const [sentStatus, setSentStatus] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setSentStatus(true);
    setTimeout(() => {
      setSentStatus(false);
    }, 4000);
  };

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Broadcast WhatsApp Tersegmentasi</h1>
        <p className="text-sm text-slate-500 mt-1">
          Kirim pesan promosi &amp; re-engagement ke pelanggan berdasarkan data belanja POS.
        </p>
      </div>

      {sentStatus && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Broadcast campaign berhasil dijadwalkan &amp; dikirim via WAHA Engine!</span>
        </div>
      )}

      <form onSubmit={handleBroadcast} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {/* Pilih Target Segmen */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Segmen Pelanggan</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'AT_RISK', title: 'At Risk (280 kontak)', desc: 'Tidak belanja > 30 hari' },
              { id: 'CHAMPION', title: 'Champions (184 kontak)', desc: 'Pelanggan paling loyal' },
              { id: 'ALL', title: 'Semua Pelanggan (1,420 kontak)', desc: 'Seluruh database POS' },
            ].map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setSelectedSegment(s.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedSegment === s.id
                    ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">{s.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Template Pesan */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Isi Pesan WhatsApp</label>
            <span className="text-[11px] text-slate-400">Variabel: {'{nama}'}, {'{poin}'}</span>
          </div>
          <textarea
            rows={5}
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Pesan broadcast otomatis menggunakan delay acak antar nomor (3-7 detik) via WAHA untuk menjaga keamanan dan reputasi nomor WhatsApp toko.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Broadcast Sekarang</span>
          </button>
        </div>
      </form>
    </div>
  );
}
