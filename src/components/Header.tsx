import React from 'react';
import { Filter, Layers, Database } from 'lucide-react';
import { SourceFilter } from '../types';

interface HeaderProps {
  activePageTitle: string;
  sourceFilter: SourceFilter;
  setSourceFilter: (filter: SourceFilter) => void;
  filteredCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePageTitle,
  sourceFilter,
  setSourceFilter,
  filteredCount,
  totalCount
}) => {
  const sources: { id: SourceFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'All Sources' },
    { id: 'play_store', label: 'Google Play (18)' },
    { id: 'reddit', label: 'Reddit (2,490)' },
    { id: 'google_search', label: 'Google Search (10)' },
    { id: 'user_survey', label: 'Survey (17)' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between shadow-2xs">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{activePageTitle}</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Showing <span className="font-semibold text-gray-700">{filteredCount.toLocaleString()}</span> of {totalCount.toLocaleString()} research records
          {sourceFilter !== 'all' && <span className="ml-1 text-[#1a73e8] font-medium">(Filtered by {sourceFilter.replace('_', ' ')})</span>}
        </p>
      </div>

      {/* Global Source Filter Pills */}
      <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/80">
        <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-gray-500">
          <Filter className="w-3.5 h-3.5" />
          <span>Source:</span>
        </div>
        {sources.map((src) => {
          const isSelected = sourceFilter === src.id;
          return (
            <button
              key={src.id}
              onClick={() => setSourceFilter(src.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-white text-[#1a73e8] font-semibold shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              {src.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
