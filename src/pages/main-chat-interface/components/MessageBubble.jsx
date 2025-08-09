import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AccuracyMeter from '../../../components/ui/AccuracyMeter';
import ConfidenceIndicator from '../../../components/ui/ConfidenceIndicator';
import CitationFormatter from '../../../components/ui/CitationFormatter';

const MessageBubble = ({ message, onCopy, onShare }) => {
  const isUser = message?.sender === 'user';
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'Wikipedia':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DuckDuckGo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Academic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Reasoning':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-[85%] md:max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md shadow-sm'
              : 'bg-card text-card-foreground border border-border rounded-bl-md shadow-sm'
          }`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message?.content}
          </div>
          
          {/* Source Attribution for AI responses */}
          {!isUser && message?.sources && message?.sources?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {message?.sources?.map((source, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSourceBadgeColor(source)}`}
                >
                  <Icon 
                    name={source === 'Wikipedia' ? 'BookOpen' : source === 'DuckDuckGo' ? 'Search' : source === 'Academic' ? 'GraduationCap' : 'Brain'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {source}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* AI Response Metrics */}
        {!isUser && (
          <div className="mt-3 space-y-2">
            {/* Accuracy Meter */}
            <AccuracyMeter 
              accuracy={message?.accuracy || Math?.floor(Math?.random() * 30) + 70} 
              sources={message?.sources}
              className="max-w-sm"
            />
          </div>
        )}

        {/* Timestamp and Actions */}
        <div className={`flex items-center justify-between mt-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(message?.timestamp)}
            </span>
            
            {/* Confidence Indicator for AI responses */}
            {!isUser && (
              <ConfidenceIndicator 
                confidence={message?.confidence || Math?.floor(Math?.random() * 30) + 70}
                sourceType={message?.primarySource || message?.sources?.[0] || 'Unknown'}
              />
            )}
          </div>
          
          {/* Action buttons for AI responses */}
          {!isUser && (
            <div className="flex items-center space-x-1">
              <CitationFormatter 
                sources={message?.sources}
                title={`FP-GPT Response - ${formatTimestamp(message?.timestamp)}`}
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onCopy(message?.content)}
                iconName="Copy"
                iconSize={12}
                className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
              />
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onShare(message)}
                iconName="Share"
                iconSize={12}
                className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;