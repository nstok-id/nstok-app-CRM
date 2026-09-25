'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  MoreVertical, 
  ShoppingBag, 
  Award, 
  Clock, 
  User, 
  CheckCheck
} from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface CustomerContact {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  totalSpent: number;
  loyaltyPoints: number;
  segment: string;
  lastVisit: string;
}

const mockContacts: CustomerContact[] = [
  {
    id: 'c1',
    name: 'Budi Santoso',
    phone: '6281234567890',
    lastMessage: 'Halo min, struk belanja tadi siang bisa dikirim via WA?',
    lastTime: '10:42',
    unread: 2,
    totalSpent: 4250000,
    loyaltyPoints: 420,
    segment: 'CHAMPION',
    lastVisit: 'Hari ini, 10:15 WITA',
  },
  {
    id: 'c2',
    name: 'Siti Rahma',
    phone: '6285712345678',
    lastMessage: 'Promo voucher diskon 20% masih berlaku sampai kapan ya?',
    lastTime: 'Kemarin',
    unread: 0,
    totalSpent: 1200000,
    loyaltyPoints: 120,
    segment: 'LOYAL',
    lastVisit: '3 hari yang lalu',
  },
  {
    id: 'c3',
    name: 'Made Aryawan',
    phone: '6287898765432',
    lastMessage: 'Siap terima kasih min infonya.',
    lastTime: '22 Sep',
    unread: 0,
    totalSpent: 350000,
    loyaltyPoints: 35,
    segment: 'AT_RISK',
    lastVisit: '2 minggu yang lalu',
  },
];

interface ChatMessage {
  id: string;
  text: string;
  time: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: 'SENT' | 'DELIVERED' | 'READ';
}

export default function InboxPage() {
  const [selectedContact, setSelectedContact] = useState<CustomerContact>(mockContacts[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      text: 'Halo Budi! Terima kasih sudah berbelanja di nStok Store. Total belanja: Rp 450.000.',
      time: '10:16',
      direction: 'OUTBOUND',
      status: 'READ',
    },
    {
      id: 'm2',
      text: 'Halo min, struk belanja tadi siang bisa dikirim via WA?',
      time: '10:42',
      direction: 'INBOUND',
      status: 'READ',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      direction: 'OUTBOUND',
      status: 'SENT',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Kirim via API Public WAHA
    try {
      await fetch('/api/waha/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionName: 'default',
          chatId: selectedContact.phone,
          text: newMsg.text,
        }),
      });
    } catch (err) {
      console.error('Failed to send WA message', err);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* 1. Contact List Pane */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kontak / no WA..."
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {mockContacts.map((contact) => {
            const isSelected = selectedContact.id === contact.id;
            return (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full text-left p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                  isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-500' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-semibold text-sm text-slate-900 truncate">{contact.name}</span>
                    <span className="text-[11px] text-slate-400">{contact.lastTime}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {contact.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              {selectedContact.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm leading-snug">{selectedContact.name}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>+{selectedContact.phone}</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">WhatsApp Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isOut = m.direction === 'OUTBOUND';
            return (
              <div key={m.id} className={`flex ${isOut ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md p-3.5 rounded-2xl shadow-sm text-sm ${
                    isOut
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isOut ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.time}</span>
                    {isOut && <CheckCheck className="w-3 h-3 text-emerald-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik balasan WhatsApp..."
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. Customer 360 Side Panel */}
      <div className="w-80 bg-white border-l border-slate-200 p-5 flex flex-col shrink-0 overflow-y-auto">
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center text-slate-600 font-bold text-xl mb-3">
            {selectedContact.name.charAt(0)}
          </div>
          <h3 className="font-bold text-slate-900 text-base">{selectedContact.name}</h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            {selectedContact.segment}
          </span>
        </div>

        {/* POS Metrics */}
        <div className="py-5 border-b border-slate-100 space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Histori Belanja POS</h4>
          
          <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-[11px] text-slate-500">Total Pengeluaran</div>
              <div className="text-sm font-bold text-slate-900">{formatRupiah(selectedContact.totalSpent)}</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
            <Award className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-[11px] text-slate-500">Poin Loyalty</div>
              <div className="text-sm font-bold text-slate-900">{selectedContact.loyaltyPoints} Pts</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
            <Clock className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-[11px] text-slate-500">Kunjungan Terakhir</div>
              <div className="text-xs font-semibold text-slate-800">{selectedContact.lastVisit}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-5 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Action</h4>
          <button className="w-full text-xs font-medium py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-left">
            🧾 Kirim Struk POS Terakhir
          </button>
          <button className="w-full text-xs font-medium py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-left">
            🎁 Berikan Voucher / Poin
          </button>
        </div>
      </div>
    </div>
  );
}
