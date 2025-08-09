import React, { useState } from 'react';
import Icon from '../AppIcon';

const ConfidenceIndicator = ({ confidence = 0, sourceType = 'Unknown', className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 90) return 'CheckCircle2';
    if (confidence >= 75) return 'Shield';
    if (confidence >= 60) return 'Info';
    if (confidence >= 40) return 'AlertTriangle';
    return 'AlertCircle';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    if (confidence >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSourceTypeIcon = (sourceType) => {
    switch (sourceType?.toLowerCase()) {
      case 'wikipedia':
        return 'BookOpen';
      case 'duckduckgo': case'web':
        return 'Search';
      case 'academic':
        return 'GraduationCap';
      case 'reasoning':
        return 'Brain';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center space-x-1 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Confidence Icon */}
      <Icon 
        name={getConfidenceIcon(confidence)} 
        size={14} 
        className={`${getConfidenceColor(confidence)} cursor-help`}
      />
      
      {/* Source Type Icon */}
      <Icon 
        name={getSourceTypeIcon(sourceType)} 
        size={12} 
        className="text-muted-foreground cursor-help"
      />

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-md shadow-lg z-50 whitespace-nowrap">
          <div className="text-xs">
            <div className="font-medium text-foreground">
              Confidence: {confidence}%
            </div>
            <div className="text-muted-foreground">
              Source: {sourceType}
            </div>
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
        </div>
      )}
    </div>
  );
};

export default ConfidenceIndicator;