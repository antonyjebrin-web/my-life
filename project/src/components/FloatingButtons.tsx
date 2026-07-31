import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone, MessageCircle, X, Send } from 'lucide-react';
import { SITE } from '@/data/site';

const WHATSAPP_NUMBER = '919043435765';
const WHATSAPP_MESSAGE = 'welcome buddy to kanniyakumari';

export default function FloatingButtons() {
  const [show, setShow] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (chatOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [chatOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setChatOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      {/* WhatsApp Chat Popup */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2 w-72 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-white/20 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-white">WhatsApp</p>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="rounded-full p-1 text-white/80 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Input */}
            <div className="p-3">
              <div className="mb-2 rounded-lg bg-gray-100 p-3 dark:bg-slate-700">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  👋 Hi! How can I help you plan your trip to Kanyakumari?
                </p>
              </div>
              <div className="flex items-end gap-2 rounded-xl border border-gray-200 p-2 dark:border-slate-600">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="max-h-24 flex-1 resize-none bg-transparent text-sm outline-none dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ocean-600 shadow-card ring-1 ring-gray-100 transition-transform hover:scale-110 dark:bg-slate-800 dark:text-ocean-300 dark:ring-white/10"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-600 text-white shadow-card transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5" />
      </a>

      <motion.button
        onClick={() => {
          const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        }}
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-6 w-6" />
      </motion.button>
    </div>
  );
}
