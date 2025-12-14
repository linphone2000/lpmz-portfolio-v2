'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { cx } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleToggle = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // TODO: Replace with actual AI model integration
    // For now, just echo back a placeholder response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a placeholder response. AI integration will be added soon!',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={handleToggle}
        className={cx(
          'fixed bottom-5 right-5 z-40',
          'w-14 h-14 rounded-full',
          'bg-primary-500 hover:bg-primary-600',
          'dark:bg-primary-400 dark:hover:bg-primary-300',
          'text-white dark:text-primary-950',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-200',
          'flex items-center justify-center',
          'group',
          isOpen && 'hidden'
        )}
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 2.5rem))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cx(
              'fixed bottom-5 right-5 left-5 sm:left-auto z-40',
              'w-[calc(100%-2.5rem)] sm:w-full sm:max-w-md',
              'bg-white dark:bg-neutral-900',
              'rounded-2xl shadow-2xl',
              'border border-neutral-200 dark:border-neutral-700',
              'overflow-hidden',
              'flex flex-col',
              'max-h-[calc(100vh-2.5rem)]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-primary-500 dark:bg-primary-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    AI Assistant
                  </h3>
                  <p className="text-white/80 text-xs">Ask me anything</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Start a conversation
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                        Ask me anything about my portfolio, projects, or
                        experience!
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cx(
                          'flex',
                          message.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        )}
                      >
                        <div
                          className={cx(
                            'max-w-[80%] rounded-2xl px-4 py-2',
                            'text-sm',
                            message.sender === 'user'
                              ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-primary-950'
                              : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700'
                          )}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {message.text}
                          </p>
                          <span
                            className={cx(
                              'text-xs mt-1 block',
                              message.sender === 'user'
                                ? 'text-white/70 dark:text-primary-950/70'
                                : 'text-neutral-500 dark:text-neutral-400'
                            )}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSend}
                  className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                >
                  <div className="flex items-end gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className={cx(
                        'flex-1 px-4 py-2',
                        'rounded-xl border border-neutral-300 dark:border-neutral-600',
                        'bg-neutral-50 dark:bg-neutral-800',
                        'text-neutral-900 dark:text-neutral-100',
                        'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
                        'transition-all duration-200'
                      )}
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className={cx(
                        'p-2 rounded-xl',
                        'bg-primary-500 hover:bg-primary-600',
                        'dark:bg-primary-400 dark:hover:bg-primary-300',
                        'text-white dark:text-primary-950',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-all duration-200',
                        'hover:scale-110 active:scale-95'
                      )}
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

