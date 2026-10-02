import React from 'react';
import { Target, CheckCircle2, HelpCircle } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getOpportunityAreas } from '../data/dataLoader';

interface OpportunityAreasPageProps {
  records: UnifiedResearchRecord[];
}

export const OpportunityAreasPage: React.FC<OpportunityAreasPageProps> = ({ records }) => {
  const opportunities = getOpportunityAreas(records);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-1">
          <Target className="w-4 h-4" />
          <span>Product Strategy</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Strategic Opportunity Areas</h2>
        <p className="text-xs text-gray-500 mt-1">
          Evidence-driven product opportunities emerging directly from research findings before feature implementation.
        </p>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{opp.title}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-100">
                {opp.evidenceCount.toLocaleString()} Grounding Evidence Records
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] block">User Problem</span>
                <p className="text-rose-950 font-medium">{opp.userProblem}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px] block">Current Breakdown</span>
                <p className="text-amber-950 font-medium">{opp.currentBreakdown}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">User Need</span>
                <p className="text-emerald-950 font-medium">{opp.userNeed}</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                <span className="font-bold text-blue-800 uppercase tracking-wider text-[10px] block">Product Opportunity</span>
                <p className="text-blue-950 font-medium">{opp.opportunity}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-700 block mb-1">Potential MVP Capability:</span>
                <p className="text-gray-600">{opp.potentialMvp}</p>
              </div>

              <div>
                <span className="font-bold text-emerald-700 block mb-1">Success Metric:</span>
                <p className="text-emerald-800 font-semibold">{opp.successMetric}</p>
              </div>
            </div>

            {opp.openQuestions.length > 0 && (
              <div className="text-xs text-gray-500 bg-amber-50/40 p-3 rounded-lg border border-amber-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Open Question:</strong> {opp.openQuestions[0]}</span>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
