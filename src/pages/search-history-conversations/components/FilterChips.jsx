import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const filterOptions = [
    { id: 'all', label: 'All', type: 'general' },
    { id: 'today', label: 'Today', type: 'date' },
    { id: 'week', label: 'This Week', type: 'date' },
    { id: 'month', label: 'This Month', type: 'date' },
    { id: 'science', label: 'Science', type: 'category' },
    { id: 'technology', label: 'Technology', type: 'category' },
    { id: 'history', label: 'History', type: 'category' },
    { id: 'literature', label: 'Literature', type: 'category' },
    { id: 'mathematics', label: 'Mathematics', type: 'category' },
    { id: 'wikipedia', label: 'Wikipedia', type: 'source' },
    { id: 'duckduckgo', label: 'DuckDuckGo', type: 'source' },
    { id: 'academic', label: 'Academic', type: 'source' }
  ];

  const isFilterActive = (filterId) => {
    return activeFilters?.includes(filterId);
  };

  const handleFilterClick = (filterId) => {
    if (filterId === 'all') {
      onClearFilters();
    } else {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Filter Conversations</h3>
          {activeFilters?.length > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
          {filterOptions?.map((filter) => (
            <Button
              key={filter?.id}
              variant={isFilterActive(filter?.id) ? "default" : "outline"}
              size="xs"
              onClick={() => handleFilterClick(filter?.id)}
              className={`flex-shrink-0 transition-all duration-200 ${
                isFilterActive(filter?.id) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        {activeFilters?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {activeFilters?.map((filterId) => {
                const filter = filterOptions?.find(f => f?.id === filterId);
                return filter ? (
                  <span
                    key={filterId}
                    className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {filter?.label}
                    <button
                      onClick={() => onFilterChange(filterId)}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterChips;