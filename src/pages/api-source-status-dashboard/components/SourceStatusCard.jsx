import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SourceStatusCard = ({ source }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-success';
      case 'degraded':
        return 'bg-warning';
      case 'outage':
        return 'bg-error';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };

  const getResponseTimeColor = (responseTime) => {
    if (responseTime < 2000) return 'text-success';
    if (responseTime < 4000) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={source?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{source?.name}</h3>
            <p className="text-sm text-muted-foreground">{source?.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(source?.status)}`}></div>
          <span className="text-sm font-medium text-foreground">
            {getStatusText(source?.status)}
          </span>
        </div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className={`text-lg font-bold ${getResponseTimeColor(source?.responseTime)}`}>
            {source?.responseTime}ms
          </div>
          <div className="text-xs text-muted-foreground">Response Time</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-success">
            {source?.successRate}%
          </div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-foreground">
            {source?.queriesProcessed}
          </div>
          <div className="text-xs text-muted-foreground">Queries/24h</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-error">
            {source?.errorRate}%
          </div>
          <div className="text-xs text-muted-foreground">Error Rate</div>
        </div>
      </div>
      {/* Recent Queries */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Recent Query Examples</h4>
        <div className="space-y-2">
          {source?.recentQueries?.slice(0, 2)?.map((query, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
              <span className="text-muted-foreground truncate flex-1 mr-2">
                "{query?.query}"
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${query?.status === 'success' ? 'text-success' : 'text-error'}`}>
                  {query?.responseTime}ms
                </span>
                <Icon 
                  name={query?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                  size={14} 
                  className={query?.status === 'success' ? 'text-success' : 'text-error'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
      >
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="mr-1"
        />
        {isExpanded ? 'Show Less' : 'Show More Details'}
      </button>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-4">
          {/* Additional Queries */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">All Recent Queries</h5>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {source?.recentQueries?.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-xs">
                  <span className="text-muted-foreground truncate flex-1 mr-2">
                    "{query?.query}"
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{query?.timestamp}</span>
                    <span className={query?.status === 'success' ? 'text-success' : 'text-error'}>
                      {query?.responseTime}ms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trends */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Performance Trends</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/30 rounded">
                <div className="text-sm font-medium text-foreground">Avg Response Time</div>
                <div className="text-xs text-muted-foreground">Last 24h: {source?.avgResponseTime}ms</div>
              </div>
              <div className="p-3 bg-muted/30 rounded">
                <div className="text-sm font-medium text-foreground">Peak Load Time</div>
                <div className="text-xs text-muted-foreground">{source?.peakLoadTime}</div>
              </div>
            </div>
          </div>

          {/* Recovery Information */}
          {source?.status !== 'operational' && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Clock" size={14} className="text-warning" />
                <span className="text-sm font-medium text-warning">Recovery Information</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Estimated recovery time: {source?.estimatedRecovery || 'Unknown'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SourceStatusCard;