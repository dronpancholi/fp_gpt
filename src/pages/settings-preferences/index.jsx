import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ResponsePreferences from './components/ResponsePreferences';
import ApiConfiguration from './components/ApiConfiguration';
import DataManagement from './components/DataManagement';
import PerformanceSettings from './components/PerformanceSettings';
import FeedbackSection from './components/FeedbackSection';
import PrivacyControls from './components/PrivacyControls';
import ResetSection from './components/ResetSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SettingsPreferences = () => {
  const [activeSection, setActiveSection] = useState('preferences');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock settings state
  const [settings, setSettings] = useState({
    preferences: {
      defaultSource: 'balanced',
      responseLength: 'standard',
      showSourceAttribution: true,
      showTypingIndicator: true,
      streamResponses: true
    },
    apiConfig: {
      timeout: '3',
      sources: {
        wikipedia: true,
        duckduckgo: true,
        academic: true
      },
      parallelProcessing: true
    },
    dataManagement: {
      historyRetention: '90',
      autoSave: true,
      includeSourceData: true
    },
    performance: {
      cacheTimeout: '6hours',
      offlineMode: 'graceful',
      preloadPopular: true,
      compressResponses: false,
      backgroundRefresh: true,
      predictiveLoading: false
    },
    feedback: {
      enableRating: true,
      collectAnalytics: true,
      qualityNotifications: true
    },
    privacy: {
      shareUsageData: false,
      storeQueries: true,
      personalizeResponses: true,
      shareErrorReports: true,
      sourceTransparency: 'standard'
    }
  });

  const navigationItems = [
    { id: 'preferences', label: 'Response Preferences', icon: 'MessageSquare' },
    { id: 'api', label: 'API Configuration', icon: 'Settings' },
    { id: 'data', label: 'Data Management', icon: 'Database' },
    { id: 'performance', label: 'Performance', icon: 'Zap' },
    { id: 'feedback', label: 'Feedback', icon: 'MessageCircle' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'reset', label: 'Reset Settings', icon: 'RotateCcw' }
  ];

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('fp-gpt-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setLastSaved(new Date(localStorage.getItem('fp-gpt-settings-timestamp') || Date.now()));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const handleSettingsUpdate = (category, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: newSettings
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Mock save process
    setTimeout(() => {
      localStorage.setItem('fp-gpt-settings', JSON.stringify(settings));
      localStorage.setItem('fp-gpt-settings-timestamp', Date.now()?.toString());
      setHasUnsavedChanges(false);
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleResetAll = () => {
    const defaultSettings = {
      preferences: {
        defaultSource: 'balanced',
        responseLength: 'standard',
        showSourceAttribution: true,
        showTypingIndicator: true,
        streamResponses: true
      },
      apiConfig: {
        timeout: '3',
        sources: {
          wikipedia: true,
          duckduckgo: true,
          academic: true
        },
        parallelProcessing: true
      },
      dataManagement: {
        historyRetention: '90',
        autoSave: true,
        includeSourceData: true
      },
      performance: {
        cacheTimeout: '6hours',
        offlineMode: 'graceful',
        preloadPopular: true,
        compressResponses: false,
        backgroundRefresh: true,
        predictiveLoading: false
      },
      feedback: {
        enableRating: true,
        collectAnalytics: true,
        qualityNotifications: true
      },
      privacy: {
        shareUsageData: false,
        storeQueries: true,
        personalizeResponses: true,
        shareErrorReports: true,
        sourceTransparency: 'standard'
      }
    };
    
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const handleResetSpecific = (categories) => {
    // Reset only specific categories
    console.log('Resetting categories:', categories);
    setHasUnsavedChanges(true);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'preferences':
        return (
          <ResponsePreferences
            preferences={settings?.preferences}
            onUpdate={(newPreferences) => handleSettingsUpdate('preferences', newPreferences)}
          />
        );
      case 'api':
        return (
          <ApiConfiguration
            config={settings?.apiConfig}
            onUpdate={(newConfig) => handleSettingsUpdate('apiConfig', newConfig)}
          />
        );
      case 'data':
        return (
          <DataManagement
            settings={settings?.dataManagement}
            onUpdate={(newSettings) => handleSettingsUpdate('dataManagement', newSettings)}
          />
        );
      case 'performance':
        return (
          <PerformanceSettings
            settings={settings?.performance}
            onUpdate={(newSettings) => handleSettingsUpdate('performance', newSettings)}
          />
        );
      case 'feedback':
        return (
          <FeedbackSection
            settings={settings?.feedback}
            onUpdate={(newSettings) => handleSettingsUpdate('feedback', newSettings)}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            settings={settings?.privacy}
            onUpdate={(newSettings) => handleSettingsUpdate('privacy', newSettings)}
          />
        );
      case 'reset':
        return (
          <ResetSection
            onResetAll={handleResetAll}
            onResetSpecific={handleResetSpecific}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings & Preferences</h1>
              <p className="text-muted-foreground mt-2">
                Customize your AI assistant experience and manage your data preferences
              </p>
            </div>
            
            {/* Save Button */}
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-4">
                {lastSaved && (
                  <span className="text-sm text-muted-foreground">
                    Last saved: {lastSaved?.toLocaleTimeString()}
                  </span>
                )}
                <Button
                  variant="primary"
                  onClick={handleSaveSettings}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName="Menu"
              iconPosition="left"
              className="w-full justify-start"
            >
              {navigationItems?.find(item => item?.id === activeSection)?.label}
            </Button>
          </div>

          {/* Navigation Sidebar */}
          <div className={`lg:w-64 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.id}
                    onClick={() => {
                      setActiveSection(item?.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === item?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>

        {/* Unsaved Changes Warning */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-4 right-4 bg-warning text-warning-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">You have unsaved changes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPreferences;