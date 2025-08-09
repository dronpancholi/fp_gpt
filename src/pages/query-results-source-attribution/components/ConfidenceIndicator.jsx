import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfidenceIndicator = ({ confidence, methodology, sourceConsensus }) => {
  const getConfidenceLevel = (score) => {
    if (score >= 90) return { level: 'High', color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' };
    if (score >= 70) return { level: 'Medium', color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertCircle' };
    return { level: 'Low', color: 'text-error', bgColor: 'bg-error/10', icon: 'XCircle' };
  };

  const confidenceData = getConfidenceLevel(confidence);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Response Confidence
        </h3>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${confidenceData?.bgColor}`}>
            <Icon name={confidenceData?.icon} size={24} className={confidenceData?.color} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-card-foreground">{confidence}%</span>
              <span className={`px-2 py-1 text-sm font-medium rounded-full ${confidenceData?.bgColor} ${confidenceData?.color}`}>
                {confidenceData?.level}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on source consensus and query complexity
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="w-20 h-20 relative">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${confidenceData?.color} stroke-current`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${confidence}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <h4 className="font-medium text-sm text-card-foreground">Source Consensus</h4>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${sourceConsensus}%` }}
              />
            </div>
            <span className="text-sm font-medium text-card-foreground">{sourceConsensus}%</span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-muted-foreground" />
            <h4 className="font-medium text-sm text-card-foreground">Query Complexity</h4>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5]?.map((level) => (
                <div
                  key={level}
                  className={`w-2 h-4 rounded-sm ${
                    level <= methodology?.complexity ? 'bg-primary' : 'bg-background'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {methodology?.complexity}/5
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <h4 className="font-medium text-sm text-card-foreground">Processing Time</h4>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-card-foreground">
              {methodology?.processingTime}ms
            </span>
            <span className="text-xs text-muted-foreground">avg</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="font-medium text-sm text-card-foreground mb-2">
          Methodology Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Sources Analyzed:</span>
            <span className="ml-2 font-medium text-card-foreground">{methodology?.sourcesAnalyzed}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cross-references:</span>
            <span className="ml-2 font-medium text-card-foreground">{methodology?.crossReferences}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Fact Checks:</span>
            <span className="ml-2 font-medium text-card-foreground">{methodology?.factChecks}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Algorithm Version:</span>
            <span className="ml-2 font-medium text-card-foreground">{methodology?.algorithmVersion}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceIndicator;