import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const RefreshButton = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatLastRefresh = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastRefresh) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-muted-foreground">
        Last updated: {formatLastRefresh()}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        disabled={isRefreshing}
        iconName="RefreshCw"
        iconPosition="left"
        iconSize={16}
        className={isRefreshing ? 'animate-spin' : ''}
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
  );
};

export default RefreshButton;