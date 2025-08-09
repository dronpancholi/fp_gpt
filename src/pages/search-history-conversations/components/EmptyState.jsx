import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-conversations', 
  searchQuery = '',
  onStartChat,
  onClearSearch 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-conversations':
        return {
          icon: 'MessageSquare',
          title: 'No conversations yet',
          description: `Start your first conversation with FP-GPT to see your chat history here. Ask questions about science, technology, history, and more!`,
          primaryAction: {
            label: 'Start Chatting',
            onClick: onStartChat,
            variant: 'default'
          }
        };
      
      case 'no-search-results':
        return {
          icon: 'Search',
          title: 'No conversations found',
          description: `We couldn't find any conversations matching "${searchQuery}". Try different keywords or check your spelling.`,
          primaryAction: {
            label: 'Clear Search',
            onClick: onClearSearch,
            variant: 'outline'
          },
          secondaryAction: {
            label: 'Start New Chat',
            onClick: onStartChat,
            variant: 'default'
          }
        };
      
      case 'no-filtered-results':
        return {
          icon: 'Filter',
          title: 'No conversations match filters',
          description: `No conversations found with the current filter settings. Try adjusting your filters or browse all conversations.`,
          primaryAction: {
            label: 'Clear Filters',
            onClick: onClearSearch,
            variant: 'outline'
          }
        };
      
      default:
        return {
          icon: 'MessageSquare',
          title: 'Nothing here yet',
          description: 'Start exploring to see content appear here.',
          primaryAction: {
            label: 'Get Started',
            onClick: onStartChat,
            variant: 'default'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon 
          name={content?.icon} 
          size={32} 
          className="text-muted-foreground" 
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {content?.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={content?.primaryAction?.variant}
          onClick={content?.primaryAction?.onClick}
          iconName={content?.primaryAction?.variant === 'default' ? 'Plus' : 'RotateCcw'}
          iconPosition="left"
          iconSize={16}
        >
          {content?.primaryAction?.label}
        </Button>
        
        {content?.secondaryAction && (
          <Button
            variant={content?.secondaryAction?.variant}
            onClick={content?.secondaryAction?.onClick}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={16}
          >
            {content?.secondaryAction?.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;