import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedTopics = ({ topics, suggestedQuestions, onTopicClick, onQuestionClick }) => {
  const [activeTab, setActiveTab] = useState('topics');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Explore Further
        </h3>
      </div>
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'topics' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Related Topics
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'questions' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Follow-up Questions
        </button>
      </div>
      {activeTab === 'topics' && (
        <div className="space-y-3">
          {topics?.map((topic) => (
            <div
              key={topic?.id}
              className="group border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200 cursor-pointer"
              onClick={() => onTopicClick(topic)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={topic?.icon} size={16} className="text-primary" />
                    <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors duration-200">
                      {topic?.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      topic?.relevance >= 80 ? 'bg-success/10 text-success' :
                      topic?.relevance >= 60 ? 'bg-warning/10 text-warning': 'bg-muted text-muted-foreground'
                    }`}>
                      {topic?.relevance}% relevant
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {topic?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic?.keywords?.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'questions' && (
        <div className="space-y-3">
          {suggestedQuestions?.map((question) => (
            <div
              key={question?.id}
              className="group border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200 cursor-pointer"
              onClick={() => onQuestionClick(question?.text)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="HelpCircle" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                    {question?.text}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} />
                      <span>Difficulty: {question?.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Est. {question?.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Database" size={12} />
                      <span>{question?.expectedSources} sources</span>
                    </div>
                  </div>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {activeTab === 'topics' ? 
              `${topics?.length} related topics found` : 
              `${suggestedQuestions?.length} follow-up questions available`
            }
          </p>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={16}
          >
            Refresh Suggestions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedTopics;