import type { Metadata } from 'next';
import { SidebarNav } from '@/components/SidebarNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'nStok CRM — Customer 360 & WhatsApp CRM',
  description: 'CRM Profesional ekosistem nStok terhubung POS & WAHA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex flex-col lg:flex-row h-screen overflow-hidden bg-slate-50 text-slate-900">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
          {children}
        </main>
      </body>
    </html>
  );
}
