"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "How much do you charge?",
  "How can I hire you?",
  "What services do you offer?",
  "Tell me about your projects",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! 👋 I'm Isayas's AI assistant. I can answer questions about his skills, services, pricing, and how to hire him. What would you like to know?",
  timestamp: new Date(),
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open chat after 4 seconds on first visit
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("ai_chat_opened");
    if (alreadyOpened) return;

    // Show speech bubble at 2s
    const bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 2000);

    // Auto-open chat at 5s
    const openTimer = setTimeout(() => {
      setShowBubble(false);
      setIsOpen(true);
      sessionStorage.setItem("ai_chat_opened", "true");
    }, 5000);

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(openTimer);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const userMsg: Message = {
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });

      const data = await res.json();
      const reply =
        data.reply ||
        "Sorry, I couldn't process that. Please try again.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now. Please contact Isayas directly at iyasu4313@gmail.com 📧",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
    setInput("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    setBubbleDismissed(true);
    sessionStorage.setItem("ai_chat_opened", "true");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* ── Auto speech bubble ── */}
      <AnimatePresence>
        {showBubble && !bubbleDismissed && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-[220px]"
          >
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white text-sm px-4 py-3 rounded-2xl rounded-br-sm shadow-xl shadow-purple-500/30">
              <button
                onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
              <p className="font-semibold mb-0.5">👋 Hi there!</p>
              <p className="text-purple-100 text-xs">
                Ask me anything about Isayas&apos;s skills & services!
              </p>
              {/* Triangle */}
              <div className="absolute -bottom-2 right-3 w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-pink-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[350px] sm:w-[390px] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-purple-500/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <img
                      src="/profile.jpg"
                      alt="Isayas"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <Bot className="w-5 h-5 text-white absolute" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Isayas&apos;s AI Assistant
                  </p>
                  <p className="text-purple-200 text-xs">
                    🟢 Online · Typically replies instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-950 flex flex-col"
                >
                  {/* Messages area */}
                  <div
                    className="overflow-y-auto p-4 space-y-4 scroll-smooth"
                    style={{ maxHeight: "320px", minHeight: "200px" }}
                  >
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-2.5 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                            msg.role === "assistant"
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : "bg-gray-700"
                          }`}
                        >
                          {msg.role === "assistant" ? (
                            <Bot className="w-4 h-4 text-white" />
                          ) : (
                            <User className="w-4 h-4 text-gray-300" />
                          )}
                        </div>

                        {/* Bubble */}
                        <div
                          className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "assistant"
                              ? "bg-gray-800 text-gray-100 rounded-tl-sm"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm"
                          }`}
                        >
                          {/* Render **bold** markdown */}
                          {msg.content
                            .split(/(\*\*[^*]+\*\*)/)
                            .map((part, j) =>
                              part.startsWith("**") &&
                              part.endsWith("**") ? (
                                <strong key={j}>{part.slice(2, -2)}</strong>
                              ) : (
                                <span key={j} className="whitespace-pre-line">
                                  {part}
                                </span>
                              )
                            )}
                          <p
                            className={`text-xs mt-1 ${
                              msg.role === "assistant"
                                ? "text-gray-500"
                                : "text-purple-200"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2.5"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                          {[0, 150, 300].map((delay) => (
                            <span
                              key={delay}
                              className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggested questions — show only at start */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Quick questions:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendMessage(q)}
                            className="px-2.5 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300 border border-purple-700/30 hover:bg-purple-900/60 hover:border-purple-500 transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input area */}
                  <div className="p-3 border-t border-gray-800/80">
                    <div className="flex items-center gap-2 bg-gray-900 rounded-xl border border-gray-700 focus-within:border-purple-500 transition-colors px-3 py-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        maxLength={300}
                        disabled={loading}
                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
                      />
                      <motion.button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                        className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Send className="w-3.5 h-3.5 text-white" />
                      </motion.button>
                    </div>
                    <p className="text-center text-gray-600 text-xs mt-2">
                      AI Assistant · Isayas Fikadu Portfolio
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Button ── */}
      <motion.button
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 flex items-center justify-center hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={
          !isOpen
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(147,51,234,0.4)",
                  "0 0 0 12px rgba(147,51,234,0)",
                  "0 0 0 0 rgba(147,51,234,0)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
