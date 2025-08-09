import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showCachedMessage, setShowCachedMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowCachedMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowCachedMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showCachedMessage) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className={`p-4 rounded-lg border shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-success/10 border-success/20 text-success' :'bg-warning/10 border-warning/20 text-warning'
      }`}>
        <div className="flex items-center gap-3">
          <Icon 
            name={isOnline ? 'Wifi' : 'WifiOff'} 
            size={20} 
            className={isOnline ? 'text-success' : 'text-warning'}
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium">
              {isOnline ? 'Connection Restored' : 'You\'re Offline'}
            </h4>
            <p className="text-xs opacity-80">
              {isOnline 
                ? 'Live data is now available' :'Showing cached status data'
              }
            </p>
          </div>
          {isOnline && (
            <button
              onClick={() => setShowCachedMessage(false)}
              className="text-success hover:text-success/80 transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;