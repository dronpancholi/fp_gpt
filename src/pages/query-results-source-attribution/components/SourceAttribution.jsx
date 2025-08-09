import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourceAttribution = ({ sources, onSourceClick }) => {
  const [expandedSource, setExpandedSource] = useState(null);

  const getSourceIcon = (type) => {
    switch (type) {
      case 'wikipedia':
        return 'BookOpen';
      case 'duckduckgo':
        return 'Search';
      case 'academic':
        return 'GraduationCap';
      default:
        return 'Globe';
    }
  };

  const getSourceBadgeColor = (type) => {
    switch (type) {
      case 'wikipedia':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'duckduckgo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'academic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleSourceExpansion = (sourceId) => {
    setExpandedSource(expandedSource === sourceId ? null : sourceId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Source Attribution
        </h3>
      </div>
      <div className="space-y-4">
        {sources?.map((source) => (
          <div key={source?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getSourceIcon(source?.type)} 
                  size={18} 
                  className="text-muted-foreground mt-1" 
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSourceBadgeColor(source?.type)}`}>
                      {source?.type?.charAt(0)?.toUpperCase() + source?.type?.slice(1)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        source?.reliability >= 90 ? 'bg-success' :
                        source?.reliability >= 70 ? 'bg-warning' : 'bg-error'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {source?.reliability}% reliable
                      </span>
                    </div>
                  </div>
                  <h4 className="font-medium text-card-foreground mb-1">
                    {source?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {source?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Published: {source?.publishDate}</span>
                    <span>Accessed: {source?.accessTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSourceExpansion(source?.id)}
                  iconName={expandedSource === source?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSourceClick(source?.url)}
                  iconName="ExternalLink"
                  iconSize={16}
                >
                  View
                </Button>
              </div>
            </div>

            {expandedSource === source?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <h5 className="font-medium text-sm text-card-foreground mb-2">
                    Source Preview
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {source?.preview}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-sm text-card-foreground mb-2">
                      Key Information
                    </h6>
                    <ul className="space-y-1">
                      {source?.keyPoints?.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={14} className="text-success mt-0.5" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-sm text-card-foreground mb-2">
                      Citation Format
                    </h6>
                    <div className="bg-background border border-border rounded p-3">
                      <code className="text-xs text-muted-foreground font-mono">
                        {source?.citation}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceAttribution;