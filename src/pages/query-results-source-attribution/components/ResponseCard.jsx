import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResponseCard = ({ response, onCopyResponse, onExportResponse }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatResponseText = (text) => {
    return text?.split('\n')?.map((paragraph, index) => (
      <p key={index} className="mb-3 text-foreground leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            AI Response
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopyResponse(response?.content)}
            iconName="Copy"
            iconSize={16}
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExportResponse(response)}
            iconName="Download"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        {isExpanded ? (
          <div>{formatResponseText(response?.content)}</div>
        ) : (
          <div>
            {formatResponseText(response?.content?.substring(0, 300) + (response?.content?.length > 300 ? '...' : ''))}
          </div>
        )}
      </div>
      {response?.content?.length > 300 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="mt-3"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Response time: {response?.responseTime}ms
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {response?.sourceCount} sources
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              response?.confidence >= 90 ? 'bg-success' :
              response?.confidence >= 70 ? 'bg-warning' : 'bg-error'
            }`} />
            <span className="text-sm font-medium text-card-foreground">
              {response?.confidence}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;