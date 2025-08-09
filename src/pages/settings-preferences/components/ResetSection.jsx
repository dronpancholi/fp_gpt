import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ResetSection = ({ onResetAll, onResetSpecific }) => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetOptions, setResetOptions] = useState({
    preferences: false,
    apiConfig: false,
    dataSettings: false,
    performance: false,
    privacy: false,
    feedback: false
  });
  const [isResetting, setIsResetting] = useState(false);

  const resetCategories = [
    {
      key: 'preferences',
      label: 'Response Preferences',
      description: 'Source priority, response length, attribution settings',
      icon: 'MessageSquare'
    },
    {
      key: 'apiConfig',
      label: 'API Configuration',
      description: 'Timeout settings, source enablement, parallel processing',
      icon: 'Settings'
    },
    {
      key: 'dataSettings',
      label: 'Data Management',
      description: 'History retention, auto-save, export preferences',
      icon: 'Database'
    },
    {
      key: 'performance',
      label: 'Performance Settings',
      description: 'Caching, offline mode, optimization preferences',
      icon: 'Zap'
    },
    {
      key: 'privacy',
      label: 'Privacy Controls',
      description: 'Data sharing, transparency, storage preferences',
      icon: 'Shield'
    },
    {
      key: 'feedback',
      label: 'Feedback Settings',
      description: 'Rating preferences, analytics, notifications',
      icon: 'MessageCircle'
    }
  ];

  const handleResetOptionChange = (key, checked) => {
    setResetOptions(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(resetOptions)?.every(value => value);
    const newState = {};
    Object.keys(resetOptions)?.forEach(key => {
      newState[key] = !allSelected;
    });
    setResetOptions(newState);
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    
    // Mock reset process
    setTimeout(() => {
      const selectedCategories = Object.keys(resetOptions)?.filter(key => resetOptions?.[key]);
      
      if (selectedCategories?.length === Object.keys(resetOptions)?.length) {
        // Reset all if all categories selected
        onResetAll();
      } else {
        // Reset specific categories
        onResetSpecific(selectedCategories);
      }
      
      setIsResetting(false);
      setShowResetDialog(false);
      setResetOptions({
        preferences: false,
        apiConfig: false,
        dataSettings: false,
        performance: false,
        privacy: false,
        feedback: false
      });
    }, 2000);
  };

  const selectedCount = Object.values(resetOptions)?.filter(Boolean)?.length;
  const allSelected = selectedCount === Object.keys(resetOptions)?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
          <Icon name="RotateCcw" size={20} className="text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Reset Settings</h3>
          <p className="text-sm text-muted-foreground">Restore default configurations</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Reset Options */}
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Choose which settings to reset to their default values. This action cannot be undone.
          </p>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4">
            <div>
              <p className="font-medium text-card-foreground">Quick Reset All Settings</p>
              <p className="text-sm text-muted-foreground">Reset everything to factory defaults</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const allTrue = {};
                Object.keys(resetOptions)?.forEach(key => {
                  allTrue[key] = true;
                });
                setResetOptions(allTrue);
                setShowResetDialog(true);
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset All
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-card-foreground">Selective Reset</p>
              <p className="text-sm text-muted-foreground">Choose specific categories to reset</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetDialog(true)}
              iconName="Settings"
              iconPosition="left"
            >
              Customize
            </Button>
          </div>
        </div>

        {/* Last Reset Information */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-base font-medium text-card-foreground mb-2">Reset History</h4>
          <div className="text-sm text-muted-foreground">
            <p>Last reset: Never</p>
            <p>Current configuration age: 15 days</p>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <p className="font-medium text-warning mb-1">Important Notice</p>
              <p className="text-sm text-warning/80">
                Resetting settings will not delete your conversation history or cached data. 
                Use the Data Management section to clear stored conversations if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Confirm Reset</h3>
                <p className="text-sm text-muted-foreground">Select categories to reset</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Select All Toggle */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium text-card-foreground">
                  {allSelected ? 'Deselect All' : 'Select All'}
                </span>
                <Checkbox
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </div>

              {/* Individual Categories */}
              {resetCategories?.map((category) => (
                <div key={category?.key} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name={category?.icon} size={18} className="text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{category?.label}</p>
                    <p className="text-xs text-muted-foreground">{category?.description}</p>
                  </div>
                  <Checkbox
                    checked={resetOptions?.[category?.key]}
                    onChange={(e) => handleResetOptionChange(category?.key, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>

            {selectedCount > 0 && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg mb-4">
                <p className="text-sm text-warning">
                  {selectedCount} categor{selectedCount === 1 ? 'y' : 'ies'} will be reset to default values.
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowResetDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmReset}
                loading={isResetting}
                disabled={selectedCount === 0}
                className="flex-1"
              >
                {isResetting ? 'Resetting...' : `Reset ${selectedCount > 0 ? selectedCount : ''}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetSection;