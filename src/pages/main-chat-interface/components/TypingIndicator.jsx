import React from 'react';

const TypingIndicator = ({ sources = [] }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="bg-card text-card-foreground border border-border rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex items-center space-x-2">
            {/* Animated dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-muted-foreground">FP-GPT is thinking...</span>
          </div>
          
          {/* Progress indicators for multi-source queries */}
          {sources?.length > 0 && (
            <div className="mt-3 space-y-2">
              {sources?.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">
                    Querying {source}...
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;