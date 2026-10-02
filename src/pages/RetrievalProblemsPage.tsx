import React from 'react';
import { AlertTriangle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getTaxonomyCategoryStats } from '../data/dataLoader';

interface RetrievalProblemsPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const RetrievalProblemsPage: React.FC<RetrievalProblemsPageProps> = ({ records, onSelectRecord }) => {
  const barrierStats = getTaxonomyCategoryStats(records, 'retrieval_barriers');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Retrieval Barriers Taxonomy</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Where User Retrieval Breaks Down</h2>
        <p className="text-xs text-gray-500 mt-1">
          Clustered failure modes derived from actual user reviews, forum complaints, and survey incident narratives.
        </p>
      </div>

      {/* Barriers Cards */}
      <div className="space-y-4">
        {barrierStats.map((item) => {
          const sample = records.filter(r => r.taxonomy.retrieval_barriers.includes(item.category)).slice(0, 3);

          return (
            <div key={item.category} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{item.category}</h3>
                  <p className="text-xs text-gray-500">{item.count.toLocaleString()} evidence records ({item.percentage}% of dataset)</p>
                </div>
                <span className="text-lg font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  {item.percentage}%
                </span>
              </div>

              {/* Sample Evidence List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sample.map(s => (
                  <div
                    key={s.record_id}
                    onClick={() => onSelectRecord(s)}
                    className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-amber-200 transition-all cursor-pointer text-xs"
                  >
                    <p className="text-gray-800 line-clamp-3 leading-relaxed mb-2 font-sans">
                      "{s.primary_text}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="uppercase font-semibold text-gray-600">{s.source_type.replace('_', ' ')}</span>
                      <span className="text-amber-700 font-medium flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
