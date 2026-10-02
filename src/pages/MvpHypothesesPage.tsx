import React from 'react';
import { Sparkles, CheckCircle2, HelpCircle, Layers } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getMvpHypotheses } from '../data/dataLoader';

interface MvpHypothesesPageProps {
  records: UnifiedResearchRecord[];
}

export const MvpHypothesesPage: React.FC<MvpHypothesesPageProps> = ({ records }) => {
  const hypotheses = getMvpHypotheses(records);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Product Execution</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Evidence-Backed MVP Hypotheses</h2>
        <p className="text-xs text-gray-500 mt-1">
          3 core product hypotheses designed to solve verified retrieval friction points with clear success metrics.
        </p>
      </div>

      {/* Hypotheses List */}
      <div className="space-y-6">
        {hypotheses.map((h, idx) => (
          <div key={h.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 mr-2">
                  Hypothesis #{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-gray-900 inline-block mt-1">{h.title}</h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-100">
                {h.evidenceCount.toLocaleString()} Grounding Evidence Records
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="font-bold text-gray-700 block mb-1">Problem Statement:</span>
                <p className="text-gray-600">{h.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="font-bold text-gray-700 block mb-1">Target User Scenario:</span>
                <p className="text-gray-600">{h.targetUserScenario}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-2">
              <div>
                <span className="font-bold text-emerald-800 block">Proposed Capability:</span>
                <p className="text-emerald-950 font-medium">{h.proposedCapability}</p>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-emerald-700">Success Metric: {h.successMetric}</span>
                <span className="text-gray-500 italic">Open Question: {h.openQuestion}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
