import { C, TOPICS } from '../constants';

export default function Sidebar() {
  return (
    <aside
      className="sidebar"
      style={{
        width: 280,
        flexShrink: 0,
        background: C.deep,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Bottom-left glow blob */}
      <div
        style={{
          position: 'absolute',
          bottom: -80, left: -80,
          width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(232,209,197,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* ─── Brand ─── */}
      <div style={{ padding: '32px 28px 24px', borderBottom: '1px solid rgba(232,209,197,0.12)' }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 10, fontWeight: 600,
          letterSpacing: 3, textTransform: 'uppercase',
          color: C.accent2, marginBottom: 8,
        }}>
          Official Advisor
        </p>
        <h1 style={{
          fontFamily: "'Lora', serif",
          fontSize: 22, fontWeight: 700,
          color: C.cream, lineHeight: 1.2,
        }}>
          Aptech <span style={{ color: C.accent2 }}>Pakistan</span>
        </h1>
        <p style={{
          marginTop: 6, fontSize: 11,
          color: 'rgba(243,232,223,0.5)',
          fontWeight: 300, letterSpacing: 0.5,
        }}>
          Academic Career Guidance System
        </p>
      </div>

      {/* ─── Advisor Card ─── */}
      <div style={{
        padding: '28px 28px 20px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.accent2}, ${C.blush})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
          boxShadow: '0 0 0 3px rgba(232,209,197,0.15), 0 0 0 6px rgba(232,209,197,0.05)',
          position: 'relative',
        }}>
          🎓
          <div className="online-dot" />
        </div>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: 15, fontWeight: 600,
          color: C.cream, textAlign: 'center',
        }}>
          Career Counselor AI
        </p>
        <p style={{
          fontSize: 11,
          color: 'rgba(243,232,223,0.5)',
          textAlign: 'center', letterSpacing: 0.3,
        }}>
          Powered by Aptech Pakistan
        </p>
      </div>

      {/* ─── Topics ─── */}
      <div style={{ padding: '20px 28px', flex: 1 }}>
        <h4 style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 10, fontWeight: 600,
          letterSpacing: 2.5, textTransform: 'uppercase',
          color: C.accent2, marginBottom: 14,
        }}>
          Topics I Cover
        </h4>
        {TOPICS.map((topic) => (
          <div
            key={topic}
            className="topic-chip"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 14px', borderRadius: 8, marginBottom: 6,
              cursor: 'default', transition: 'background 0.2s ease, color 0.2s ease',
              fontSize: 12.5, color: 'rgba(243,232,223,0.7)', fontWeight: 400,
            }}
          >
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: C.accent2, flexShrink: 0,
            }} />
            {topic}
          </div>
        ))}
      </div>

      {/* ─── Footer ─── */}
      <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(232,209,197,0.10)' }}>
        <p style={{
          fontSize: 10.5,
          color: 'rgba(243,232,223,0.35)',
          lineHeight: 1.6, fontWeight: 300,
        }}>
          For fee &amp; branch details, contact your nearest Aptech center directly.
        </p>
      </div>
    </aside>
  );
}
