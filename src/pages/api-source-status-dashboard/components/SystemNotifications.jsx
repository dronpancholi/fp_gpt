import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemNotifications = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'Wrench';
      case 'outage':
        return 'AlertTriangle';
      case 'update':
        return 'Info';
      case 'resolved':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'maintenance':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'outage':
        return 'text-error bg-error/10 border-error/20';
      case 'update':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'resolved':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!notifications || notifications?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Bell" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">System Notifications</h3>
        </div>
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-muted-foreground">No active notifications</p>
          <p className="text-sm text-muted-foreground">All systems are running smoothly</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="Bell" size={20} className="text-foreground" />
        <h3 className="text-lg font-semibold text-foreground">System Notifications</h3>
        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {notifications?.length}
        </span>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`flex items-start gap-3 p-3 rounded-lg border ${getNotificationColor(notification?.type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Icon 
                name={getNotificationIcon(notification?.type)} 
                size={16} 
                className={getNotificationColor(notification?.type)?.split(' ')?.[0]}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {notification?.title}
                </h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(notification?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification?.message}
              </p>
              {notification?.affectedSources && notification?.affectedSources?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {notification?.affectedSources?.map((source, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              )}
              {notification?.estimatedResolution && (
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated resolution: {notification?.estimatedResolution}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemNotifications;