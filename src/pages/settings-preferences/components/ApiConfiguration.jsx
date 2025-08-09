import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ApiConfiguration = ({ config, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState(config);

  const timeoutOptions = [
    { value: '2', label: '2 seconds', description: 'Fastest responses, may timeout on complex queries' },
    { value: '3', label: '3 seconds', description: 'Good balance of speed and reliability' },
    { value: '4', label: '4 seconds', description: 'More reliable for complex queries' },
    { value: '5', label: '5 seconds', description: 'Maximum timeout for comprehensive results' }
  ];

  const geminiModelOptions = [
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', description: 'Fastest responses with good quality' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', description: 'Highest quality responses, slower' },
    { value: 'gemini-pro', label: 'Gemini Pro', description: 'Balanced performance and quality' }
  ];

  const handleConfigChange = (key, value) => {
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    onUpdate(updated);
  };

  const getSourceStatus = (enabled) => (
    <div className={`flex items-center space-x-2 ${enabled ? 'text-success' : 'text-muted-foreground'}`}>
      <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-success' : 'bg-muted-foreground'}`} />
      <span className="text-sm font-medium">{enabled ? 'Active' : 'Disabled'}</span>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">API Configuration</h3>
          <p className="text-sm text-muted-foreground">Manage Gemini AI and knowledge source settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Gemini AI Model Selection */}
        <div>
          <Select
            label="Gemini AI Model"
            description="Choose the Gemini model for optimal performance"
            options={geminiModelOptions}
            value={localConfig?.geminiModel || 'gemini-1.5-flash'}
            onChange={(value) => handleConfigChange('geminiModel', value)}
            className="mb-4"
          />
        </div>

        {/* Timeout Settings */}
        <div>
          <Select
            label="Response Timeout"
            description="Maximum time to wait for API responses"
            options={timeoutOptions}
            value={localConfig?.timeout}
            onChange={(value) => handleConfigChange('timeout', value)}
            className="mb-6"
          />
        </div>

        {/* AI Knowledge Sources */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">AI Knowledge Sources</h4>
          <div className="space-y-4">
            {/* Gemini AI Core */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center space-x-3">
                <Icon name="Brain" size={20} className="text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-card-foreground">Gemini AI Core</p>
                  <p className="text-sm text-muted-foreground">Advanced language understanding and reasoning</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getSourceStatus(true)}
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ACTIVE
                </div>
              </div>
            </div>

            {/* Google Knowledge */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-card-foreground">Google Knowledge Graph</p>
                  <p className="text-sm text-muted-foreground">Real-time access to Google's knowledge base</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getSourceStatus(localConfig?.sources?.googleKnowledge ?? true)}
                <Checkbox
                  checked={localConfig?.sources?.googleKnowledge ?? true}
                  onChange={(e) => handleConfigChange('sources', {
                    ...localConfig?.sources,
                    googleKnowledge: e?.target?.checked
                  })}
                />
              </div>
            </div>

            {/* Image Analysis */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="ImagePlus" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-card-foreground">Image Analysis</p>
                  <p className="text-sm text-muted-foreground">Multimodal understanding of images and text</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getSourceStatus(localConfig?.sources?.imageAnalysis ?? true)}
                <Checkbox
                  checked={localConfig?.sources?.imageAnalysis ?? true}
                  onChange={(e) => handleConfigChange('sources', {
                    ...localConfig?.sources,
                    imageAnalysis: e?.target?.checked
                  })}
                />
              </div>
            </div>

            {/* Legacy Sources (kept for compatibility) */}
            <div className="mt-6 pt-4 border-t border-border">
              <h5 className="text-sm font-medium text-muted-foreground mb-3">Legacy Sources (Deprecated)</h5>
              
              {/* Wikipedia API */}
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg opacity-60">
                <div className="flex items-center space-x-3">
                  <Icon name="BookOpen" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-card-foreground">Wikipedia API</p>
                    <p className="text-sm text-muted-foreground">Replaced by Gemini's knowledge base</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getSourceStatus(false)}
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    DEPRECATED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Gemini Settings */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Advanced Gemini Settings</h4>
          
          {/* Context Memory*/}
          <div className="mb-4">
            <Checkbox
              label="Enable Conversation Memory"
              description="Maintain context across messages in the same session"
              checked={localConfig?.geminiSettings?.contextMemory ?? true}
              onChange={(e) => handleConfigChange('geminiSettings', {
                ...localConfig?.geminiSettings,
                contextMemory: e?.target?.checked
              })}
            />
          </div>

          {/* Multimodal Processing */}
          <div className="mb-4">
            <Checkbox
              label="Enable Multimodal Processing"
              description="Allow image uploads and analysis alongside text"
              checked={localConfig?.geminiSettings?.multimodal ?? true}
              onChange={(e) => handleConfigChange('geminiSettings', {
                ...localConfig?.geminiSettings,
                multimodal: e?.target?.checked
              })}
            />
          </div>

          {/* Safety Settings */}
          <div>
            <Checkbox
              label="Enhanced Safety Filtering"
              description="Apply Google's safety filters to responses"
              checked={localConfig?.geminiSettings?.safetyFiltering ?? true}
              onChange={(e) => handleConfigChange('geminiSettings', {
                ...localConfig?.geminiSettings,
                safetyFiltering: e?.target?.checked
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfiguration;