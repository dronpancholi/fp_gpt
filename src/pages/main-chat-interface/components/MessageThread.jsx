import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageThread = ({ 
  messages = [], 
  isTyping = false, 
  typingSources = [], 
  onCopyMessage, 
  onShareMessage 
}) => {
  const messagesEndRef = useRef(null);

  // Enhanced auto-scroll with smooth behavior
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef?.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    // Scroll when new messages arrive or typing status changes
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Welcome message when no messages */}
        {messages?.length === 0 && !isTyping && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600 dark:text-blue-400"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Welcome to FP-GPT V0.4+
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
              Your advanced AI assistant powered by multi-source intelligence. 
              Ask me anything and get accurate, well-sourced responses with confidence indicators.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                <span>📊</span>
                <span>Accuracy Tracking</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                <span>🎯</span>
                <span>Source Attribution</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                <span>🎤</span>
                <span>Voice Input</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                <span>📄</span>
                <span>PDF Analysis</span>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages?.map((message) => (
          <MessageBubble
            key={message?.id}
            message={message}
            onCopy={onCopyMessage}
            onShare={onShareMessage}
          />
        ))}

        {/* Enhanced typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-6">
            <div className="max-w-[85%] md:max-w-[75%]">
              <TypingIndicator sources={typingSources} />
            </div>
          </div>
        )}

        {/* Scroll anchor with enhanced spacing */}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageThread;