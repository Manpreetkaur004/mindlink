import React, { useEffect, useState, useRef } from "react";

const AIChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef(null);

  const QUICK_RESPONSES = [
    "I'm feeling anxious",
    "I'm feeling sad",
    "I'm stressed about school",
    "I need breathing exercises",
    "I'm having trouble sleeping"
  ];

  const CHATBOT_RESPONSES = {
    crisis: [
      "I'm really sorry you're feeling like this. You're not alone — please consider reaching out to someone you trust or calling a helpline in your country. You matter ❤️"
    ],
    anxiety: [
      "It’s okay to feel anxious. Try taking some deep breaths with me. Want a quick breathing exercise?"
    ],
    depression: [
      "I’m sorry to hear that. Talking can help — I’m here for you whenever you need."
    ],
    stress: [
      "Stress can feel overwhelming. Would you like some grounding techniques to help you relax?"
    ],
    sleep: [
      "Sleep is so important! Would you like me to guide you through a relaxing sleep routine?"
    ],
    positive: [
      "That’s great to hear! Keep it up — I’m always here to support you 😊"
    ],
    coping: ["Thank you for sharing. Would you like some coping strategies to help?"]
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  useEffect(() => {
    const persisted = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    if (persisted.length > 0) {
      setMessages(persisted);
      setShowQuickResponses(false);
    }
  }, []);

  useEffect(() => {
    if (messages.length) {
      const last50 = messages.slice(-50);
      localStorage.setItem("chatHistory", JSON.stringify(last50));
    }
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMessage = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setShowQuickResponses(false);
    generateBotResponse(text);
  };

  const generateBotResponse = (userText) => {
    setShowTyping(true);

    const t = userText.toLowerCase();
    const check = (keywords) => keywords.some((k) => t.includes(k));
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "better off dead",
      "want to die",
      "hurt myself",
      "self harm"
    ];
    let reply = "";
    if (check(crisisKeywords)) reply = random(CHATBOT_RESPONSES.crisis);
    else if (
      t.includes("anxious") ||
      t.includes("anxiety") ||
      t.includes("worried") ||
      t.includes("panic")
    )
      reply = random(CHATBOT_RESPONSES.anxiety);
    else if (
      t.includes("sad") ||
      t.includes("depressed") ||
      t.includes("depression") ||
      t.includes("hopeless")
    )
      reply = random(CHATBOT_RESPONSES.depression);
    else if (
      t.includes("stress") ||
      t.includes("overwhelmed") ||
      t.includes("school") ||
      t.includes("exam")
    )
      reply = random(CHATBOT_RESPONSES.stress);
    else if (
      t.includes("sleep") ||
      t.includes("insomnia") ||
      t.includes("tired") ||
      t.includes("can't sleep")
    )
      reply = random(CHATBOT_RESPONSES.sleep);
    else if (
      t.includes("good") ||
      t.includes("great") ||
      t.includes("happy") ||
      t.includes("better")
    )
      reply = random(CHATBOT_RESPONSES.positive);
    else reply = random(CHATBOT_RESPONSES.coping);

    setTimeout(() => {
      setShowTyping(false);
      const botMessage = {
        text: reply,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };
      setMessages((prev) => [...prev, botMessage]);
      setShowQuickResponses(true);
    }, 1500 + Math.random() * 1000);
  };

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear chat history?")) {
      localStorage.removeItem("chatHistory");
      setMessages([]);
      setShowQuickResponses(true);
    }
  };

  return (
    <div className="chat-wrapper">
      <style>{`
        /* smooth slide for chat-box only */
        .chat-box-animate {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUpFade 1s ease forwards;
        }
        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .chat-wrapper {
          padding: 20px;
          min-height: 100vh;
          background: linear-gradient(140deg, #e9e3fb, #d7efe4);
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          margin-top: 0;
        }
        .chat-box {
          width: 820px;
          height: 78vh;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.09);
          display: flex;
          flex-direction: column;
        }
        .chat-header {
          background: #e6defa;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header strong { color:#000; }
        .clear-button {
          background:none;
          padding:6px 14px;
          border:1px solid #777;
          border-radius:8px;
          cursor:pointer;
          color:#000;
        }
        .bot-avatar {
          width:45px;
          height:45px;
          border-radius:50%;
          background:#009FD9;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:22px;
          color:white;
          margin-right:10px;
        }
        .chat-body {
          padding:14px 20px;
          flex:1;
          overflow-y:auto;
        }
        .message-row {
          display:flex;
          margin-bottom:14px;
          opacity:0;
          animation:fadeInBubble 1s ease forwards;
        }
        @keyframes fadeInBubble { to { opacity:1 } }
        .message-row.user { justify-content:flex-end; }
        .message-bubble {
          max-width:75%;
          padding:12px 16px;
          font-size:14px;
          white-space:pre-wrap;
          border-radius:18px;
        }
        .bot .message-bubble {
          background:#d3e8fb;
          color:#000;
          border-bottom-left-radius:0;
        }
        .user .message-bubble {
          background:#5DBAAD;
          color:#fff;
          border-bottom-right-radius:0;
        }
        .timestamp {
          font-size:11px;
          color:#666;
          margin-top:4px;
        }
        .quick-responses {
          padding:12px 16px;
          border-top:1px solid #eee;
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          background:#fff;
        }
        .quick-responses button {
          background:#FFEAD8;
          padding:8px 16px;
          border:none;
          border-radius:18px;
          font-size:13px;
          color:#5d3d29;
          cursor:pointer;
        }
        .quick-responses button:hover { background:#f7d7c2; }
        .chat-input {
          padding:12px 16px;
          border-top:1px solid #eee;
          background:#fff;
          display:flex;
          gap:12px;
        }
        .chat-input textarea {
          flex:1;
          padding:10px 14px;
          resize:none;
          font-size:14px;
          border:1px solid #ccc;
          border-radius:10px;
          color:#000;
        }
        .chat-input button {
          background:#68b7b2;
          color:#fff;
          font-weight:600;
          padding:10px 22px;
          border:none;
          border-radius:10px;
          cursor:pointer;
        }
        .chat-input button:disabled {
          background:#c1c1c1;
          cursor:not-allowed;
        }
      `}</style>

      <div className="chat-box chat-box-animate">
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="bot-avatar">🤖</div>
            <div>
              <div><strong>Mindlink</strong></div>
              <div style={{ fontSize: '12px', color: 'green' }}>Online • Here to help</div>
            </div>
          </div>
          <button className="clear-button" onClick={clearChat}>Clear Chat</button>
        </div>

        <div className="chat-body" ref={chatRef}>
          {messages.length === 0 && (
            <div className="message-row bot">
              <div className="message-bubble">
                Hi there! I'm MindBot, your AI companion. I'm here to listen, support, and help you with coping strategies. How are you feeling today?
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`message-row ${msg.isUser ? "user" : "bot"}`}>
              <div className="message-bubble">{msg.text}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          ))}
          {showTyping && (
            <div className="message-row bot">
              <div className="message-bubble">Typing...</div>
            </div>
          )}
        </div>

        {showQuickResponses && (
          <div className="quick-responses">
            {QUICK_RESPONSES.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}>{q}</button>
            ))}
          </div>
        )}

        <div className="chat-input">
          <textarea
            rows="1"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputMessage);
              }
            }}
          />
          <button onClick={() => sendMessage(inputMessage)} disabled={!inputMessage.trim()}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
