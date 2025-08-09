import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import MessageThread from './components/MessageThread';
import MessageInput from './components/MessageInput';
import FloatingActionButton from './components/FloatingActionButton';
import ErrorBoundary from '../../components/ErrorBoundary';
import geminiService from '../../services/geminiService';

const MainChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSources, setTypingSources] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sessionId, setSessionId] = useState(() => 
    `session_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`
  );

  // Enhanced API sources for FP-GPT V0.4+ with Gemini integration
  const availableSources = ['Gemini AI', 'Google Knowledge', 'Real-time Analysis'];

  // Welcome message with Gemini integration
  const welcomeMessage = {
    id: 'welcome_' + Date.now(),
    sender: 'ai',
    content: `Welcome to FP-GPT V0.4+ with Google Gemini AI integration! 🚀\n\nI'm now powered by Google's advanced Gemini AI model, which means I can:\n\n• **Understand complex queries** with enhanced context awareness\n• **Provide more accurate responses** with real-time knowledge\n• **Handle multimodal inputs** including text and images\n• **Maintain conversation context** throughout our chat\n\nHow can I assist you today?`,
    sources: ['Gemini AI', 'Google Knowledge'],
    accuracy: 98,
    confidence: 95,
    primarySource: 'Gemini AI',
    timestamp: new Date()
  };

  // Initialize with welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([welcomeMessage]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cleanup chat session on unmount
  useEffect(() => {
    return () => {
      geminiService?.clearChatSession(sessionId);
    };
  }, [sessionId]);

  const handleSendMessage = async (messageContent, attachedFile = null) => {
    if (!messageContent?.trim() && !attachedFile) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageContent || 'Image analysis request',
      timestamp: new Date(),
      hasAttachment: !!attachedFile
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setTypingSources(['Gemini AI', 'Processing...']);

    try {
      // Check if offline
      if (!isOnline) {
        throw new Error('No internet connection');
      }

      let response;
      
      // Handle image + text input
      if (attachedFile && attachedFile?.type?.startsWith('image/')) {
        // Update typing sources for image analysis
        setTypingSources(['Gemini AI', 'Image Analysis', 'Processing...']);
        response = await geminiService?.generateTextFromImage(
          messageContent || "Please analyze this image and describe what you see.",
          attachedFile
        );
      } else {
        // Handle text-only input with chat history
        setTypingSources(['Gemini AI', 'Google Knowledge', 'Analyzing...']);
        response = await geminiService?.chatWithHistory(sessionId, messageContent);
      }

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: response?.content,
        sources: response?.sources || ['Gemini AI'],
        accuracy: response?.accuracy || 90,
        confidence: response?.confidence || 85,
        primarySource: response?.primarySource || 'Gemini AI',
        timestamp: response?.timestamp || new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Add enhanced error message
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: isOnline 
          ? `I apologize, but I'm experiencing technical difficulties with the Gemini AI service right now. Please try again in a moment.\n\n**Error Details:** ${error?.message}\n\n**Troubleshooting:**\n• Check your internet connection\n• Verify your API key is valid\n• Try a simpler query first`
          : `It looks like you're offline. Please check your internet connection and try again.\n\nI'll be ready to help with Gemini AI once you're back online! 🌐`,
        sources: ['System'],
        accuracy: 0,
        confidence: 0,
        primarySource: 'System',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTypingSources([]);
    }
  };

  // Enhanced copy functionality
  const handleCopyMessage = (content) => {
    navigator.clipboard?.writeText(content)?.then(() => {
      // Could show toast notification here
      console.log('Message copied to clipboard');
    })?.catch(err => {
      console.error('Failed to copy message:', err);
    });
  };

  // Enhanced share functionality
  const handleShareMessage = (message) => {
    if (navigator.share) {
      navigator.share({
        title: 'FP-GPT with Gemini AI Response',
        text: message?.content,
        url: window.location?.href
      })?.catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      handleCopyMessage(message?.content);
      console.log('Message copied (share fallback)');
    }
  };

  const handleClearConversation = () => {
    setMessages([welcomeMessage]);
    // Clear the current chat session and create a new one
    geminiService?.clearChatSession(sessionId);
    const newSessionId = `session_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
    setSessionId(newSessionId);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Gemini AI Status Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-blue-200/20 px-4 py-2">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-foreground">
              Powered by Google Gemini AI
            </span>
            <span className="text-muted-foreground">
              • Enhanced accuracy & real-time knowledge
            </span>
          </div>
        </div>

        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-warning text-warning-foreground px-4 py-2 text-center text-sm">
            <span className="font-medium">You're offline.</span> Gemini AI features are unavailable.
          </div>
        )}

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          <MessageThread
            messages={messages}
            isTyping={isTyping}
            typingSources={typingSources}
            onCopyMessage={handleCopyMessage}
            onShareMessage={handleShareMessage}
          />

          {/* Message input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            supportImages={true}
          />
        </div>

        {/* Floating action button */}
        <FloatingActionButton
          onClearConversation={handleClearConversation}
          messageCount={messages?.length}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MainChatInterface;