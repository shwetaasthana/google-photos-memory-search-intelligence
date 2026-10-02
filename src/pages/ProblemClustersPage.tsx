import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getProblemClusterDetails } from '../data/dataLoader';

interface ProblemClustersPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const ProblemClustersPage: React.FC<ProblemClustersPageProps> = ({ records, onSelectRecord }) => {
  const clusters = getProblemClusterDetails(records);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>PM Taxonomy Clusters</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Five Major Problem Clusters</h2>
        <p className="text-xs text-gray-500 mt-1">
          Higher-level grouping of user friction points across search precision, organization, sync, editing, and storage.
        </p>
      </div>

      {/* Clusters Stack */}
      <div className="space-y-6">
        {clusters.map((cl) => (
          <div key={cl.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200 mr-2">
                  Cluster {cl.id.replace('cluster-', '#')}
                </span>
                <h3 className="text-base font-bold text-gray-900 inline-block mt-1">{cl.title}</h3>
              </div>
              <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                {cl.count.toLocaleString()} Evidence Records ({cl.percentage}%)
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{cl.description}</p>

            {/* Source Breakdown */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-semibold text-gray-500">Source Breakdown:</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-100">Play Store: {cl.sources.play_store}</span>
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">Reddit: {cl.sources.reddit}</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium border border-amber-100">Search: {cl.sources.google_search}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">Survey: {cl.sources.user_survey}</span>
            </div>

            {/* Sample Records */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Cluster Evidence Samples</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cl.sampleRecords.map(s => (
                  <div
                    key={s.record_id}
                    onClick={() => onSelectRecord(s)}
                    className="p-3 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer text-xs"
                  >
                    <p className="text-gray-800 line-clamp-3 leading-relaxed mb-2 font-sans">"{s.primary_text}"</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="uppercase font-semibold text-gray-600">{s.source_type.replace('_', ' ')}</span>
                      <span className="text-indigo-600 font-medium flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
