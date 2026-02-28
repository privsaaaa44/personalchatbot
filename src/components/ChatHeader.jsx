import { C } from '../constants';

export default function ChatHeader() {
  return (
    <div
      className="chat-header"
      style={{
        padding: '20px 32px',
        background: 'rgba(243,232,223,0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(69,40,41,0.08)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      {/* Left — avatar + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.deep}, ${C.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>
          🎓
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: 15, fontWeight: 600, color: C.deep,
          }}>
            Aptech Career Counselor
          </h3>
          <p style={{ fontSize: 11, color: C.mid, fontWeight: 400 }}>
            Academic Advisor · Aptech Pakistan
          </p>
        </div>
      </div>

      {/* Right — status badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(69,40,41,0.06)',
        padding: '6px 14px', borderRadius: 20,
        fontSize: 11, color: C.mid, fontWeight: 500,
      }}>
        <div style={{ width: 7, height: 7, background: '#5cb85c', borderRadius: '50%' }} />
        Online
      </div>
    </div>
  );
}
