import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StatusOverviewBanner from './components/StatusOverviewBanner';
import SourceStatusCard from './components/SourceStatusCard';
import PerformanceChart from './components/PerformanceChart';
import SystemNotifications from './components/SystemNotifications';
import OfflineIndicator from './components/OfflineIndicator';
import RefreshButton from './components/RefreshButton';

const ApiSourceStatusDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock data for API sources
  const [apiSources] = useState([
    {
      id: 'duckduckgo',
      name: 'DuckDuckGo Search API',
      description: 'Web search and instant answers',
      icon: 'Search',
      status: 'operational',
      responseTime: 1250,
      successRate: 98.5,
      queriesProcessed: 15420,
      errorRate: 1.5,
      avgResponseTime: 1180,
      peakLoadTime: '2:00 PM - 4:00 PM UTC',
      recentQueries: [
        {
          query: 'What is machine learning?',
          status: 'success',
          responseTime: 1100,
          timestamp: '14:32'
        },
        {
          query: 'Python programming tutorial',
          status: 'success',
          responseTime: 1350,
          timestamp: '14:28'
        },
        {
          query: 'Climate change effects',
          status: 'success',
          responseTime: 980,
          timestamp: '14:25'
        },
        {
          query: 'React hooks explained',
          status: 'success',
          responseTime: 1420,
          timestamp: '14:20'
        },
        {
          query: 'Database optimization techniques',
          status: 'success',
          responseTime: 1180,
          timestamp: '14:15'
        }
      ]
    },
    {
      id: 'wikipedia',
      name: 'Wikipedia REST API',
      description: 'Encyclopedia articles and summaries',
      icon: 'BookOpen',
      status: 'operational',
      responseTime: 850,
      successRate: 99.2,
      queriesProcessed: 8930,
      errorRate: 0.8,
      avgResponseTime: 920,
      peakLoadTime: '1:00 PM - 3:00 PM UTC',
      recentQueries: [
        {
          query: 'Albert Einstein biography',
          status: 'success',
          responseTime: 780,
          timestamp: '14:35'
        },
        {
          query: 'World War II timeline',
          status: 'success',
          responseTime: 920,
          timestamp: '14:30'
        },
        {
          query: 'Photosynthesis process',
          status: 'success',
          responseTime: 650,
          timestamp: '14:22'
        },
        {
          query: 'Renaissance art movement',
          status: 'success',
          responseTime: 1050,
          timestamp: '14:18'
        },
        {
          query: 'Quantum physics principles',
          status: 'success',
          responseTime: 890,
          timestamp: '14:12'
        }
      ]
    },
    {
      id: 'academic',
      name: 'Academic Sources (arXiv/Semantic Scholar)',
      description: 'Research papers and academic content',
      icon: 'GraduationCap',
      status: 'degraded',
      responseTime: 3200,
      successRate: 94.8,
      queriesProcessed: 2150,
      errorRate: 5.2,
      avgResponseTime: 2850,
      peakLoadTime: '10:00 AM - 12:00 PM UTC',
      estimatedRecovery: '30 minutes',
      recentQueries: [
        {
          query: 'Neural network architectures 2024',
          status: 'success',
          responseTime: 2800,
          timestamp: '14:33'
        },
        {
          query: 'Quantum computing algorithms',
          status: 'error',
          responseTime: 5000,
          timestamp: '14:29'
        },
        {
          query: 'Climate modeling research',
          status: 'success',
          responseTime: 3400,
          timestamp: '14:24'
        },
        {
          query: 'Biomedical engineering advances',
          status: 'success',
          responseTime: 2950,
          timestamp: '14:19'
        },
        {
          query: 'Artificial intelligence ethics',
          status: 'success',
          responseTime: 3100,
          timestamp: '14:14'
        }
      ]
    }
  ]);

  // Mock performance chart data
  const [performanceData] = useState([
    { time: '12:00', duckduckgo: 1200, wikipedia: 800, academic: 2800 },
    { time: '12:30', duckduckgo: 1150, wikipedia: 850, academic: 3100 },
    { time: '13:00', duckduckgo: 1300, wikipedia: 780, academic: 2900 },
    { time: '13:30', duckduckgo: 1250, wikipedia: 920, academic: 3200 },
    { time: '14:00', duckduckgo: 1180, wikipedia: 760, academic: 3400 },
    { time: '14:30', duckduckgo: 1250, wikipedia: 850, academic: 3200 },
    { time: '15:00', duckduckgo: 1100, wikipedia: 890, academic: 2950 },
    { time: '15:30', duckduckgo: 1350, wikipedia: 820, academic: 3150 }
  ]);

  // Mock system notifications
  const [notifications] = useState([
    {
      id: 1,
      type: 'maintenance',
      title: 'Scheduled Maintenance - Academic Sources',
      message: 'Performance optimization in progress for arXiv and Semantic Scholar APIs. Some queries may experience increased response times.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      affectedSources: ['arXiv', 'Semantic Scholar'],
      estimatedResolution: '1 hour'
    },
    {
      id: 2,
      type: 'resolved',
      title: 'DuckDuckGo Rate Limiting Resolved',
      message: 'The temporary rate limiting issue affecting search queries has been resolved. All services are now operating normally.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      affectedSources: ['DuckDuckGo Search']
    }
  ]);

  // Calculate overall status
  const calculateOverallStatus = () => {
    const operationalCount = apiSources?.filter(source => source?.status === 'operational')?.length;
    const degradedCount = apiSources?.filter(source => source?.status === 'degraded')?.length;
    const outageCount = apiSources?.filter(source => source?.status === 'outage')?.length;

    if (outageCount > 0) return 'outage';
    if (degradedCount > 0) return 'degraded';
    return 'operational';
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const overallStatus = calculateOverallStatus();
  const activeSources = apiSources?.filter(source => source?.status === 'operational')?.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading system status...</p>
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
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              API Source Status Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of knowledge source availability and performance
            </p>
          </div>
          <RefreshButton onRefresh={handleRefresh} />
        </div>

        {/* Status Overview Banner */}
        <StatusOverviewBanner
          overallStatus={overallStatus}
          totalSources={apiSources?.length}
          activeSources={activeSources}
        />

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart
            data={performanceData}
            title="API Response Times (Last 4 Hours)"
          />
        </div>

        {/* Source Status Cards */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 mb-8">
          {apiSources?.map((source) => (
            <SourceStatusCard key={source?.id} source={source} />
          ))}
        </div>

        {/* System Notifications */}
        <SystemNotifications notifications={notifications} />
      </div>
      {/* Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
};

export default ApiSourceStatusDashboard;