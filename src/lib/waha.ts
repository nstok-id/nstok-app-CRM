/**
 * Client HTTP untuk WAHA (WhatsApp HTTP API) Public Endpoint
 * Configurable via WAHA_BASE_URL & WAHA_API_KEY
 */

const WAHA_BASE_URL = process.env.WAHA_BASE_URL || 'https://waha.nstok.my.id';
const WAHA_API_KEY = process.env.WAHA_API_KEY || '';

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (WAHA_API_KEY) {
    headers['X-Api-Key'] = WAHA_API_KEY;
  }
  return headers;
}

export const wahaClient = {
  /**
   * Mengambil status session WAHA
   */
  async getSession(sessionName: string) {
    try {
      const res = await fetch(`${WAHA_BASE_URL}/api/sessions/${sessionName}`, {
        method: 'GET',
        headers: getHeaders(),
        cache: 'no-store',
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`WAHA getSession failed: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.error('[WAHA] Error fetching session:', err);
      return null;
    }
  },

  /**
   * Membuat / Memulai session baru
   */
  async startSession(sessionName: string) {
    const res = await fetch(`${WAHA_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: sessionName,
        config: {
          webhooks: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/webhooks/waha`,
              events: ['message', 'session.status'],
            },
          ],
        },
      }),
    });
    return await res.json();
  },

  /**
   * Mengambil QR Code (Image Buffer / Base64 / Text)
   */
  async getQRCode(sessionName: string) {
    try {
      const res = await fetch(`${WAHA_BASE_URL}/api/${sessionName}/auth/qr`, {
        method: 'GET',
        headers: getHeaders(),
        cache: 'no-store',
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error('[WAHA] Error getting QR code:', err);
      return null;
    }
  },

  /**
   * Kirim Text Message ke No WhatsApp
   * @param chatId Format: 628xxx@c.us
   */
  async sendText(sessionName: string, chatId: string, text: string) {
    const formattedChatId = chatId.includes('@c.us') ? chatId : `${chatId.replace(/[^0-9]/g, '')}@c.us`;
    const res = await fetch(`${WAHA_BASE_URL}/api/sendText`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        session: sessionName,
        chatId: formattedChatId,
        text,
      }),
    });
    return await res.json();
  },

  /**
   * Stop / Logout session
   */
  async stopSession(sessionName: string) {
    const res = await fetch(`${WAHA_BASE_URL}/api/sessions/${sessionName}/stop`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return await res.json();
  }
};
