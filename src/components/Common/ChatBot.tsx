'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { cx } from '@/lib/utils';
import { useQnAModel } from '@/hooks/useQnAModel';
import { getPortfolioPassage } from '@/lib/portfolioKnowledge';

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { model, isLoading: isLoadingModel, error: modelError, findAnswer } = useQnAModel();

  // Cache portfolio passage to avoid regenerating on every query
  const portfolioPassage = useMemo(() => getPortfolioPassage(), []);

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || isLoadingModel || !model) return;

    const question = inputValue.trim();
    const lowerQuestion = question.toLowerCase();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Handle greetings and casual conversation
      if (lowerQuestion.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|what's up)/)) {
        const greetingResponse = "Hello! 👋 I'm here to help you learn about this portfolio. Feel free to ask me about projects, experience, skills, education, or anything else you'd like to know!";
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          text: greetingResponse,
          sender: 'assistant',
          timestamp: new Date(),
        }]);
        setIsTyping(false);
        return;
      }

      if (lowerQuestion.match(/(bye|goodbye|see you|farewell|thanks|thank you|thank)/)) {
        const goodbyeResponse = "You're welcome! Feel free to ask more questions anytime. Have a great day! 😊";
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          text: goodbyeResponse,
          sender: 'assistant',
          timestamp: new Date(),
        }]);
        setIsTyping(false);
        return;
      }

      // Use QnA model for actual questions
      const answer = await findAnswer(question, portfolioPassage);

      let responseText: string;
      if (answer && answer.text && answer.text.trim()) {
        // Make the answer feel more conversational
        responseText = formatAnswer(answer.text);
      } else {
        // Provide helpful, friendly fallback responses
        if (lowerQuestion.includes('project')) {
          responseText = "I've built several projects including PropertyApp (a trading dashboard), Minty (personal finance app), an Intelligent Home Surveillance System, Pharmacy Management System, Hotel Booking Platform, and a Peer-to-peer Rental Platform. Would you like to know more about any specific one?";
        } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('job')) {
          responseText = "I have experience as a Backend Lead/Technical Project Manager at an EdTech platform, Junior Developer at HighGround working on React Native apps, and Junior System Engineer at NTT Data Myanmar on FinTech projects. Want details about any specific role?";
        } else if (lowerQuestion.includes('skill') || lowerQuestion.includes('technolog')) {
          responseText = "I work with React Native, React.js, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, TypeScript, JavaScript, Python, and more! I'm experienced in both frontend and backend development. What would you like to know more about?";
        } else if (lowerQuestion.includes('educat') || lowerQuestion.includes('school') || lowerQuestion.includes('degree')) {
          responseText = "I graduated with a BSc (Hons) in Computing – First Class Honours from Edinburgh Napier University, and have a Higher National Diploma in Software Engineering from Info Myanmar College. Interested in my coursework or achievements?";
        } else {
          responseText = "I'd be happy to help! You can ask me about my projects, work experience, skills and technologies, education, or anything else about my background. What would you like to know?";
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error processing your question. Could you try rephrasing it?",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Format answer text to make it more conversational
  const formatAnswer = (text: string): string => {
    if (!text) return text;
    let formatted = text.trim();
    
    // Capitalize first letter
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Ensure it ends with punctuation
    if (!/[.!?]$/.test(formatted)) {
      formatted += '.';
    }
    
    // Clean up common issues
    formatted = formatted.replace(/\s+/g, ' '); // Multiple spaces to single space
    
    return formatted;
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
                  {/* Model Loading State */}
                  {isLoadingModel && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                        <div className="w-8 h-8 border-2 border-primary-500 dark:border-primary-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Loading AI model...
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                        Please wait while we load the AI assistant
                      </p>
                    </div>
                  )}

                  {/* Model Error State */}
                  {modelError && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-error-100 dark:bg-error-900/30 flex items-center justify-center mb-4">
                        <XMarkIcon className="w-8 h-8 text-error-500 dark:text-error-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Failed to load AI model
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                        Please refresh the page to try again
                      </p>
                    </div>
                  )}

                  {/* Empty State - Only show when model is loaded and no messages */}
                  {!isLoadingModel && !modelError && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Hi! How can I help?
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mb-4">
                        Ask me anything about the portfolio, projects, experience, or skills!
                      </p>
                      <div className="flex flex-col gap-2 mt-2 w-full max-w-xs">
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">
                          Try asking:
                        </p>
                        {[
                          "What projects have you built?",
                          "What technologies do you know?",
                          "Tell me about your work experience"
                        ].map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInputValue(suggestion);
                              inputRef.current?.focus();
                            }}
                            className="text-xs text-left px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                          >
                            &quot;{suggestion}&quot;
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.length > 0 && (
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

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
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
                      disabled={!inputValue.trim() || isTyping || isLoadingModel || !model}
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

