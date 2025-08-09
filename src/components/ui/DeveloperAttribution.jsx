import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const DeveloperAttribution = ({ className = '' }) => {
  const [showDetails, setShowDetails] = useState(false);

  const contacts = [
    {
      label: 'Creator',
      value: 'Dron Pancholi',
      icon: 'User'
    },
    {
      label: 'Email',
      value: 'dronpancholi@gmail.com',
      icon: 'Mail',
      action: () => window.open('mailto:dronpancholi@gmail.com', '_blank')
    },
    {
      label: 'Support',
      value: 'thefpgpt@gmail.com',
      icon: 'HelpCircle',
      action: () => window.open('mailto:thefpgpt@gmail.com', '_blank')
    },
    {
      label: 'Instagram',
      value: '@thefpgpt',
      icon: 'Instagram',
      action: () => window.open('https://instagram.com/thefpgpt', '_blank')
    }
  ];

  return (
    <div className={`${className}`}>
      {/* Attribution Toggle */}
      <Button
        variant="ghost"
        size="xs"
        onClick={() => setShowDetails(!showDetails)}
        iconName="Info"
        iconSize={12}
        className="text-muted-foreground hover:text-foreground"
      >
        About
      </Button>

      {/* Attribution Details */}
      {showDetails && (
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-popover border border-border rounded-lg shadow-lg z-50 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">FP-GPT V0.4+</h3>
                <p className="text-xs text-muted-foreground">Advanced AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowDetails(false)}
              iconName="X"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            An advanced conversational information assistant that delivers high-accuracy responses 
            sourced from publicly accessible APIs and enhanced with state-of-the-art reasoning.
          </p>

          {/* Contact Information */}
          <div className="space-y-2">
            {contacts?.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={contact?.icon} size={14} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{contact?.label}</p>
                    <p className="text-xs text-muted-foreground">{contact?.value}</p>
                  </div>
                </div>
                {contact?.action && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={contact?.action}
                    iconName="ExternalLink"
                    iconSize={12}
                    className="text-muted-foreground hover:text-foreground"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Version Info */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Version 0.4+</span>
              <span>© 2025 Dron Pancholi</span>
            </div>
          </div>

          {/* Tooltip Arrow */}
          <div className="absolute top-full right-6 border-8 border-transparent border-t-popover"></div>
        </div>
      )}

      {/* Click Outside Overlay */}
      {showDetails && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default DeveloperAttribution;