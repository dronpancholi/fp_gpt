import React, { useState, useEffect } from 'react';
import ConversationCard from './ConversationCard';
import EmptyState from './EmptyState';
import Icon from '../../../components/AppIcon';

const ConversationList = ({ 
  conversations, 
  searchQuery,
  activeFilters,
  isMultiSelectMode,
  selectedConversations,
  onSelectConversation,
  onExpandConversation,
  onDeleteConversation,
  onExportConversation,
  onShareConversation,
  onStartChat,
  onClearSearch,
  isLoading 
}) => {
  const [displayedConversations, setDisplayedConversations] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    // Reset pagination when conversations change
    setDisplayedConversations(conversations?.slice(0, ITEMS_PER_PAGE));
    setHasMore(conversations?.length > ITEMS_PER_PAGE);
  }, [conversations]);

  const loadMoreConversations = () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const currentLength = displayedConversations?.length;
      const nextBatch = conversations?.slice(currentLength, currentLength + ITEMS_PER_PAGE);
      
      setDisplayedConversations(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch?.length < conversations?.length);
      setLoadingMore(false);
    }, 500);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreConversations();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer?.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer?.unobserve(sentinel);
      }
    };
  }, [hasMore, loadingMore, displayedConversations]);

  const getEmptyStateType = () => {
    if (conversations?.length === 0 && !searchQuery && activeFilters?.length === 0) {
      return 'no-conversations';
    } else if (conversations?.length === 0 && searchQuery) {
      return 'no-search-results';
    } else if (conversations?.length === 0 && activeFilters?.length > 0) {
      return 'no-filtered-results';
    }
    return 'no-conversations';
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="flex space-x-2 mb-3">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-20"></div>
            </div>
            <div className="h-3 bg-muted rounded w-full mb-1"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedConversations?.length === 0) {
    return (
      <EmptyState
        type={getEmptyStateType()}
        searchQuery={searchQuery}
        onStartChat={onStartChat}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <div className="pb-4">
      {/* Desktop Grid Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-4 p-4">
          {displayedConversations?.map((conversation) => (
            <ConversationCard
              key={conversation?.id}
              conversation={conversation}
              onExpand={onExpandConversation}
              onDelete={onDeleteConversation}
              onExport={onExportConversation}
              onShare={onShareConversation}
              isSelected={selectedConversations?.includes(conversation?.id)}
              onSelect={onSelectConversation}
              isMultiSelectMode={isMultiSelectMode}
            />
          ))}
        </div>
      </div>
      {/* Mobile List Layout */}
      <div className="lg:hidden">
        <div className="space-y-3 p-4">
          {displayedConversations?.map((conversation) => (
            <ConversationCard
              key={conversation?.id}
              conversation={conversation}
              onExpand={onExpandConversation}
              onDelete={onDeleteConversation}
              onExport={onExportConversation}
              onShare={onShareConversation}
              isSelected={selectedConversations?.includes(conversation?.id)}
              onSelect={onSelectConversation}
              isMultiSelectMode={isMultiSelectMode}
            />
          ))}
        </div>
      </div>
      {/* Infinite Scroll Sentinel */}
      {hasMore && (
        <div id="scroll-sentinel" className="flex justify-center py-4">
          {loadingMore ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span className="text-sm">Loading more conversations...</span>
            </div>
          ) : (
            <div className="h-4"></div>
          )}
        </div>
      )}
      {/* End of Results Indicator */}
      {!hasMore && displayedConversations?.length > ITEMS_PER_PAGE && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            You've reached the end of your conversation history
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;