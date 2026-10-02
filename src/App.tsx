import React, { useState, useMemo } from 'react';
import { Sidebar, navItems } from './components/Sidebar';
import { Header } from './components/Header';
import { EvidenceModal } from './components/EvidenceModal';
import { SourceFilter, UnifiedResearchRecord } from './types';
import { allRecords, getFilteredRecords } from './data/dataLoader';

import { OverviewPage } from './pages/OverviewPage';
import { SourcesPage } from './pages/SourcesPage';
import { WhatUsersRememberPage } from './pages/WhatUsersRememberPage';
import { WhatUsersForgetPage } from './pages/WhatUsersForgetPage';
import { SearchBehaviorPage } from './pages/SearchBehaviorPage';
import { RetrievalProblemsPage } from './pages/RetrievalProblemsPage';
import { UserScenariosPage } from './pages/UserScenariosPage';
import { KeyInsightsPage } from './pages/KeyInsightsPage';
import { ProblemClustersPage } from './pages/ProblemClustersPage';
import { RootCausesPage } from './pages/RootCausesPage';
import { OpportunityAreasPage } from './pages/OpportunityAreasPage';
import { MvpHypothesesPage } from './pages/MvpHypothesesPage';
import { EvidenceExplorerPage } from './pages/EvidenceExplorerPage';
import { SurveyResultsPage } from './pages/SurveyResultsPage';
import { RawDataPage } from './pages/RawDataPage';

export function App() {
  const [activePage, setActivePage] = useState<string>('overview');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [selectedRecord, setSelectedRecord] = useState<UnifiedResearchRecord | null>(null);

  const activeRecords = useMemo(() => {
    return getFilteredRecords(sourceFilter);
  }, [sourceFilter]);

  const activeNav = navItems.find(n => n.id === activePage);

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage records={activeRecords} onSelectRecord={setSelectedRecord} setActivePage={setActivePage} />;
      case 'sources':
        return <SourcesPage records={allRecords} sourceFilter={sourceFilter} setSourceFilter={setSourceFilter} onSelectRecord={setSelectedRecord} />;
      case 'remember':
        return <WhatUsersRememberPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'forget':
        return <WhatUsersForgetPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'behavior':
        return <SearchBehaviorPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'problems':
        return <RetrievalProblemsPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'scenarios':
        return <UserScenariosPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'insights':
        return <KeyInsightsPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'clusters':
        return <ProblemClustersPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'rootcauses':
        return <RootCausesPage />;
      case 'opportunities':
        return <OpportunityAreasPage records={activeRecords} />;
      case 'mvp':
        return <MvpHypothesesPage records={activeRecords} />;
      case 'evidence':
        return <EvidenceExplorerPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'survey':
        return <SurveyResultsPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      case 'rawdata':
        return <RawDataPage records={activeRecords} onSelectRecord={setSelectedRecord} />;
      default:
        return <OverviewPage records={activeRecords} onSelectRecord={setSelectedRecord} setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        totalRecordsCount={allRecords.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          activePageTitle={activeNav?.label || 'Overview'}
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
          filteredCount={activeRecords.length}
          totalCount={allRecords.length}
        />

        <main className="p-8 max-w-7xl w-full mx-auto flex-1">
          {renderPage()}
        </main>
      </div>

      {/* Record Inspector Drawer Modal */}
      <EvidenceModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}

export default App;
