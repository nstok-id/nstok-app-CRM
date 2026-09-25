'use client';

import React from 'react';
import { Plus, MoreHorizontal, DollarSign } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

const columns = [
  { id: 'LEAD', title: 'Leads Baru', color: 'border-slate-400' },
  { id: 'CONTACTED', title: 'Sudah Dihubungi (WA)', color: 'border-blue-500' },
  { id: 'QUOTATION', title: 'Penawaran / Struk POS', color: 'border-amber-500' },
  { id: 'WON', title: 'Deal / Closed Won', color: 'border-emerald-500' },
];

const mockDeals = [
  { id: 'd1', title: 'Paket Katering Wedding - Budi', customer: 'Budi Santoso', value: 15000000, stage: 'QUOTATION' },
  { id: 'd2', title: 'Pengadaan Seragam Resto', customer: 'Siti Rahma', value: 3500000, stage: 'CONTACTED' },
  { id: 'd3', title: 'Pemesanan Kue Kotak 200pcs', customer: 'Dewi Lestari', value: 2000000, stage: 'LEAD' },
  { id: 'd4', title: 'Voucher Hampers Lebaran', customer: 'Made Aryawan', value: 5000000, stage: 'WON' },
];

export default function PipelinePage() {
  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline &amp; Deals Follow-up</h1>
          <p className="text-sm text-slate-500 mt-1">
            Tracking proses prospek penjualan dan follow-up via WhatsApp.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Deal Baru</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
        {columns.map((col) => {
          const dealsInCol = mockDeals.filter((d) => d.stage === col.id);
          return (
            <div key={col.id} className="bg-slate-100/70 rounded-xl p-3.5 flex flex-col border border-slate-200">
              <div className={`flex items-center justify-between pb-3 border-b-2 ${col.color} mb-3`}>
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wide">{col.title}</span>
                <span className="text-xs font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  {dealsInCol.length}
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {dealsInCol.map((deal) => (
                  <div key={deal.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
                    <div className="font-semibold text-sm text-slate-900 leading-snug">{deal.title}</div>
                    <div className="text-xs text-slate-500">{deal.customer}</div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700">{formatRupiah(deal.value)}</span>
                      <a href="/inbox" className="text-[11px] font-semibold text-blue-600 hover:underline">
                        Follow-up WA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
