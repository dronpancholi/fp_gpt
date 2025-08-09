import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourceComparison = ({ sources, onCompareToggle }) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [comparisonView, setComparisonView] = useState('side-by-side');

  const toggleSourceSelection = (sourceId) => {
    setSelectedSources(prev => {
      if (prev?.includes(sourceId)) {
        return prev?.filter(id => id !== sourceId);
      } else if (prev?.length < 3) {
        return [...prev, sourceId];
      }
      return prev;
    });
  };

  const getSelectedSourcesData = () => {
    return sources?.filter(source => selectedSources?.includes(source?.id));
  };

  const getAgreementLevel = (sources) => {
    if (sources?.length < 2) return 0;
    // Mock agreement calculation based on source reliability
    const avgReliability = sources?.reduce((sum, s) => sum + s?.reliability, 0) / sources?.length;
    return Math.round(avgReliability * 0.9); // Simulate agreement percentage
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} className="text-accent" />
          <h3 className="font-heading font-semibold text-lg text-card-foreground">
            Source Comparison
          </h3>
        </div>
        {selectedSources?.length >= 2 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComparisonView(comparisonView === 'side-by-side' ? 'overlay' : 'side-by-side')}
              iconName={comparisonView === 'side-by-side' ? 'Layers' : 'Columns'}
              iconSize={16}
            >
              {comparisonView === 'side-by-side' ? 'Overlay' : 'Side-by-Side'}
            </Button>
          </div>
        )}
      </div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">
          Select up to 3 sources to compare their perspectives and information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sources?.map((source) => (
            <div
              key={source?.id}
              className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                selectedSources?.includes(source?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleSourceSelection(source?.id)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedSources?.includes(source?.id)
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedSources?.includes(source?.id) && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
                <span className="font-medium text-sm text-card-foreground truncate">
                  {source?.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  source?.type === 'wikipedia' ? 'bg-blue-100 text-blue-800' :
                  source?.type === 'duckduckgo'? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {source?.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {source?.reliability}% reliable
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSources?.length >= 2 && (
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">
              Comparison Results ({selectedSources?.length} sources)
            </h4>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                getAgreementLevel(getSelectedSourcesData()) >= 80 ? 'bg-success' :
                getAgreementLevel(getSelectedSourcesData()) >= 60 ? 'bg-warning' : 'bg-error'
              }`} />
              <span className="text-sm font-medium text-card-foreground">
                {getAgreementLevel(getSelectedSourcesData())}% agreement
              </span>
            </div>
          </div>

          {comparisonView === 'side-by-side' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSelectedSourcesData()?.map((source, index) => (
                <div key={source?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                    <h5 className="font-medium text-sm text-card-foreground">
                      {source?.title}
                    </h5>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Key Points:</span>
                      <ul className="mt-1 space-y-1">
                        {source?.keyPoints?.slice(0, 3)?.map((point, idx) => (
                          <li key={idx} className="text-xs text-card-foreground flex items-start space-x-1">
                            <Icon name="Dot" size={12} className="text-muted-foreground mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Reliability:</span>
                        <span className="font-medium text-card-foreground">{source?.reliability}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Published:</span>
                        <span className="font-medium text-card-foreground">{source?.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-sm text-card-foreground mb-3">
                Overlapping Information
              </h5>
              <div className="space-y-3">
                {['Climate change is primarily caused by human activities', 'Global temperatures have risen significantly since 1880', 'Renewable energy adoption is increasing worldwide']?.map((overlap, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex items-center space-x-1">
                      {getSelectedSourcesData()?.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === 0 ? 'bg-blue-500' :
                            idx === 1 ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-card-foreground">{overlap}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSources([])}
              iconName="X"
              iconSize={16}
            >
              Clear Selection
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={16}
            >
              Export Comparison
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceComparison;