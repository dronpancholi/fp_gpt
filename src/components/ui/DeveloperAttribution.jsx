import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const DeveloperAttribution = ({ onClose }) => {
  const contacts = [
    {
      label: 'Developer',
      value: 'Dron Pancholi',
      icon: 'User',
      action: () => window.open('mailto:dronpancholi@gmail.com', '_blank'),
    },
    {
      label: 'Contact',
      value: 'thefpgpt@gmail.com',
      icon: 'Mail',
      action: () => window.open('mailto:thefpgpt@gmail.com', '_blank'),
    },
    {
      label: 'Instagram',
      value: '@thefpgpt',
      icon: 'Instagram',
      action: () => window.open('https://instagram.com/thefpgpt', '_blank'),
    },
  ];

  return (
    <div className="w-80 bg-popover border border-border rounded-lg shadow-lg z-50 p-4">
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
          onClick={onClose}
          iconName="X"
          iconSize={14}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        This is an advanced conversational information assistant that delivers high-accuracy responses
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
    </div>
  );
};

export default DeveloperAttribution;