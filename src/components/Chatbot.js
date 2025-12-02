'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Send, MessageCircle, Paperclip, Smile } from 'lucide-react';

export default function Chatbot({ locale }) {
  const t = useTranslations('chatbot');
  const isRTL = locale === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (excluding system messages)
      const conversationHistory = updatedMessages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({ role: msg.role, content: msg.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          locale: locale || 'en',
          conversationHistory
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);

        // Create lead if user provided contact info
        if (input.toLowerCase().includes('@') || input.match(/\d{10,}/)) {
          try {
            const emailMatch = input.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            const phoneMatch = input.match(/\d{10,}/);
            const nameMatch = input.match(/(?:my name is|i'm|i am|name:)\s*([A-Za-z\s]+)/i);

            if (emailMatch || phoneMatch) {
              await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: nameMatch ? nameMatch[1].trim() : 'Chat User',
                  email: emailMatch ? emailMatch[0] : 'no-email@example.com',
                  phone: phoneMatch ? phoneMatch[0] : null,
                  message: input,
                  source: 'chatbot',
                }),
              });
            }
          } catch (err) {
            // Silently fail lead creation
          }
        }
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: t('errorMessage') }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('errorMessage') }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 ${isRTL ? 'left-4' : 'right-4'} w-[320px] sm:w-[350px] md:w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-panacea-primary to-panacea-dark p-5 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className={`flex items-center justify-between relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Bot Avatar */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-panacea-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className="font-bold text-white text-lg">{t('title')}</h3>
                  <p className="text-xs text-white/80">{t('subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-panacea-primary" />
                </div>
                <p className="text-gray-600 font-medium mb-2">{t('welcomeTitle')}</p>
                <p className="text-sm text-gray-500">{t('welcomeMessage')}</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')} ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className={`w-8 h-8 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'user'
                    ? 'bg-gradient-to-r from-panacea-primary to-panacea-dark text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`flex ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                <div className={`w-8 h-8 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className={`flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200 focus-within:border-panacea-primary focus-within:ring-2 focus-within:ring-panacea-primary/20 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                className="text-gray-400 hover:text-panacea-primary transition-colors"
                disabled={isLoading}
              >
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('inputPlaceholder')}
                className={`flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="text-gray-400 hover:text-panacea-primary transition-colors hidden md:block"
                disabled={isLoading}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-gradient-to-r from-panacea-primary to-panacea-dark text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} w-16 h-16 bg-gradient-to-r from-panacea-primary to-panacea-dark text-white rounded-full shadow-2xl hover:shadow-panacea-primary/50 transition-all flex items-center justify-center z-40 transform hover:scale-110 group`}
      >
        {isOpen ? (
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        )}
        {/* Notification Badge */}
        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-panacea-accent rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs font-bold">1</span>
          </div>
        )}
      </button>
    </>
  );
}
