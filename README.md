# 🎓 Aptech Career Counselor

An official academic advisor chatbot for **Aptech Pakistan**, powered by Claude AI.

---

## 📁 Project Structure

```
aptech-counselor/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Left panel with brand & topics
│   │   ├── ChatHeader.jsx       # Top bar with status
│   │   ├── WelcomeBanner.jsx    # Initial greeting + quick starters
│   │   ├── MessageBubble.jsx    # Individual chat messages
│   │   ├── TypingIndicator.jsx  # Animated "..." while AI responds
│   │   └── ChatInput.jsx        # Textarea + send button
│   ├── hooks/
│   │   └── useChat.js           # All chat logic & API calls
│   ├── constants.js             # Colors, system prompt, topics, helpers
│   ├── App.jsx                  # Root component, layout
│   ├── main.jsx                 # React DOM entry point
│   └── index.css                # Global styles & animations
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 3. Build for production
```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

### API Key
The chatbot calls the Anthropic API directly from the browser. For **production** use, you should proxy requests through your own backend to keep the API key secure.

To add your key via a backend proxy, update `src/hooks/useChat.js`:

```js
// Replace the fetch call with your own proxy endpoint:
const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages, system: SYSTEM_PROMPT }),
});
```

### Customizing the Bot
- **System prompt** → `src/constants.js` → `SYSTEM_PROMPT`
- **Sidebar topics** → `src/constants.js` → `TOPICS`
- **Quick starter buttons** → `src/constants.js` → `QUICK_STARTERS`
- **Colors** → `src/constants.js` → `C`

---

## 🎨 Design

| Token | Value |
|-------|-------|
| Deep Burgundy | `rgb(69, 40, 41)` |
| Slate Gray | `rgb(87, 89, 91)` |
| Blush | `rgb(232, 209, 197)` |
| Cream | `#F3E8DF` |
| Accent | `#a0604a` / `#c4846c` |

**Fonts:** Lora (serif headings) + Jost (UI body text)

---

## 🤖 Bot Scope

The counselor **only** answers questions about:
- CPISM & ADSE programs
- Software development & programming
- Cybersecurity careers
- IT skills & career paths
- Aptech student guidance

Out-of-scope questions are politely declined and redirected.

---

Built with ❤️ for Aptech Pakistan
