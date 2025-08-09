import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverviewBanner = ({ overallStatus, totalSources, activeSources }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-success bg-success/10 border-success/20';
      case 'degraded':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'outage':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'degraded':
        return 'AlertTriangle';
      case 'outage':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'All Systems Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'outage':
        return 'Service Outage';
      default:
        return 'Status Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full border ${getStatusColor(overallStatus)}`}>
            <Icon 
              name={getStatusIcon(overallStatus)} 
              size={24} 
              className={getStatusColor(overallStatus)?.split(' ')?.[0]}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {getStatusText(overallStatus)}
            </h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{activeSources}</div>
            <div className="text-xs text-muted-foreground">Active Sources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalSources}</div>
            <div className="text-xs text-muted-foreground">Total Sources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">99.2%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusOverviewBanner;