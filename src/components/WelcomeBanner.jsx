import { C, QUICK_STARTERS } from '../constants';

export default function WelcomeBanner({ onQuickSend }) {
  return (
    <div
      className="anim-welcome"
      style={{
        textAlign: 'center',
        padding: '36px 24px',
        background: 'rgba(255,250,247,0.8)',
        borderRadius: 18,
        border: '1px solid rgba(232,209,197,0.6)',
        marginBottom: 8,
      }}
    >
      <div style={{ fontSize: 44, marginBottom: 14 }}>🎓</div>

      <h2 style={{
        fontFamily: "'Lora', serif",
        fontSize: 22, fontWeight: 700,
        color: C.deep, marginBottom: 10,
      }}>
        Welcome to Aptech Career Counselor
      </h2>

      <p style={{
        fontSize: 13.5, color: C.mid,
        lineHeight: 1.7, maxWidth: 420,
        margin: '0 auto 22px',
      }}>
        I&apos;m your official academic advisor for Aptech Pakistan. Ask me about
        CPISM, ADSE, programming, cybersecurity, IT careers, and more!
      </p>

      {/* Quick starters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {QUICK_STARTERS.map((s) => (
          <button
            key={s.label}
            className="starter-btn"
            onClick={() => onQuickSend(s.text)}
            style={{
              padding: '8px 18px', borderRadius: 20,
              border: '1.5px solid rgba(69,40,41,0.18)',
              background: C.white, color: C.deep,
              fontFamily: "'Jost', sans-serif",
              fontSize: 12.5, fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
