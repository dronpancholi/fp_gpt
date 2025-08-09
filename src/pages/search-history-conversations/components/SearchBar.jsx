import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  onSearch, 
  onToggleMultiSelect, 
  isMultiSelectMode,
  selectedCount 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40">
      <div className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search conversations, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-10 pr-10 transition-all duration-200 ${
                  isSearchFocused ? 'ring-2 ring-primary/20' : ''
                }`}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>

          <Button
            variant={isMultiSelectMode ? "default" : "outline"}
            size="default"
            iconName="CheckSquare"
            iconSize={18}
            onClick={onToggleMultiSelect}
            className={`flex-shrink-0 transition-all duration-200 ${
              isMultiSelectMode 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {isMultiSelectMode ? `Selected (${selectedCount})` : 'Select'}
          </Button>
        </div>

        {isMultiSelectMode && selectedCount > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedCount} conversation{selectedCount !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Share2"
                  iconSize={14}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Download"
                  iconSize={14}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Trash2"
                  iconSize={14}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;