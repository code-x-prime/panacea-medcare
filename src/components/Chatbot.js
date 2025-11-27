// src/components/Chatbot.js
'use client';

import { useState } from 'react';

export default function Chatbot({ locale }) {
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
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col z-50">
          <div className="bg-panacea-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm">How can I help you today?</p>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-panacea-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg">Thinking...</div>
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-panacea-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-panacea-primary text-white rounded hover:bg-panacea-accent transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-panacea-primary text-white rounded-full shadow-lg hover:bg-panacea-accent transition flex items-center justify-center z-40"
      >
        💬
      </button>
    </>
  );
}

