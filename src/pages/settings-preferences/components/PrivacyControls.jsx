import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacyControls = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showDataDialog, setShowDataDialog] = useState(false);

  const transparencyOptions = [
    { value: 'full', label: 'Full Transparency', description: 'Show all source URLs and API details' },
    { value: 'standard', label: 'Standard', description: 'Show source names and basic attribution' },
    { value: 'minimal', label: 'Minimal', description: 'Show only essential source information' },
    { value: 'hidden', label: 'Hidden', description: 'Hide source attribution (not recommended)' }
  ];

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  const getPrivacyScore = () => {
    let score = 0;
    if (!localSettings?.shareUsageData) score += 25;
    if (!localSettings?.personalizeResponses) score += 25;
    if (localSettings?.sourceTransparency === 'full') score += 25;
    if (!localSettings?.storeQueries) score += 25;
    
    return score;
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Privacy Controls</h3>
          <p className="text-sm text-muted-foreground">Manage your data privacy and transparency preferences</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Privacy Score */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-card-foreground">Privacy Score</p>
            <span className={`text-lg font-bold ${getScoreColor(getPrivacyScore())}`}>
              {getPrivacyScore()}/100
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                getPrivacyScore() >= 75 ? 'bg-success' : 
                getPrivacyScore() >= 50 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${getPrivacyScore()}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Higher scores indicate better privacy protection
          </p>
        </div>

        {/* Data Sharing Preferences */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Data Sharing</h4>
          <div className="space-y-4">
            <div>
              <Checkbox
                label="Share Anonymous Usage Data"
                description="Help improve the service by sharing anonymous usage statistics"
                checked={localSettings?.shareUsageData}
                onChange={(e) => handleSettingChange('shareUsageData', e?.target?.checked)}
              />
            </div>

            <div>
              <Checkbox
                label="Store Query History Locally"
                description="Save your questions and responses on your device for faster access"
                checked={localSettings?.storeQueries}
                onChange={(e) => handleSettingChange('storeQueries', e?.target?.checked)}
              />
            </div>

            <div>
              <Checkbox
                label="Personalize Responses"
                description="Use your conversation history to provide more relevant answers"
                checked={localSettings?.personalizeResponses}
                onChange={(e) => handleSettingChange('personalizeResponses', e?.target?.checked)}
              />
            </div>

            <div>
              <Checkbox
                label="Share Error Reports"
                description="Automatically send error reports to help fix issues"
                checked={localSettings?.shareErrorReports}
                onChange={(e) => handleSettingChange('shareErrorReports', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Source Transparency */}
        <div>
          <Select
            label="Source Transparency Level"
            description="Control how much information about data sources is displayed"
            options={transparencyOptions}
            value={localSettings?.sourceTransparency}
            onChange={(value) => handleSettingChange('sourceTransparency', value)}
            className="mb-6"
          />
        </div>

        {/* Data Rights */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Your Data Rights</h4>
          <div className="space-y-3">
            {/* View Data */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">View Your Data</p>
                <p className="text-sm text-muted-foreground">See what data we have about you</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDataDialog(true)}
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
            </div>

            {/* Delete Data */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Delete All Data</p>
                <p className="text-sm text-muted-foreground">Permanently remove all your stored data</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
              >
                Delete
              </Button>
            </div>

            {/* Data Portability */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Export Data</p>
                <p className="text-sm text-muted-foreground">Download your data in a portable format</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy Information */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-primary mb-1">Privacy Commitment</p>
              <p className="text-sm text-primary/80">
                FP-GPT is designed with privacy in mind. We use free APIs and don't store your personal data on external servers. 
                All processing happens locally or through privacy-focused services.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Data View Dialog */}
      {showDataDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Your Data Summary</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDataDialog(false)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Stored Locally</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 147 conversation threads</li>
                  <li>• User preferences and settings</li>
                  <li>• 23 cached API responses</li>
                  <li>• Performance metrics (anonymous)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Shared with APIs</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Query text (not stored by APIs)</li>
                  <li>• No personal identifiers</li>
                  <li>• No conversation history</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Analytics (if enabled)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Usage patterns (anonymous)</li>
                  <li>• Performance metrics</li>
                  <li>• Error reports (no personal data)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;