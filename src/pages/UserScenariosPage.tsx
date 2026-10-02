import React from 'react';
import { Sparkles, ArrowRight, Layers, FileText } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getUserScenarios } from '../data/dataLoader';

interface UserScenariosPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const UserScenariosPage: React.FC<UserScenariosPageProps> = ({ records, onSelectRecord }) => {
  const scenarios = getUserScenarios(records);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Evidence-Backed Archetypes</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">User Scenario Cards</h2>
        <p className="text-xs text-gray-500 mt-1">
          Representative user retrieval scenarios synthesized from raw research evidence.
        </p>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((sc) => (
          <div key={sc.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900">{sc.title}</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                  {sc.evidenceCount.toLocaleString()} Evidence Records
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="font-bold text-emerald-800 block mb-0.5">Remembered Context:</span>
                  <span className="text-emerald-950">{sc.remembered}</span>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="font-bold text-rose-800 block mb-0.5">Forgotten Metadata:</span>
                  <span className="text-rose-950">{sc.forgotten}</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="font-bold text-blue-800 block mb-0.5">Search Behavior:</span>
                  <span className="text-blue-950">{sc.searchBehavior}</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                  <span className="font-bold text-amber-900 block mb-0.5">Observed Failure Mode:</span>
                  <span className="text-amber-950">{sc.failureMode}</span>
                </div>
              </div>
            </div>

            {/* Sample Evidence */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block mb-2">Supporting Sample Evidence</span>
              <div className="space-y-2">
                {sc.sampleEvidence.map(s => (
                  <div
                    key={s.record_id}
                    onClick={() => onSelectRecord(s)}
                    className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs cursor-pointer flex items-center justify-between"
                  >
                    <span className="truncate text-gray-700 max-w-[80%]">"{s.primary_text}"</span>
                    <span className="text-blue-600 font-semibold text-[11px]">Inspect</span>
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
