import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import ConversationList from './components/ConversationList';

const SearchHistoryConversations = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedConversations, setSelectedConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock conversation data
  const mockConversations = [
    {
      id: 1,
      query: "What is quantum computing and how does it work?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: "Technology",
      sources: ["Wikipedia", "Academic"],
      messageCount: 5,
      preview: "Quantum computing is a type of computation that harnesses quantum mechanical phenomena...",
      fullResponse: `Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits that can exist in multiple states simultaneously.\n\nKey principles include:\n1. Superposition - qubits can be in multiple states at once\n2. Entanglement - qubits can be correlated in ways that classical physics cannot explain\n3. Quantum interference - allows quantum algorithms to amplify correct answers\n\nThis technology has potential applications in cryptography, drug discovery, financial modeling, and artificial intelligence.`
    },
    {
      id: 2,
      query: "Explain the causes of World War I",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      category: "History",
      sources: ["Wikipedia", "DuckDuckGo"],
      messageCount: 8,
      preview: "World War I was caused by a complex web of factors including imperialism, nationalism...",
      fullResponse: `World War I was caused by a complex web of factors including imperialism, nationalism, militarism, and the alliance system that had developed in Europe by the early 20th century.\n\nMain causes:\n1. Imperialism - European powers competing for colonies\n2. Nationalism - ethnic groups seeking independence\n3. Militarism - arms race between major powers\n4. Alliance system - entangling alliances that escalated conflicts\n5. The assassination of Archduke Franz Ferdinand - the immediate trigger\n\nThe war began in 1914 and lasted until 1918, involving most of the world's great powers.`
    },
    {
      id: 3,
      query: "How do neural networks learn?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      category: "Technology",
      sources: ["Academic", "Wikipedia"],
      messageCount: 12,
      preview: "Neural networks learn through a process called backpropagation, which adjusts weights...",
      fullResponse: `Neural networks learn through a process called backpropagation, which adjusts weights and biases based on the error between predicted and actual outputs.\n\nLearning process:\n1. Forward pass - input data flows through the network\n2. Loss calculation - comparing output with expected result\n3. Backward pass - calculating gradients of the loss function\n4. Weight updates - adjusting parameters to minimize loss\n5. Iteration - repeating the process with training data\n\nThis supervised learning approach allows networks to recognize patterns and make predictions on new data.`
    },
    {
      id: 4,
      query: "What are the themes in Shakespeare\'s Hamlet?",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      category: "Literature",
      sources: ["Wikipedia", "Academic"],
      messageCount: 6,
      preview: "Hamlet explores several major themes including revenge, madness, mortality...",
      fullResponse: `Hamlet explores several major themes including revenge, madness, mortality, and the complexity of human nature.\n\nMajor themes:\n1. Revenge - Hamlet's quest to avenge his father's murder\n2. Madness - both real and feigned insanity throughout the play\n3. Mortality - contemplation of death and the afterlife\n4. Appearance vs Reality - things are not always what they seem\n5. Corruption - moral decay in the Danish court\n6. Inaction vs Action - Hamlet's struggle with decisive action\n\nThese themes are interwoven throughout the tragedy, making it one of Shakespeare's most complex works.`
    },
    {
      id: 5,
      query: "Explain calculus derivatives",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      category: "Mathematics",
      sources: ["Wikipedia", "Academic"],
      messageCount: 9,
      preview: "A derivative represents the rate of change of a function with respect to its variable...",
      fullResponse: `A derivative represents the rate of change of a function with respect to its variable. It's a fundamental concept in calculus that measures how a function changes as its input changes.\n\nKey concepts:\n1. Limit definition - derivative as the limit of difference quotients\n2. Geometric interpretation - slope of the tangent line\n3. Physical interpretation - instantaneous rate of change\n4. Common rules - power rule, product rule, chain rule\n5. Applications - optimization, physics, economics\n\nDerivatives are essential for understanding motion, optimization problems, and many areas of science and engineering.`
    },
    {
      id: 6,
      query: "What is photosynthesis?",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      category: "Science",
      sources: ["Wikipedia", "DuckDuckGo"],
      messageCount: 4,
      preview: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      fullResponse: `Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose. This process is essential for life on Earth as it produces oxygen and forms the base of most food chains.\n\nThe process occurs in two stages:\n1. Light reactions - capture light energy and produce ATP and NADPH\n2. Calvin cycle - use ATP and NADPH to convert CO2 into glucose\n\nOverall equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2\n\nThis process takes place primarily in the chloroplasts of plant cells and is crucial for maintaining atmospheric oxygen levels.`
    }
  ];

  // Initialize conversations on component mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate API loading delay
    setTimeout(() => {
      setConversations(mockConversations);
      setFilteredConversations(mockConversations);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter conversations based on search query and active filters
  useEffect(() => {
    let filtered = [...conversations];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(conversation =>
        conversation?.query?.toLowerCase()?.includes(query) ||
        conversation?.preview?.toLowerCase()?.includes(query) ||
        conversation?.category?.toLowerCase()?.includes(query) ||
        conversation?.sources?.some(source => source?.toLowerCase()?.includes(query))
      );
    }

    // Apply category filters
    const categoryFilters = activeFilters?.filter(filter => 
      ['science', 'technology', 'history', 'literature', 'mathematics']?.includes(filter)
    );
    if (categoryFilters?.length > 0) {
      filtered = filtered?.filter(conversation =>
        categoryFilters?.some(filter => 
          conversation?.category?.toLowerCase() === filter
        )
      );
    }

    // Apply source filters
    const sourceFilters = activeFilters?.filter(filter => 
      ['wikipedia', 'duckduckgo', 'academic']?.includes(filter)
    );
    if (sourceFilters?.length > 0) {
      filtered = filtered?.filter(conversation =>
        sourceFilters?.some(filter => 
          conversation?.sources?.some(source => 
            source?.toLowerCase() === filter?.replace('duckduckgo', 'duckduckgo')
          )
        )
      );
    }

    // Apply date filters
    const dateFilters = activeFilters?.filter(filter => 
      ['today', 'week', 'month']?.includes(filter)
    );
    if (dateFilters?.length > 0) {
      const now = new Date();
      filtered = filtered?.filter(conversation => {
        const conversationDate = new Date(conversation.timestamp);
        
        return dateFilters?.some(filter => {
          switch (filter) {
            case 'today':
              return conversationDate?.toDateString() === now?.toDateString();
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              return conversationDate >= weekAgo;
            case 'month':
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
              return conversationDate >= monthAgo;
            default:
              return true;
          }
        });
      });
    }

    setFilteredConversations(filtered);
  }, [conversations, searchQuery, activeFilters]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilters(prev => {
      if (prev?.includes(filterId)) {
        return prev?.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery('');
  }, []);

  const handleToggleMultiSelect = useCallback(() => {
    setIsMultiSelectMode(prev => !prev);
    setSelectedConversations([]);
  }, []);

  const handleSelectConversation = useCallback((conversationId) => {
    setSelectedConversations(prev => {
      if (prev?.includes(conversationId)) {
        return prev?.filter(id => id !== conversationId);
      } else {
        return [...prev, conversationId];
      }
    });
  }, []);

  const handleExpandConversation = useCallback((conversationId) => {
    // Navigate to full conversation view
    navigate(`/main-chat-interface?conversation=${conversationId}`);
  }, [navigate]);

  const handleDeleteConversation = useCallback((conversationId) => {
    setConversations(prev => prev?.filter(conv => conv?.id !== conversationId));
    setSelectedConversations(prev => prev?.filter(id => id !== conversationId));
  }, []);

  const handleExportConversation = useCallback((conversationId) => {
    const conversation = conversations?.find(conv => conv?.id === conversationId);
    if (conversation) {
      const exportData = {
        query: conversation?.query,
        timestamp: conversation?.timestamp,
        category: conversation?.category,
        sources: conversation?.sources,
        response: conversation?.fullResponse
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `conversation-${conversationId}.json`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [conversations]);

  const handleShareConversation = useCallback((conversationId) => {
    const conversation = conversations?.find(conv => conv?.id === conversationId);
    if (conversation && navigator.share) {
      navigator.share({
        title: 'FP-GPT Conversation',
        text: conversation?.query,
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `Check out this conversation from FP-GPT: "${conversation?.query}"`;
      navigator.clipboard?.writeText(shareText);
    }
  }, [conversations]);

  const handleStartChat = useCallback(() => {
    navigate('/main-chat-interface');
  }, [navigate]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setActiveFilters([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <SearchBar
          onSearch={handleSearch}
          onToggleMultiSelect={handleToggleMultiSelect}
          isMultiSelectMode={isMultiSelectMode}
          selectedCount={selectedConversations?.length}
        />
        
        <FilterChips
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={filteredConversations}
            searchQuery={searchQuery}
            activeFilters={activeFilters}
            isMultiSelectMode={isMultiSelectMode}
            selectedConversations={selectedConversations}
            onSelectConversation={handleSelectConversation}
            onExpandConversation={handleExpandConversation}
            onDeleteConversation={handleDeleteConversation}
            onExportConversation={handleExportConversation}
            onShareConversation={handleShareConversation}
            onStartChat={handleStartChat}
            onClearSearch={handleClearSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryConversations;