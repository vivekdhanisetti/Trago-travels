import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes, FaRobot, FaUserCircle, FaMicrophone } from "react-icons/fa";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 How can I help you today?" }
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Text-to-Speech
  const speakText = (text) => {
    if (!window.speechSynthesis || !text) return;

    try {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error("Voice Output Error:", err);
    }
  };

  // ✅ Voice Input (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser. Use Google Chrome.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setText(voiceText);
      };

      recognition.onerror = (e) => console.error("Speech error:", e.error);
      recognition.start();
    } catch (err) {
      console.error("Speech start failed:", err);
    }
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 350);
    } else setIsOpen(true);
  };

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, typing]);

  const sendMessage = () => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setText("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const botReply = "Thank you! Our team will contact you shortly 😊";
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
      speakText(botReply);
    }, 1200);
  };

  return (
    <>
      {!isOpen && (
        <div className="chat-icon" onClick={handleToggle}>
          <FaComments size={28} />
        </div>
      )}

      {isOpen && (
        <div className={`chat-popup ${isClosing ? "hide" : ""}`}>
          <div className="chat-header">
            <span>Support Assistant</span>
            <FaTimes className="close-btn" onClick={handleToggle} />
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.from}`}>
                <div className="avatar">
                  {msg.from === "bot" ? (
                    <FaRobot size={22} />
                  ) : (
                    <FaUserCircle size={22} />
                  )}
                </div>
                <div
                  className={`msg fade-in ${
                    msg.from === "user" ? "user-gradient" : "bot-bubble"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="msg-row bot">
                <div className="avatar">
                  <FaRobot size={22} />
                </div>
                <div className="msg bot-bubble typing-bubble">
                  Agent is typing<span className="dots"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* ✅ INPUT AREA + MIC BUTTON */}
          <div className="chat-input">
            <input
              type="text"
              value={text}
              placeholder="Type or speak..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button className="mic-btn" onClick={startListening}>
              <FaMicrophone size={18} />
            </button>

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
