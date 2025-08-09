import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DataManagement = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const retentionOptions = [
    { value: '7', label: '7 days', description: 'Keep conversations for one week' },
    { value: '30', label: '30 days', description: 'Keep conversations for one month' },
    { value: '90', label: '90 days', description: 'Keep conversations for three months' },
    { value: '365', label: '1 year', description: 'Keep conversations for one year' },
    { value: 'forever', label: 'Forever', description: 'Never automatically delete conversations' }
  ];

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Mock export functionality
    const mockData = {
      conversations: [
        {
          id: "conv_001",
          timestamp: "2025-07-28T10:30:00Z",
          messages: [
            { role: "user", content: "What is quantum computing?" },
            { role: "assistant", content: "Quantum computing is a revolutionary computing paradigm..." }
          ]
        }
      ],
      preferences: localSettings,
      exportDate: new Date()?.toISOString()
    };

    // Simulate export delay
    setTimeout(() => {
      const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fp-gpt-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 2000);
  };

  const handleClearHistory = () => {
    // Mock clear functionality
    setShowClearDialog(false);
    // In real app, this would clear the conversation history
    console.log('Conversation history cleared');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Database" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Data Management</h3>
          <p className="text-sm text-muted-foreground">Control your conversation data and history</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* History Retention */}
        <div>
          <Select
            label="Conversation History Retention"
            description="How long to keep your chat conversations"
            options={retentionOptions}
            value={localSettings?.historyRetention}
            onChange={(value) => handleSettingChange('historyRetention', value)}
            className="mb-6"
          />
        </div>

        {/* Auto-save Conversations */}
        <div>
          <Checkbox
            label="Auto-save Conversations"
            description="Automatically save all conversations to local storage"
            checked={localSettings?.autoSave}
            onChange={(e) => handleSettingChange('autoSave', e?.target?.checked)}
            className="mb-6"
          />
        </div>

        {/* Include Source Data */}
        <div>
          <Checkbox
            label="Include Source Data in Exports"
            description="Include API source information when exporting conversations"
            checked={localSettings?.includeSourceData}
            onChange={(e) => handleSettingChange('includeSourceData', e?.target?.checked)}
            className="mb-6"
          />
        </div>

        {/* Data Actions */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Data Actions</h4>
          <div className="space-y-3">
            {/* Export Data */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Export Conversation Data</p>
                <p className="text-sm text-muted-foreground">Download all your conversations as JSON</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>

            {/* Clear History */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Clear Conversation History</p>
                <p className="text-sm text-muted-foreground">Permanently delete all saved conversations</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowClearDialog(true)}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Storage Usage */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-card-foreground">Storage Usage</p>
            <span className="text-sm text-muted-foreground">2.4 MB / 10 MB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            147 conversations stored locally
          </p>
        </div>
      </div>
      {/* Clear Confirmation Dialog */}
      {showClearDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Clear All Conversations</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to permanently delete all your conversation history? 
              This will remove 147 conversations from your local storage.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowClearDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearHistory}
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;