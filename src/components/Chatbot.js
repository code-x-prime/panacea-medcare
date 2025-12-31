'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { X, Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export default function Chatbot({ locale }) {
  const t = useTranslations('chatbot');
  const isRTL = locale === 'ar';
  const messagesEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: null, email: null, phone: null, country: null, submitted: false });

  // Auto-open chatbot after 2 seconds with greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
    // Add welcome message if no messages
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: locale === 'ar'
          ? 'مرحباً! 👋 أنا إيفا... كيف يمكنني مساعدتك؟'
          : locale === 'fr'
            ? 'Bonjour! 👋 Je suis Eva... Comment puis-je vous aider?'
            : 'Hi! 👋 I am Eva... How can I help you?'
      }]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
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

        // Accumulate lead info from ALL user messages (not just current input)
        const allUserText = [...messages.filter(m => m.role === 'user').map(m => m.content), input].join('\n');

        const emailMatch = allUserText.match(/[\w\.-]+@[\w\.-]+\.\w+/);
        const phoneMatch = allUserText.match(/(?:\+?[\d\s\-\(\)]{10,})/);

        // Split ALL user text into lines for detection
        const allLines = allUserText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        // Common country names for detection
        const countries = ['india', 'usa', 'uk', 'uae', 'dubai', 'saudi', 'qatar', 'oman', 'kuwait', 'bahrain', 'canada', 'australia', 'germany', 'france', 'bangladesh', 'pakistan', 'nepal', 'sri lanka', 'afghanistan', 'iraq', 'iran', 'nigeria', 'kenya', 'south africa', 'egypt', 'morocco', 'russia', 'china', 'japan', 'singapore', 'malaysia', 'indonesia', 'thailand', 'vietnam', 'philippines', 'brazil', 'mexico', 'united states', 'united kingdom', 'saudi arabia'];

        // Words to skip when detecting names (common conversation words)
        const skipWords = ['hello', 'hi', 'hey', 'help', 'interested', 'looking', 'need', 'want', 'please', 'thanks', 'thank', 'yes', 'no', 'ok', 'okay', 'sure', 'fine', 'good', 'great', 'nice', 'treatment', 'surgery', 'doctor', 'hospital', 'medical', 'health', 'care', 'cost', 'price', 'information', 'info'];

        // Try to detect name from various patterns
        let nameMatch = null;

        // Pattern 1: Explicit name declaration like "my name is John" or "I am John"
        const namePattern1 = allUserText.match(/(?:my name is|i'm called|name is|name:|mera naam|naam hai)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
        if (namePattern1 && !skipWords.includes(namePattern1[1].toLowerCase())) {
          nameMatch = namePattern1;
        }

        // Pattern 2: Any line that looks like ONLY a name (single word or two words, starts with capital)
        if (!nameMatch) {
          for (const line of allLines) {
            const lineLower = line.toLowerCase();
            // Skip if it's a country, email, has numbers, or is a common word
            if (countries.includes(lineLower) ||
              line.includes('@') ||
              /\d/.test(line) ||
              skipWords.includes(lineLower)) continue;
            // Check if it looks like a proper name: 2-25 chars, only letters and maybe one space
            if (/^[A-Za-z]+(\s[A-Za-z]+)?$/.test(line) && line.length >= 2 && line.length <= 25) {
              nameMatch = [line, line];
              console.log('Name detected from line:', line);
              break;
            }
          }
        }

        // Detect country
        let countryMatch = null;
        // Pattern 1: "from India", "country: India", etc.
        const countryPattern1 = allUserText.match(/(?:from|country:|i am from|i'm from|living in|based in)\s*([A-Za-z\s]{2,30})/i);
        if (countryPattern1) countryMatch = countryPattern1;

        // Pattern 2: Check if any line matches a known country name
        if (!countryMatch) {
          for (const line of allLines) {
            if (countries.includes(line.toLowerCase())) {
              countryMatch = [line, line];
              break;
            }
          }
        }

        // Update accumulated lead info
        const newLeadInfo = { ...leadInfo };
        if (emailMatch && !newLeadInfo.email) newLeadInfo.email = emailMatch[0];
        if (phoneMatch && !newLeadInfo.phone) newLeadInfo.phone = phoneMatch[0].replace(/[\s\-\(\)]/g, '');
        if (nameMatch && !newLeadInfo.name) newLeadInfo.name = nameMatch[1].trim();
        if (countryMatch && !newLeadInfo.country) newLeadInfo.country = countryMatch[1].trim();

        console.log('Lead info accumulated:', newLeadInfo);

        // Only submit lead when we have email OR phone, and haven't submitted yet
        if ((newLeadInfo.email || newLeadInfo.phone) && !leadInfo.submitted) {
          try {
            await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: newLeadInfo.name || 'Chat User',
                email: newLeadInfo.email || null,
                phone: newLeadInfo.phone || null,
                country: newLeadInfo.country || null,
                message: messages.map(m => m.content).join('\n'),
                source: 'chatbot',
              }),
            });
            newLeadInfo.submitted = true;
            console.log('Lead submitted successfully:', newLeadInfo);
          } catch (err) {
            console.error('Lead submission error:', err);
          }
        }

        setLeadInfo(newLeadInfo);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: t('errorMessage') }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('errorMessage') }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action buttons
  const quickActions = [
    {
      label: locale === 'ar' ? 'استشارة مجانية' : locale === 'fr' ? 'Consultation' : 'Free Consultation',
      message: locale === 'ar' ? 'أريد استشارة طبية مجانية' : locale === 'fr' ? 'Je veux une consultation gratuite' : 'I want a free medical consultation'
    },
    {
      label: locale === 'ar' ? 'تكلفة العلاج' : locale === 'fr' ? 'Coût' : 'Treatment Cost',
      message: locale === 'ar' ? 'ما هي تكلفة العلاج؟' : locale === 'fr' ? 'Quel est le coût du traitement?' : 'What is the treatment cost?'
    },
    {
      label: locale === 'ar' ? 'المستشفيات' : locale === 'fr' ? 'Hôpitaux' : 'Hospitals',
      message: locale === 'ar' ? 'أخبرني عن المستشفيات' : locale === 'fr' ? 'Parlez-moi des hôpitaux' : 'Tell me about hospitals'
    },
  ];

  const handleQuickAction = (message) => {
    setInput(message);
  };

  return (
    <>
      {/* Greeting Bubble - Shows before chat is opened */}
      {showGreeting && !isOpen && (
        <div
          className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-50 animate-bounce-slow`}
          onClick={openChat}
        >
          <div
            data-chat-greeting
            className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] cursor-pointer hover:shadow-panacea-lg transition-shadow border border-gray-100">
            {/* Arrow pointing to button */}
            <div className={`absolute -bottom-2 ${isRTL ? 'left-6' : 'right-6'} w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100`}></div>

            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-panacea-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm font-semibold text-panacea-dark mb-1">
                  {locale === 'ar' ? 'مرحباً! 👋 أنا إيفا' : locale === 'fr' ? 'Bonjour! 👋 Je suis Eva' : 'Hi! 👋 I am Eva'}
                </p>
                <p className="text-xs text-gray-600">
                  {locale === 'ar'
                    ? 'كيف يمكنني مساعدتك؟'
                    : locale === 'fr'
                      ? 'Comment puis-je vous aider?'
                      : 'How can I help you?'}
                </p>
              </div>
            </div>

            {/* Close greeting */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Window - Compact Size */}
      {isOpen && (
        <div
          className={`fixed ${isRTL ? 'left-4' : 'right-4'} ${isMinimized ? 'bottom-24' : 'bottom-20 sm:bottom-6'} z-50 transition-all duration-300`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${isMinimized
            ? 'w-[280px] h-[60px]'
            : 'w-[320px] sm:w-[360px] h-[450px] sm:h-[480px]'
            }`}>
            {/* Compact Header */}
            <div className="bg-panacea-gradient p-3 flex-shrink-0">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                    <MessageCircle className="w-5 h-5 text-panacea-primary" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="font-bold text-white text-sm">{t('title')}</h3>
                    {!isMinimized && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-white/80">{t('subtitle')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content - Hidden when minimized */}
            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className={`w-7 h-7 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${msg.role === 'user'
                          ? 'bg-panacea-gradient text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                          } ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      <div className={`w-7 h-7 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-panacea-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions - Show only when no user messages */}
                {messages.filter(m => m.role === 'user').length === 0 && (
                  <div className="px-3 py-2 bg-white border-t border-gray-100">
                    <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      {quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action.message)}
                          className="px-3 py-1.5 bg-panacea-light text-panacea-primary text-xs font-medium rounded-full hover:bg-panacea-primary hover:text-white transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                  <div className={`flex items-end gap-2 bg-gray-50 rounded-2xl px-3 py-2 border border-gray-200 focus-within:border-panacea-primary focus-within:ring-1 focus-within:ring-panacea-primary/20 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        // Enter without Shift sends the message
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (input.trim() && !isLoading) {
                            sendMessage(e);
                          }
                        }
                        // Shift+Enter allows new line (default behavior)
                      }}
                      placeholder={t('inputPlaceholder')}
                      className={`flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 resize-none min-h-[36px] max-h-[100px] ${isRTL ? 'text-right' : 'text-left'}`}
                      disabled={isLoading}
                      rows={1}
                      style={{ height: 'auto', overflow: 'hidden' }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-8 h-8 bg-panacea-gradient text-white rounded-full flex items-center justify-center hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Button - Smaller */}
      <button
        data-chatbot-toggle
        onClick={isOpen ? () => setIsOpen(false) : openChat}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} w-14 h-14 bg-panacea-gradient text-white rounded-full shadow-xl hover:shadow-panacea-lg transition-all flex items-center justify-center z-40 transform hover:scale-105 group`}
      >
        {isOpen ? (
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {/* Notification Badge */}
        {!isOpen && !showGreeting && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-panacea-accent rounded-full border-2 border-white flex items-center justify-center animate-pulse">
            <span className="text-[10px] font-bold">1</span>
          </span>
        )}
      </button>

      {/* Custom Animation */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
