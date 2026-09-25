'use client';

import React, { useState } from 'react';
import { Users, Search, Plus, Filter, MessageSquare, ShoppingBag } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface CustomerRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalSpent: number;
  loyaltyPoints: number;
  segment: 'CHAMPION' | 'LOYAL' | 'POTENTIAL' | 'AT_RISK' | 'NEW';
}

const mockCustomers: CustomerRow[] = [
  { id: '1', name: 'Budi Santoso', phone: '6281234567890', email: 'budi@gmail.com', totalSpent: 4250000, loyaltyPoints: 420, segment: 'CHAMPION' },
  { id: '2', name: 'Siti Rahma', phone: '6285712345678', email: 'siti@yahoo.com', totalSpent: 1200000, loyaltyPoints: 120, segment: 'LOYAL' },
  { id: '3', name: 'Made Aryawan', phone: '6287898765432', email: 'made@nstok.id', totalSpent: 350000, loyaltyPoints: 35, segment: 'AT_RISK' },
  { id: '4', name: 'Dewi Lestari', phone: '6281987654321', email: 'dewi@gmail.com', totalSpent: 850000, loyaltyPoints: 85, segment: 'POTENTIAL' },
  { id: '5', name: 'Andi Wijaya', phone: '6282112233445', email: 'andi@gmail.com', totalSpent: 150000, loyaltyPoints: 15, segment: 'NEW' },
];

const badgeColor = {
  CHAMPION: 'bg-emerald-100 text-emerald-800',
  LOYAL: 'bg-blue-100 text-blue-800',
  POTENTIAL: 'bg-indigo-100 text-indigo-800',
  AT_RISK: 'bg-rose-100 text-rose-800',
  NEW: 'bg-slate-100 text-slate-800',
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Database Pelanggan POS</h1>
          <p className="text-sm text-slate-500 mt-1">
            Daftar customer tersinkronisasi otomatis dari transaksi kasir POS.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Kontak Baru</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau no WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Segmen</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">Pelanggan</th>
              <th className="px-6 py-3.5">WhatsApp</th>
              <th className="px-6 py-3.5">Total Belanja POS</th>
              <th className="px-6 py-3.5">Poin Loyalty</th>
              <th className="px-6 py-3.5">Segmen RFM</th>
              <th className="px-6 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{c.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-slate-700">+{c.phone}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{formatRupiah(c.totalSpent)}</td>
                <td className="px-6 py-4 font-bold text-amber-600">{c.loyaltyPoints} Pts</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeColor[c.segment]}`}>
                    {c.segment}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="/inbox"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat WA</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
