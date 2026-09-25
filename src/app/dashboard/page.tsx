'use client';

import React from 'react';
import { Users, MessageSquare, DollarSign, Award, ArrowUpRight, TrendingUp } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Pelanggan', value: '1,420', change: '+12%', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Aktif Chat WA (Bulan Ini)', value: '389', change: '+24%', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Omset dari Member POS', value: formatRupiah(84500000), change: '+18%', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Total Poin Loyalty Aktif', value: '45,200 pts', change: '+5%', icon: Award, color: 'text-amber-600 bg-amber-50' },
  ];

  const rfmSegments = [
    { name: 'Champions (Belanja Rutin & Besar)', count: 184, percent: '13%', color: 'bg-emerald-500' },
    { name: 'Loyal Customers', count: 412, percent: '29%', color: 'bg-blue-500' },
    { name: 'Potential Loyalist', count: 320, percent: '22%', color: 'bg-indigo-500' },
    { name: 'At Risk (Perlu Follow-up WA)', count: 280, percent: '20%', color: 'bg-rose-500' },
    { name: 'New Leads / 1st Time POS', count: 224, percent: '16%', color: 'bg-slate-400' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">CRM & Customer 360 Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Analitik interaksi WhatsApp, histori loyalty POS, dan retensi pelanggan.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</span>
                <div className={`p-2 rounded-lg ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{s.change} vs bulan lalu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segment Breakdown & Quick Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFM Segmentation Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-semibold text-slate-900 text-base mb-4 flex items-center justify-between">
            <span>Segmentasi Pelanggan POS (RFM Matrix)</span>
            <span className="text-xs font-normal text-slate-500">Auto-calculated from POS sync</span>
          </h2>
          <div className="space-y-4">
            {rfmSegments.map((seg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{seg.name}</span>
                  <span className="text-slate-500 font-semibold">{seg.count} kontak ({seg.percent})</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${seg.color}`} style={{ width: seg.percent }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WAHA Connection Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-slate-900 text-base mb-2">WhatsApp Engine (WAHA)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Koneksi publik endpoint WAHA aktif untuk otomatisasi e-receipt POS &amp; live chat.
            </p>
            <div className="mt-5 p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-xs font-bold text-emerald-800">WAHA Session Active</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">https://waha.nstok.my.id</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <a
              href="/inbox"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors gap-1.5"
            >
              <span>Buka Omnichannel Inbox</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
