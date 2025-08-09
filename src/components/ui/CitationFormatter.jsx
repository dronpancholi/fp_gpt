import React, { useState } from 'react';
import { Cite } from 'citation-js';

import Button from './Button';

const CitationFormatter = ({ sources = [], title = '', url = '', className = '' }) => {
  const [citationFormat, setCitationFormat] = useState('apa');
  const [showCitations, setShowCitations] = useState(false);

  const formats = [
    { key: 'apa', label: 'APA', template: 'apa' },
    { key: 'mla', label: 'MLA', template: 'mla' },
    { key: 'ieee', label: 'IEEE', template: 'ieee' }
  ];

  const generateCitation = (format) => {
    try {
      // Create citation data
      const citationData = {
        title: title || 'AI-Generated Response',
        author: [{ family: 'FP-GPT', given: 'AI Assistant' }],
        issued: { 'date-parts': [[new Date()?.getFullYear(), new Date()?.getMonth() + 1, new Date()?.getDate()]] },
        URL: url || window.location?.href,
        accessed: { 'date-parts': [[new Date()?.getFullYear(), new Date()?.getMonth() + 1, new Date()?.getDate()]] },
        type: 'webpage'
      };

      // Generate citation using citation-js
      const cite = new Cite(citationData);
      
      switch (format) {
        case 'apa':
          return cite?.format('bibliography', { format: 'text', template: 'apa' });
        case 'mla':
          return cite?.format('bibliography', { format: 'text', template: 'modern-language-association' });
        case 'ieee':
          return cite?.format('bibliography', { format: 'text', template: 'ieee' });
        default:
          return cite?.format('bibliography', { format: 'text', template: 'apa' });
      }
    } catch (error) {
      console.error('Citation generation error:', error);
      // Fallback manual citation
      const currentDate = new Date()?.toLocaleDateString();
      const author = 'FP-GPT AI Assistant';
      const siteTitle = title || 'AI-Generated Response';
      const accessDate = `Retrieved ${currentDate}`;
      
      switch (format) {
        case 'apa':
          return `${author} (${new Date()?.getFullYear()}). ${siteTitle}. ${url || window.location?.href}. ${accessDate}.`;
        case 'mla':
          return `${author}. "${siteTitle}." Web. ${currentDate}.`;
        case 'ieee':
          return `${author}, "${siteTitle}," [Online]. Available: ${url || window.location?.href}. [Accessed: ${currentDate}].`;
        default:
          return `${author} (${new Date()?.getFullYear()}). ${siteTitle}. ${url || window.location?.href}. ${accessDate}.`;
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could show toast notification here
      console.log('Citation copied to clipboard');
    });
  };

  if (!sources?.length && !title) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {/* Citation Toggle Button */}
      <Button
        variant="ghost"
        size="xs"
        onClick={() => setShowCitations(!showCitations)}
        iconName="Quote"
        iconSize={12}
        className="text-muted-foreground hover:text-foreground"
      >
        Cite
      </Button>

      {/* Citations Panel */}
      {showCitations && (
        <div className="mt-2 p-3 bg-muted rounded-md border border-border">
          {/* Format Selector */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs font-medium text-foreground">Format:</span>
            {formats?.map((format) => (
              <Button
                key={format?.key}
                variant={citationFormat === format?.key ? "default" : "outline"}
                size="xs"
                onClick={() => setCitationFormat(format?.key)}
                className="text-xs"
              >
                {format?.label}
              </Button>
            ))}
          </div>

          {/* Generated Citation */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Citation:</div>
            <div className="bg-background border border-border rounded p-2 text-xs text-foreground font-mono">
              {generateCitation(citationFormat)}
            </div>
            
            {/* Copy Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(generateCitation(citationFormat))}
                iconName="Copy"
                iconSize={12}
                className="text-muted-foreground hover:text-foreground"
              >
                Copy
              </Button>
            </div>
          </div>

          {/* Source Links */}
          {sources?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">Sources:</div>
              <div className="space-y-1">
                {sources?.map((source, index) => (
                  <div key={index} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                    • {source}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitationFormatter;