import React from 'react';
import { GitBranch, ArrowDown, HelpCircle, AlertCircle } from 'lucide-react';

export const RootCausesPage: React.FC = () => {
  const mapSteps = [
    { label: 'Retrieval Trigger & Intent', desc: 'User needs to access a specific historical photo (medical doc, passport, trip photo, childhood memory).' },
    { label: 'Incomplete Human Memory', desc: 'User remembers context (who, where, activity) but forgets exact calendar dates, indexable OCR keywords, or folder paths.' },
    { label: 'Query Formulation Bottleneck', desc: 'User inputs a vague or single-keyword prompt ("passport", "dog in hat") into search bar.' },
    { label: 'System Metadata Mismatch', desc: 'Traditional search relies strictly on exact date tags, literal OCR strings, or tagged faces.' },
    { label: 'Irrelevant Result Flooding', desc: 'Search returns hundreds of unrelated photos or displays "Nothing found".' },
    { label: 'Manual Refinement & Scroll Fatigue', desc: 'User is forced into exhausting manual chronological scrolling or checking individual albums.' },
    { label: 'Task Abandonment / External Fallback', desc: 'User gives up, switches to external messaging apps, Google Drive, or physical flash drives.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
          <GitBranch className="w-4 h-4" />
          <span>Diagnostic Framework</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Evidence-Based Root Cause Map</h2>
        <p className="text-xs text-gray-500 mt-1">
          Tracing the breakdown from human memory cues down to search query mismatch and task abandonment.
        </p>
      </div>

      {/* Root Cause Flowchart */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xs max-w-3xl mx-auto space-y-4">
        {mapSteps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-blue-300 transition-all flex items-start gap-4 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1a73e8] font-bold text-sm flex items-center justify-center shrink-0 border border-blue-100">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{step.label}</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
            {idx < mapSteps.length - 1 && (
              <div className="flex justify-center text-gray-300 py-1">
                <ArrowDown className="w-5 h-5 text-blue-500" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-xs text-blue-900 leading-relaxed max-w-3xl mx-auto">
        <strong className="font-bold block mb-1">PM Takeaway:</strong> The core failure occurs at Step 4 (System Metadata Mismatch). The product must bridge the gap between descriptive human memory and machine-indexable attributes.
      </div>

    </div>
  );
};
