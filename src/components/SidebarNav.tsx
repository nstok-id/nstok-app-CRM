'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  MessageSquare, 
  LayoutDashboard, 
  Kanban, 
  Send, 
  QrCode, 
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inbox WhatsApp', href: '/inbox', icon: MessageSquare },
  { name: 'Pelanggan POS', href: '/customers', icon: Users },
  { name: 'Pipeline Deals', href: '/pipeline', icon: Kanban },
  { name: 'Broadcast WA', href: '/campaigns', icon: Send },
  { name: 'Koneksi WAHA', href: '/settings/waha', icon: QrCode },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-white leading-none text-base">nStok CRM</h1>
          <span className="text-[11px] text-emerald-400 font-medium">Customer 360 + WAHA</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-emerald-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <p className="font-semibold text-slate-400">Ekosistem nStok ID</p>
        <p>Tenant sync with POS</p>
      </div>
    </aside>
  );
}
