import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ResponsePreferences = ({ preferences, onUpdate }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const sourceOptions = [
    { value: 'wikipedia', label: 'Wikipedia First', description: 'Prioritize Wikipedia for general knowledge' },
    { value: 'duckduckgo', label: 'DuckDuckGo First', description: 'Prioritize web search results' },
    { value: 'academic', label: 'Academic First', description: 'Prioritize scholarly sources' },
    { value: 'balanced', label: 'Balanced Mix', description: 'Automatically choose best source' }
  ];

  const lengthOptions = [
    { value: 'brief', label: 'Brief (1-2 sentences)', description: 'Quick, concise answers' },
    { value: 'standard', label: 'Standard (1-2 paragraphs)', description: 'Balanced detail level' },
    { value: 'detailed', label: 'Detailed (3+ paragraphs)', description: 'Comprehensive explanations' },
    { value: 'adaptive', label: 'Adaptive', description: 'Length based on query complexity' }
  ];

  const handlePreferenceChange = (key, value) => {
    const updated = { ...localPreferences, [key]: value };
    setLocalPreferences(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Response Preferences</h3>
          <p className="text-sm text-muted-foreground">Customize how your AI assistant responds</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Default Source Priority */}
        <div>
          <Select
            label="Default Source Priority"
            description="Choose which knowledge source to prioritize for responses"
            options={sourceOptions}
            value={localPreferences?.defaultSource}
            onChange={(value) => handlePreferenceChange('defaultSource', value)}
            className="mb-4"
          />
        </div>

        {/* Response Length */}
        <div>
          <Select
            label="Response Length"
            description="Set preferred detail level for answers"
            options={lengthOptions}
            value={localPreferences?.responseLength}
            onChange={(value) => handlePreferenceChange('responseLength', value)}
            className="mb-4"
          />
        </div>

        {/* Source Attribution */}
        <div>
          <Checkbox
            label="Show Source Attribution"
            description="Display source links and citations with responses"
            checked={localPreferences?.showSourceAttribution}
            onChange={(e) => handlePreferenceChange('showSourceAttribution', e?.target?.checked)}
            className="mb-4"
          />
        </div>

        {/* Real-time Features */}
        <div>
          <Checkbox
            label="Enable Typing Indicators"
            description="Show when the AI is generating a response"
            checked={localPreferences?.showTypingIndicator}
            onChange={(e) => handlePreferenceChange('showTypingIndicator', e?.target?.checked)}
            className="mb-4"
          />
        </div>

        {/* Response Streaming */}
        <div>
          <Checkbox
            label="Stream Responses"
            description="Display responses as they're generated for faster perceived speed"
            checked={localPreferences?.streamResponses}
            onChange={(e) => handlePreferenceChange('streamResponses', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsePreferences;