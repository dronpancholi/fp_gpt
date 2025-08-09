import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QueryResultsSourceAttribution from './pages/query-results-source-attribution';
import ApiSourceStatusDashboard from './pages/api-source-status-dashboard';
import SettingsPreferences from './pages/settings-preferences';
import SearchHistoryConversations from './pages/search-history-conversations';
import MainChatInterface from './pages/main-chat-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ApiSourceStatusDashboard />} />
        <Route path="/query-results-source-attribution" element={<QueryResultsSourceAttribution />} />
        <Route path="/api-source-status-dashboard" element={<ApiSourceStatusDashboard />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="/search-history-conversations" element={<SearchHistoryConversations />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
