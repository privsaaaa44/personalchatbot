import { C, formatMarkdown } from '../constants';

export default function MessageBubble({ role, text, time }) {
  const isBot = role === 'bot';

  return (
    <div
      className="anim-fade-slide"
      style={{
        display: 'flex',
        gap: 12,
        flexDirection: isBot ? 'row' : 'row-reverse',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 34, height: 34,
          borderRadius: '50%',
          flexShrink: 0,
          background: isBot
            ? `linear-gradient(135deg, ${C.deep}, ${C.accent})`
            : C.blush,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          marginTop: 2,
        }}
      >
        {isBot ? '🎓' : '👤'}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '72%',
        display: 'flex', flexDirection: 'column',
        gap: 4,
        alignItems: isBot ? 'flex-start' : 'flex-end',
      }}>
        {/* Bubble */}
        <div
          className={isBot ? 'bot-bubble' : ''}
          style={{
            padding: '13px 17px',
            borderRadius: isBot
              ? '12px 12px 12px 4px'
              : '12px 12px 4px 12px',
            fontSize: 13.5,
            lineHeight: 1.7,
            background: isBot ? C.white : C.deep,
            color: isBot ? '#2c1f20' : C.cream,
            border: isBot ? '1px solid rgba(232,209,197,0.5)' : 'none',
            boxShadow: isBot
              ? '0 2px 16px rgba(69,40,41,0.10)'
              : 'none',
          }}
          dangerouslySetInnerHTML={{
            __html: isBot
              ? formatMarkdown(text)
              : text.replace(/\n/g, '<br>'),
          }}
        />

        {/* Timestamp */}
        <div style={{
          fontSize: 10,
          color: 'rgba(87,89,91,0.5)',
          padding: '0 4px',
          fontWeight: 300,
        }}>
          {time}
        </div>
      </div>
    </div>
  );
}
