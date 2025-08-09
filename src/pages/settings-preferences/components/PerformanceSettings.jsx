import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PerformanceSettings = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const cacheOptions = [
    { value: 'disabled', label: 'Disabled', description: 'No caching, always fetch fresh results' },
    { value: '1hour', label: '1 Hour', description: 'Cache results for one hour' },
    { value: '6hours', label: '6 Hours', description: 'Cache results for six hours' },
    { value: '24hours', label: '24 Hours', description: 'Cache results for one day' },
    { value: '7days', label: '7 Days', description: 'Cache results for one week' }
  ];

  const offlineModeOptions = [
    { value: 'disabled', label: 'Disabled', description: 'Show error when offline' },
    { value: 'cached', label: 'Cached Only', description: 'Show only cached responses when offline' },
    { value: 'graceful', label: 'Graceful Degradation', description: 'Show helpful offline message with cached data' }
  ];

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  const getCacheStatus = () => {
    const cacheSize = 156; // Mock cache size in KB
    const cacheEntries = 23; // Mock number of cached entries
    
    return (
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium text-card-foreground">Cache Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm text-success font-medium">Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Cache Size</p>
            <p className="font-medium text-card-foreground">{cacheSize} KB</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cached Queries</p>
            <p className="font-medium text-card-foreground">{cacheEntries}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Performance Settings</h3>
          <p className="text-sm text-muted-foreground">Optimize speed and reliability</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Caching Preferences */}
        <div>
          <Select
            label="Response Caching"
            description="Cache frequently asked queries for faster responses"
            options={cacheOptions}
            value={localSettings?.cacheTimeout}
            onChange={(value) => handleSettingChange('cacheTimeout', value)}
            className="mb-4"
          />
          {localSettings?.cacheTimeout !== 'disabled' && getCacheStatus()}
        </div>

        {/* Offline Mode */}
        <div>
          <Select
            label="Offline Mode Behavior"
            description="How to handle requests when internet is unavailable"
            options={offlineModeOptions}
            value={localSettings?.offlineMode}
            onChange={(value) => handleSettingChange('offlineMode', value)}
            className="mb-6"
          />
        </div>

        {/* Performance Optimizations */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Performance Optimizations</h4>
          <div className="space-y-4">
            {/* Preload Popular Queries */}
            <div>
              <Checkbox
                label="Preload Popular Queries"
                description="Cache common questions in the background for instant responses"
                checked={localSettings?.preloadPopular}
                onChange={(e) => handleSettingChange('preloadPopular', e?.target?.checked)}
              />
            </div>

            {/* Compress Responses */}
            <div>
              <Checkbox
                label="Compress API Responses"
                description="Reduce bandwidth usage by compressing data (may slightly increase processing time)"
                checked={localSettings?.compressResponses}
                onChange={(e) => handleSettingChange('compressResponses', e?.target?.checked)}
              />
            </div>

            {/* Background Refresh */}
            <div>
              <Checkbox
                label="Background Cache Refresh"
                description="Update cached responses in the background to keep data fresh"
                checked={localSettings?.backgroundRefresh}
                onChange={(e) => handleSettingChange('backgroundRefresh', e?.target?.checked)}
              />
            </div>

            {/* Predictive Loading */}
            <div>
              <Checkbox
                label="Predictive Loading"
                description="Anticipate and preload related queries based on conversation context"
                checked={localSettings?.predictiveLoading}
                onChange={(e) => handleSettingChange('predictiveLoading', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Performance Monitoring */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-base font-medium text-card-foreground mb-3">Performance Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Avg Response Time</p>
              <p className="font-medium text-card-foreground">2.3s</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cache Hit Rate</p>
              <p className="font-medium text-card-foreground">67%</p>
            </div>
            <div>
              <p className="text-muted-foreground">API Success Rate</p>
              <p className="font-medium text-card-foreground">98.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSettings;