import React from 'react';
import { Search, ArrowRight, CornerDownRight, CheckCircle, XCircle } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getTaxonomyCategoryStats } from '../data/dataLoader';

interface SearchBehaviorPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const SearchBehaviorPage: React.FC<SearchBehaviorPageProps> = ({ records, onSelectRecord }) => {
  const behaviorStats = getTaxonomyCategoryStats(records, 'search_behavior');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
          <Search className="w-4 h-4" />
          <span>Retrieval Pattern Analysis</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">How Users Attempt Search & Retrieval</h2>
        <p className="text-xs text-gray-500 mt-1">
          Identified retrieval strategies across keyword queries, face filters, timeline scrolling, and external fallback workarounds.
        </p>
      </div>

      {/* Visual Journey Flow Component */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <h3 className="text-base font-bold text-gray-900 mb-4">Observed User Retrieval Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Stage 1</span>
            <h4 className="text-xs font-bold text-gray-900 mt-1 mb-1">Human Memory</h4>
            <p className="text-[11px] text-gray-500">Recalls context, person, trip, or item</p>
          </div>

          <div className="flex items-center justify-center text-gray-300">
            <ArrowRight className="w-5 h-5 hidden md:block" />
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Stage 2</span>
            <h4 className="text-xs font-bold text-gray-900 mt-1 mb-1">Query Formulation</h4>
            <p className="text-[11px] text-gray-500">Translates memory into 1-2 keywords</p>
          </div>

          <div className="flex items-center justify-center text-gray-300">
            <ArrowRight className="w-5 h-5 hidden md:block" />
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Stage 3</span>
            <h4 className="text-xs font-bold text-gray-900 mt-1 mb-1">Search & Scroll</h4>
            <p className="text-[11px] text-gray-500">Executes search or scrolls main timeline</p>
          </div>

          <div className="flex items-center justify-center text-gray-300">
            <ArrowRight className="w-5 h-5 hidden md:block" />
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-center col-span-1 md:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Stage 4 Outcome</span>
            <h4 className="text-xs font-bold text-gray-900 mt-1 mb-1">Failure / Fallback</h4>
            <p className="text-[11px] text-gray-500">Unrelated results → External apps or give up</p>
          </div>

        </div>
      </div>

      {/* Behavior Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {behaviorStats.map((item) => (
          <div key={item.category} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">{item.category}</span>
              <span className="text-sm font-extrabold text-indigo-600">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600" style={{ width: `${item.percentage}%` }} />
            </div>
            <div className="text-[11px] text-gray-500">
              {item.count.toLocaleString()} Research Evidence Records
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
