import { C } from '../constants';

export default function TypingIndicator() {
  return (
    <div className="anim-fade-slide" style={{ display: 'flex', gap: 12 }}>
      {/* Bot avatar */}
      <div style={{
        width: 34, height: 34,
        borderRadius: '50%',
        flexShrink: 0,
        background: `linear-gradient(135deg, ${C.deep}, ${C.accent})`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        marginTop: 2,
      }}>
        🎓
      </div>

      {/* Bouncing dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '14px 17px',
        background: C.white,
        border: '1px solid rgba(232,209,197,0.5)',
        borderRadius: '12px 12px 12px 4px',
        boxShadow: '0 2px 16px rgba(69,40,41,0.10)',
      }}>
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
