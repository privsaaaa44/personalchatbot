import { useRef } from 'react';
import { C } from '../constants';

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  function handleChange(e) {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div
      className="input-area"
      style={{
        padding: '18px 32px 24px',
        background: 'rgba(243,232,223,0.6)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(69,40,41,0.08)',
        flexShrink: 0,
      }}
    >
      {/* Input row */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 12,
        background: C.white,
        border: `1.5px solid ${canSend ? 'rgba(160,96,74,0.45)' : 'rgba(69,40,41,0.14)'}`,
        borderRadius: 18,
        padding: '12px 14px',
        boxShadow: canSend
          ? '0 0 0 3px rgba(160,96,74,0.08), 0 2px 16px rgba(69,40,41,0.10)'
          : '0 2px 16px rgba(69,40,41,0.10)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about CPISM, ADSE, IT careers…"
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: "'Jost', sans-serif",
            fontSize: 13.5, color: C.deep,
            resize: 'none', maxHeight: 120,
            lineHeight: 1.6, padding: '2px 0',
          }}
        />

        <button
          className="send-btn"
          onClick={onSend}
          disabled={!canSend}
          title="Send"
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            border: 'none',
            background: canSend ? C.deep : 'rgba(87,89,91,0.25)',
            color: C.cream,
            cursor: canSend ? 'pointer' : 'not-allowed',
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease, transform 0.15s ease',
          }}
        >
          <svg
            width="17" height="17" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Footer note */}
      <p style={{
        marginTop: 10, textAlign: 'center',
        fontSize: 10.5, color: 'rgba(87,89,91,0.4)',
        fontWeight: 300,
      }}>
        Aptech Career Counselor · Academic guidance only · Press Enter to send
      </p>
    </div>
  );
}
