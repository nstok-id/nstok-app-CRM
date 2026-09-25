'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  MessageSquare, 
  LayoutDashboard, 
  Kanban, 
  Send, 
  QrCode, 
  Layers,
  Menu,
  X
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3 border-b border-slate-800 z-30 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white leading-none text-sm">nStok CRM</h1>
            <span className="text-[10px] text-emerald-400 font-medium">Customer 360</span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-white leading-none text-base">nStok CRM</h1>
              <span className="text-[11px] text-emerald-400 font-medium">Customer 360 + WAHA</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
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
    </>
  );
}
