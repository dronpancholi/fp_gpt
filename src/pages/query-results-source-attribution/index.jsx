import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ResponseCard from './components/ResponseCard';
import SourceAttribution from './components/SourceAttribution';
import ConfidenceIndicator from './components/ConfidenceIndicator';
import RelatedTopics from './components/RelatedTopics';
import SourceComparison from './components/SourceComparison';
import QueryAnalysis from './components/QueryAnalysis';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QueryResultsSourceAttribution = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for the response
  const mockResponse = {
    id: "resp_001",
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations occur naturally, scientific evidence shows that human activities have been the main driver of climate change since the mid-20th century.\n\nThe primary cause is the emission of greenhouse gases, particularly carbon dioxide from burning fossil fuels like coal, oil, and gas. These gases trap heat in Earth's atmosphere, leading to global warming.\n\nKey impacts include rising sea levels, more frequent extreme weather events, changes in precipitation patterns, and threats to biodiversity. The Intergovernmental Panel on Climate Change (IPCC) reports that global temperatures have risen by approximately 1.1°C since pre-industrial times.\n\nMitigation efforts focus on reducing greenhouse gas emissions through renewable energy adoption, energy efficiency improvements, and sustainable transportation. Adaptation strategies help communities prepare for and respond to climate impacts.`,
    confidence: 92,
    responseTime: 1247,
    sourceCount: 8,
    timestamp: new Date(Date.now() - 300000)
  };

  // Mock sources data
  const mockSources = [
    {
      id: "src_001",
      type: "wikipedia",
      title: "Climate Change - Wikipedia",
      description: "Comprehensive overview of climate change science, causes, and impacts from the world's largest encyclopedia.",
      url: "https://en.wikipedia.org/wiki/Climate_change",
      reliability: 94,
      publishDate: "2024-07-15",
      accessTime: "2024-08-01 16:45:23",
      preview: `Climate change refers to long-term shifts in global or regional climate patterns. Since the mid-20th century, the observed changes are primarily attributed to increased levels of greenhouse gases produced by human activities, particularly the burning of fossil fuels.`,
      keyPoints: [
        "Human activities are the primary driver since mid-20th century",
        "Greenhouse gas emissions from fossil fuels are the main cause",
        "Global temperatures have risen by 1.1°C since pre-industrial times",
        "Impacts include sea level rise and extreme weather events"
      ],
      citation: "Wikipedia contributors. (2024, July 15). Climate change. In Wikipedia, The Free Encyclopedia. Retrieved August 1, 2024, from https://en.wikipedia.org/wiki/Climate_change"
    },
    {
      id: "src_002",
      type: "academic",
      title: "IPCC Sixth Assessment Report: Climate Change 2023",
      description: "Latest comprehensive assessment of climate science from the Intergovernmental Panel on Climate Change.",
      url: "https://www.ipcc.ch/report/ar6/",
      reliability: 98,
      publishDate: "2023-03-20",
      accessTime: "2024-08-01 16:45:25",
      preview: `The IPCC AR6 Synthesis Report confirms that human influence has warmed the planet at a rate that is unprecedented in at least the last 2000 years. Global surface temperature has increased faster since 1970 than in any other 50-year period over at least the last 2000 years.`,
      keyPoints: [
        "Human influence on warming is unequivocal",
        "Current warming rate is unprecedented in 2000+ years",
        "Global surface temperature increase accelerated since 1970",
        "Urgent action needed to limit warming to 1.5°C"
      ],
      citation: "IPCC, 2023: Climate Change 2023: Synthesis Report. Contribution of Working Groups I, II and III to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change [Core Writing Team, H. Lee and J. Romero (eds.)]. IPCC, Geneva, Switzerland."
    },
    {
      id: "src_003",
      type: "duckduckgo",
      title: "NASA Climate Change Evidence",
      description: "NASA's comprehensive collection of climate change evidence and scientific data.",
      url: "https://climate.nasa.gov/evidence/",
      reliability: 96,
      publishDate: "2024-06-10",
      accessTime: "2024-08-01 16:45:27",
      preview: `NASA's climate research provides compelling evidence of climate change through multiple lines of evidence including temperature records, ice core data, satellite observations, and sea level measurements.`,
      keyPoints: [
        "Multiple independent lines of evidence confirm warming",
        "Satellite data shows consistent temperature trends",
        "Ice core data reveals historical climate patterns",
        "Sea level measurements show accelerating rise"
      ],
      citation: "NASA. (2024, June 10). Climate Change Evidence. NASA Climate Change and Global Warming. Retrieved August 1, 2024, from https://climate.nasa.gov/evidence/"
    }
  ];

  // Mock confidence methodology
  const mockMethodology = {
    complexity: 3,
    processingTime: 1247,
    sourcesAnalyzed: 8,
    crossReferences: 15,
    factChecks: 12,
    algorithmVersion: "v2.1.3"
  };

  // Mock related topics
  const mockRelatedTopics = [
    {
      id: "topic_001",
      title: "Greenhouse Gas Emissions",
      description: "Understanding the sources and impacts of greenhouse gases in the atmosphere.",
      icon: "CloudRain",
      relevance: 95,
      keywords: ["CO2", "methane", "fossil fuels", "emissions"]
    },
    {
      id: "topic_002",
      title: "Renewable Energy Solutions",
      description: "Exploring sustainable energy alternatives to reduce carbon footprint.",
      icon: "Zap",
      relevance: 88,
      keywords: ["solar", "wind", "hydroelectric", "sustainable"]
    },
    {
      id: "topic_003",
      title: "Climate Adaptation Strategies",
      description: "Methods for adapting to and mitigating climate change impacts.",
      icon: "Shield",
      relevance: 82,
      keywords: ["adaptation", "resilience", "mitigation", "policy"]
    }
  ];

  // Mock suggested questions
  const mockSuggestedQuestions = [
    {
      id: "q_001",
      text: "What are the most effective ways to reduce personal carbon footprint?",
      difficulty: "Moderate",
      estimatedTime: "2-3 min",
      expectedSources: 5
    },
    {
      id: "q_002",
      text: "How do climate models predict future temperature changes?",
      difficulty: "Complex",
      estimatedTime: "4-5 min",
      expectedSources: 7
    },
    {
      id: "q_003",
      text: "What role do oceans play in climate regulation?",
      difficulty: "Moderate",
      estimatedTime: "3-4 min",
      expectedSources: 6
    }
  ];

  // Mock query analysis
  const mockQueryAnalysis = {
    intent: "factual",
    intentDescription: "Seeking comprehensive factual information",
    complexity: "Moderate",
    complexityScore: 3,
    domain: "Environmental Science",
    keywords: [
      { term: "climate change", importance: "high" },
      { term: "global warming", importance: "high" },
      { term: "greenhouse gases", importance: "medium" },
      { term: "human activities", importance: "medium" },
      { term: "temperature", importance: "low" }
    ],
    recommendedSources: [
      { name: "Wikipedia", type: "wikipedia", priority: "high" },
      { name: "Academic Papers", type: "academic", priority: "high" },
      { name: "Government Data", type: "duckduckgo", priority: "medium" }
    ],
    parallelProcessing: true,
    expectedResponseTime: 1200,
    cacheAvailable: false,
    semanticAnalysis: "Query seeks comprehensive overview of climate change phenomenon with focus on causes, impacts, and scientific consensus.",
    contextClues: [
      "Broad informational query requiring multiple perspectives",
      "Scientific topic requiring authoritative sources",
      "Current topic with evolving research"
    ],
    challenges: [
      "Large volume of information to synthesize",
      "Need to balance scientific accuracy with accessibility",
      "Potential for conflicting information from different sources"
    ]
  };

  useEffect(() => {
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentQuery("What is climate change and what causes it?");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyResponse = (content) => {
    navigator.clipboard?.writeText(content);
    // Could add toast notification here
  };

  const handleExportResponse = (response) => {
    const exportData = {
      query: currentQuery,
      response: response?.content,
      sources: mockSources,
      timestamp: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query-results-${Date.now()}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSourceClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTopicClick = (topic) => {
    setCurrentQuery(`Tell me more about ${topic?.title?.toLowerCase()}`);
    // Could trigger new search here
  };

  const handleQuestionClick = (question) => {
    setCurrentQuery(question);
    // Could trigger new search here
  };

  const handleRefreshResponse = () => {
    setIsLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleRefreshAnalysis = () => {
    // Could trigger re-analysis of the query
    console.log("Refreshing query analysis...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Processing your query and analyzing sources...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Query Results & Source Attribution
              </h1>
              <p className="text-muted-foreground">
                Comprehensive AI responses with detailed source verification and research transparency
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="text-sm font-medium text-foreground">
                  {lastUpdated?.toLocaleTimeString()}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleRefreshResponse}
                iconName="RefreshCw"
                iconSize={16}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Current Query Display */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MessageSquare" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                  Current Query
                </h2>
                <p className="text-card-foreground text-lg">
                  "{currentQuery}"
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Processed in {mockResponse?.responseTime}ms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Database" size={14} />
                    <span>{mockResponse?.sourceCount} sources analyzed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={14} />
                    <span>{mockResponse?.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              <QueryAnalysis 
                query={currentQuery}
                analysis={mockQueryAnalysis}
                onRefreshAnalysis={handleRefreshAnalysis}
              />
              
              <ResponseCard 
                response={mockResponse}
                onCopyResponse={handleCopyResponse}
                onExportResponse={handleExportResponse}
              />
              
              <SourceAttribution 
                sources={mockSources}
                onSourceClick={handleSourceClick}
              />
              
              <SourceComparison 
                sources={mockSources}
                onCompareToggle={() => {}}
              />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <ConfidenceIndicator 
                confidence={mockResponse?.confidence}
                methodology={mockMethodology}
                sourceConsensus={89}
              />
              
              <RelatedTopics 
                topics={mockRelatedTopics}
                suggestedQuestions={mockSuggestedQuestions}
                onTopicClick={handleTopicClick}
                onQuestionClick={handleQuestionClick}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconSize={16}
                  onClick={() => window.history?.back()}
                >
                  Back to Chat
                </Button>
                <Button
                  variant="ghost"
                  iconName="Share"
                  iconSize={16}
                >
                  Share Results
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  iconName="Bookmark"
                  iconSize={16}
                >
                  Save Query
                </Button>
                <Button
                  variant="default"
                  iconName="MessageSquare"
                  iconSize={16}
                  onClick={() => window.location.href = '/main-chat-interface'}
                >
                  New Query
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResultsSourceAttribution;