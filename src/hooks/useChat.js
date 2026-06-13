import { useState, useCallback } from 'react';
import { SYSTEM_PROMPT, getTime } from '../constants';

// ─── Points to local Express proxy (server.js) ───
// The proxy adds your API key server-side, avoiding CORS & key exposure.
// Uses relative URL - works both locally (via Vite proxy) and live (Vercel routes it)
const PROXY_URL = '/api/chat';

export function useChat() {
  const [messages, setMessages]     = useState([]);  // { role, text, time }
  const [apiHistory, setApiHistory] = useState([]);  // { role, content } for Anthropic
  const [isTyping, setIsTyping]     = useState(false);
  const [error, setError]           = useState(null);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);

    // 1. Show user message immediately
    setMessages((prev) => [...prev, { role: 'user', text: trimmed, time: getTime() }]);

    // 2. Build API history
    const updatedHistory = [...apiHistory, { role: 'user', content: trimmed }];
    setApiHistory(updatedHistory);
    setIsTyping(true);

    try {
      const res = await fetch(PROXY_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system:   SYSTEM_PROMPT,  // Include system prompt to guide AI behavior
          messages: updatedHistory.slice(-6), // keep last 6 turns for context window
        }),
      });

      // Check response status first
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server error (${res.status}):`, errorText);
        throw new Error(`Server error: ${res.status}`);
      }

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        console.error('Failed to parse server response:', parseErr);
        throw new Error('Invalid response from server');
      }

      // Handle proxy/API errors
      if (!res.ok) {
        throw new Error(data?.error || `Server error: ${res.status}`);
      }

 const reply = data?.reply
  ?? "I'm sorry, I couldn't process that. Please try again.";

      setApiHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
      setMessages((prev) => [...prev, { role: 'bot', text: reply, time: getTime() }]);

    } catch (err) {
      console.error('Chat error:', err.message);
      setError(err.message);

      // Friendly error message in chat
      const isConnErr = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: isConnErr
            ? '⚠️ Cannot reach the server. Locally, make sure you ran **`npm run server`**. On Vercel, check that `GROQ_API_KEY` environment variable is set.'
            : `⚠️ Error: ${err.message}`,
          time: getTime(),
        },
      ]);
    }

    setIsTyping(false);
  }, [isTyping, apiHistory]);

  return { messages, isTyping, error, sendMessage };
}
