import React from 'react';
import { Lightbulb, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getKeyInsights } from '../data/dataLoader';

interface KeyInsightsPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const KeyInsightsPage: React.FC<KeyInsightsPageProps> = ({ records, onSelectRecord }) => {
  const insights = getKeyInsights(records);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
          <Lightbulb className="w-4 h-4" />
          <span>Evidence-Backed Syntheses</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Key Product Research Insights</h2>
        <p className="text-xs text-gray-500 mt-1">
          Each insight is grounded in dataset statistics with sample size denominators and confidence ratings.
        </p>
      </div>

      {/* Insights List */}
      <div className="space-y-6">
        {insights.map((ins) => (
          <div key={ins.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 mr-2">
                  Insight {ins.id.replace('insight-', '#')}
                </span>
                <h3 className="text-lg font-bold text-gray-900 inline-block mt-1">{ins.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Confidence: {ins.confidence}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-100">
                  {ins.evidenceCount.toLocaleString()} Records ({ins.percentage}%)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              {ins.explanation}
            </p>

            {/* Supporting Examples */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Supporting Evidence Examples ({ins.sources.join(', ')})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ins.supportingExamples.map(ex => (
                  <div
                    key={ex.record_id}
                    onClick={() => onSelectRecord(ex)}
                    className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-amber-200 transition-all cursor-pointer text-xs"
                  >
                    <p className="text-gray-800 line-clamp-3 leading-relaxed mb-2">"{ex.primary_text}"</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="uppercase font-semibold text-gray-600">{ex.source_type.replace('_', ' ')}</span>
                      <span className="text-amber-700 font-medium flex items-center gap-0.5">
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
