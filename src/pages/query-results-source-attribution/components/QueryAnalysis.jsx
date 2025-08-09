import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryAnalysis = ({ query, analysis, onRefreshAnalysis }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getComplexityColor = (level) => {
    switch (level) {
      case 'Simple':
        return 'text-success bg-success/10';
      case 'Moderate':
        return 'text-warning bg-warning/10';
      case 'Complex':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getIntentIcon = (intent) => {
    switch (intent) {
      case 'factual':
        return 'FileText';
      case 'research':
        return 'Search';
      case 'comparison':
        return 'GitCompare';
      case 'explanation':
        return 'HelpCircle';
      default:
        return 'MessageSquare';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-accent" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Query Analysis
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefreshAnalysis}
          iconName="RefreshCw"
          iconSize={16}
        >
          Refresh
        </Button>
      </div>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-2">
          <Icon name="Quote" size={16} className="text-muted-foreground mt-1" />
          <div className="flex-1">
            <h4 className="font-medium text-sm text-card-foreground mb-1">Original Query</h4>
            <p className="text-sm text-muted-foreground italic">"{query}"</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={getIntentIcon(analysis?.intent)} size={16} className="text-primary" />
            <h4 className="font-medium text-sm text-card-foreground">Intent</h4>
          </div>
          <p className="text-lg font-semibold text-card-foreground capitalize">
            {analysis?.intent}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {analysis?.intentDescription}
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <h4 className="font-medium text-sm text-card-foreground">Complexity</h4>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-sm font-medium rounded-full ${getComplexityColor(analysis?.complexity)}`}>
              {analysis?.complexity}
            </span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5]?.map((level) => (
                <div
                  key={level}
                  className={`w-2 h-3 rounded-sm ${
                    level <= analysis?.complexityScore ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <h4 className="font-medium text-sm text-card-foreground">Domain</h4>
          </div>
          <p className="text-lg font-semibold text-card-foreground">
            {analysis?.domain}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Primary subject area
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-card-foreground mb-2">
            Extracted Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis?.keywords?.map((keyword, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-sm rounded-full border ${
                  keyword?.importance === 'high' ?'bg-primary/10 text-primary border-primary/20' 
                    : keyword?.importance === 'medium' ?'bg-warning/10 text-warning border-warning/20' :'bg-muted text-muted-foreground border-border'
                }`}
              >
                {keyword?.term}
                {keyword?.importance === 'high' && (
                  <Icon name="Star" size={12} className="ml-1 inline" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm text-card-foreground">
              Processing Strategy
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-xs text-card-foreground mb-2">
                  Recommended Sources
                </h5>
                <div className="space-y-2">
                  {analysis?.recommendedSources?.map((source, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon 
                        name={source?.type === 'wikipedia' ? 'BookOpen' : 
                              source?.type === 'academic' ? 'GraduationCap' : 'Search'} 
                        size={14} 
                        className="text-muted-foreground" 
                      />
                      <span className="text-sm text-card-foreground">{source?.name}</span>
                      <span className="text-xs text-muted-foreground">({source?.priority})</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-xs text-card-foreground mb-2">
                  Query Routing
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Parallel Processing:</span>
                    <span className="text-card-foreground">{analysis?.parallelProcessing ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Response Time:</span>
                    <span className="text-card-foreground">{analysis?.expectedResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cache Available:</span>
                    <span className="text-card-foreground">{analysis?.cacheAvailable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-medium text-xs text-card-foreground mb-2">
                  Detailed Analysis
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-card-foreground">Semantic Analysis:</span>
                    <p className="text-muted-foreground mt-1">{analysis?.semanticAnalysis}</p>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Context Clues:</span>
                    <ul className="mt-1 space-y-1">
                      {analysis?.contextClues?.map((clue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Dot" size={12} className="text-muted-foreground mt-1" />
                          <span className="text-muted-foreground">{clue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Potential Challenges:</span>
                    <ul className="mt-1 space-y-1">
                      {analysis?.challenges?.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="AlertTriangle" size={12} className="text-warning mt-1" />
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryAnalysis;