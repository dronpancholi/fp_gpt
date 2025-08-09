import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationCard = ({ 
  conversation, 
  onExpand, 
  onDelete, 
  onExport, 
  onShare,
  isSelected,
  onSelect,
  isMultiSelectMode 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (isMultiSelectMode) {
      onSelect(conversation?.id);
    } else {
      setIsExpanded(!isExpanded);
      if (onExpand) onExpand(conversation?.id);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) {
      return date?.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'Wikipedia':
        return 'bg-blue-100 text-blue-800';
      case 'DuckDuckGo':
        return 'bg-green-100 text-green-800';
      case 'Academic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Science':
        return 'bg-emerald-100 text-emerald-800';
      case 'Technology':
        return 'bg-blue-100 text-blue-800';
      case 'History':
        return 'bg-amber-100 text-amber-800';
      case 'Literature':
        return 'bg-rose-100 text-rose-800';
      case 'Mathematics':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      <div 
        className="p-4 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
              {conversation?.query}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{formatTimestamp(conversation?.timestamp)}</span>
              <span>•</span>
              <span>{conversation?.messageCount} messages</span>
            </div>
          </div>
          
          {isMultiSelectMode && (
            <div className="ml-3 flex-shrink-0">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                isSelected 
                  ? 'bg-primary border-primary' :'border-border bg-background'
              }`}>
                {isSelected && (
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            getCategoryColor(conversation?.category)
          }`}>
            {conversation?.category}
          </span>
          
          {conversation?.sources?.map((source, index) => (
            <span 
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                getSourceBadgeColor(source)
              }`}
            >
              {source}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {conversation?.preview}
        </p>

        {isExpanded && (
          <div className="border-t border-border pt-3 mt-3">
            <div className="space-y-2">
              <div className="text-xs font-medium text-foreground mb-2">
                Full Response Preview:
              </div>
              <p className="text-sm text-muted-foreground">
                {conversation?.fullResponse}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
            <span className="text-xs text-muted-foreground">
              {isExpanded ? 'Collapse' : 'Expand'}
            </span>
          </div>

          {!isMultiSelectMode && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="xs"
                iconName="Share2"
                iconSize={14}
                onClick={(e) => {
                  e?.stopPropagation();
                  onShare(conversation?.id);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="Download"
                iconSize={14}
                onClick={(e) => {
                  e?.stopPropagation();
                  onExport(conversation?.id);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Export
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="Trash2"
                iconSize={14}
                onClick={(e) => {
                  e?.stopPropagation();
                  onDelete(conversation?.id);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;