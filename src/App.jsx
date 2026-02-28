import { useState, useRef, useEffect } from 'react';

import Sidebar         from './components/Sidebar';
import ChatHeader      from './components/ChatHeader';
import WelcomeBanner   from './components/WelcomeBanner';
import MessageBubble   from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput       from './components/ChatInput';

import { useChat } from './hooks/useChat';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const { messages, isTyping, sendMessage } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function handleSend(overrideText) {
    const text = overrideText ?? inputValue;
    if (!text.trim()) return;
    setInputValue('');
    await sendMessage(text);
  }

  const showWelcome = messages.length === 0;

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* ─── Sidebar ─── */}
      <Sidebar />

      {/* ─── Main Chat Panel ─── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <ChatHeader />

        {/* Messages scroll area */}
        <div
          className="messages-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {showWelcome && (
            <WelcomeBanner onQuickSend={(text) => handleSend(text)} />
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              text={msg.text}
              time={msg.time}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {/* Anchor for auto-scroll */}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={() => handleSend()}
          disabled={isTyping}
        />
      </main>
    </div>
  );
}
