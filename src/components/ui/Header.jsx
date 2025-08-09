import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import DeveloperAttribution from './DeveloperAttribution';

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { name: 'Chat', path: '/main-chat-interface', icon: 'MessageSquare' },
    { name: 'History', path: '/search-history-conversations', icon: 'Clock' },
    { name: 'Status', path: '/api-source-status-dashboard', icon: 'Activity' },
    { name: 'Settings', path: '/settings-preferences', icon: 'Settings' },
  ];

  const secondaryNavItems = [
    { name: 'Source Attribution', path: '/query-results-source-attribution', icon: 'FileText' },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
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
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-lg text-foreground">
                FP-GPT
              </span>
              <span className="text-xs text-primary font-medium -mt-1">
                V0.4+
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 ml-8">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.name}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item?.name}
            </Button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMoreMenu}
              iconName="MoreHorizontal"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              More
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation z-50">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.name}
                      onClick={() => {
                        handleNavigation(item?.path);
                        setIsMoreMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name={item?.icon} size={16} className="mr-2" />
                      {item?.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMoreMenu}
            iconName="Menu"
            iconSize={20}
          />
        </div>

        {/* Right Side Content */}
        <div className="hidden lg:flex items-center ml-auto space-x-4">
          {/* Status Indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-xs font-caption text-muted-foreground">
              All Systems Operational
            </span>
          </div>
          
          {/* Developer Attribution */}
          <div className="relative">
            <DeveloperAttribution />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMoreMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-popover border-b border-border shadow-elevation md:hidden z-50">
            <div className="py-2">
              {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
                <button
                  key={item?.name}
                  onClick={() => {
                    handleNavigation(item?.path);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.name}
                </button>
              ))}
              
              {/* Mobile Developer Attribution */}
              <div className="px-4 py-3 border-t border-border mt-2">
                <div className="text-xs text-muted-foreground">
                  <div className="font-medium">FP-GPT V0.4+</div>
                  <div>Created by Dron Pancholi</div>
                  <div className="flex items-center space-x-4 mt-2">
                    <a 
                      href="mailto:dronpancholi@gmail.com" 
                      className="text-primary hover:text-primary/80"
                    >
                      Contact
                    </a>
                    <a 
                      href="https://instagram.com/thefpgpt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      @thefpgpt
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;