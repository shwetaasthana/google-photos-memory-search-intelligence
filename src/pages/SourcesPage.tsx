import React from 'react';
import { Database, Filter, ExternalLink, CheckCircle } from 'lucide-react';
import { UnifiedResearchRecord, SourceFilter } from '../types';

interface SourcesPageProps {
  records: UnifiedResearchRecord[];
  sourceFilter: SourceFilter;
  setSourceFilter: (filter: SourceFilter) => void;
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({
  records,
  sourceFilter,
  setSourceFilter,
  onSelectRecord
}) => {
  const sourcesConfig = [
    {
      id: 'play_store' as SourceFilter,
      name: 'Google Play Store Reviews',
      packageName: 'com.google.android.apps.photos',
      totalRecords: records.filter(r => r.source_type === 'play_store').length,
      themes: ['Search Degradation', 'Video Editing Crashes', 'Perspective Tool Removal', 'Media Picker Broken', 'Restored Photo Timeline Reset'],
      topBarriers: ['Unrelated Search Results', 'Restored Dates Reset', 'Media Picker Disconnect'],
      topCues: ['Person / Kids', 'Document / Receipt', 'Slanted Architecture']
    },
    {
      id: 'reddit' as SourceFilter,
      name: 'Reddit Discussions & Comments',
      packageName: 'r/googlephotos, r/insanepeoplefacebook',
      totalRecords: records.filter(r => r.source_type === 'reddit').length,
      themes: ['Ask Photos AI Accuracy', 'Disappearing Cloud Photos', 'Loose Un-albumed Sync', 'Duplicate Image Sprawl'],
      topBarriers: ['AI Search Degradation', 'Loose Un-albumed Photos', 'Duplicate Sprawl'],
      topCues: ['Family Trip', 'Passport / Known Traveler', 'Pet Photo']
    },
    {
      id: 'google_search' as SourceFilter,
      name: 'Google SERP Search Snippets',
      packageName: 'Apify SERP Scraper Results',
      totalRecords: records.filter(r => r.source_type === 'google_search').length,
      themes: ['Why Google Photos Search Ruined', 'How to Find Old Photos', 'Folder Structure & Cognition'],
      topBarriers: ['Keyword Ambiguity', 'OCR Inaccuracy'],
      topCues: ['Passport', 'Old Photographs', 'Travel Events']
    },
    {
      id: 'user_survey' as SourceFilter,
      name: 'Primary User Survey Responses',
      packageName: 'Google Forms Form Submissions',
      totalRecords: records.filter(r => r.source_type === 'user_survey').length,
      themes: ['Frequent Search Struggles', 'Childhood Photos Lost', 'Pet Medical Records Urgent Need', 'Timeline Scrolling Fatigue'],
      topBarriers: ['Too Many Unrelated Photos', 'Manual Scroll Fatigue'],
      topCues: ['Who was in it', 'Where it was taken', 'Around when']
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Multi-Channel Research Source Breakdown</h2>
          <p className="text-xs text-gray-500 mt-1">
            Compare data volume, major research themes, top memory cues, and retrieval barriers across all 4 input channels.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
          <Database className="w-4 h-4 text-[#1a73e8]" />
          <span>Active Filter: {sourceFilter === 'all' ? 'All Sources' : sourceFilter.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sourcesConfig.map((src) => {
          const isSelected = sourceFilter === src.id;
          return (
            <div
              key={src.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#1a73e8] ring-2 ring-blue-100 shadow-md'
                  : 'border-gray-200 shadow-2xs hover:border-blue-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {src.id.replace('_', ' ')}
                  </span>
                  <span className="text-xl font-bold text-gray-900">{src.totalRecords.toLocaleString()} Records</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-1">{src.name}</h3>
                <p className="text-xs text-gray-400 font-mono mb-4">{src.packageName}</p>

                {/* Major Themes */}
                <div className="space-y-3 mb-4 text-xs">
                  <div>
                    <span className="font-bold text-gray-700 block mb-1">Major Research Themes:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {src.themes.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-amber-800 block mb-1">Top Retrieval Barriers:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {src.topBarriers.map(b => (
                        <span key={b} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[11px] border border-amber-200/60">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setSourceFilter(isSelected ? 'all' : src.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#1a73e8] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? '✓ Filtering Entire Platform' : 'Filter Platform to Source'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
