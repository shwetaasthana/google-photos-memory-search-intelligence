import React from 'react';
import { X, ExternalLink, Calendar, User, Tag, Database, Star } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';

interface EvidenceModalProps {
  record: UnifiedResearchRecord | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-[#1a73e8] border border-blue-100">
              {record.source_type.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-400 font-mono">ID: {record.record_id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Text */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Primary Text / Evidence</h4>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
              "{record.primary_text}"
            </div>
          </div>

          {/* Secondary Details */}
          {record.secondary_text && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Secondary Context / Title / Fallback</h4>
              <p className="text-xs text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                {record.secondary_text}
              </p>
            </div>
          )}

          {/* Search Query Used */}
          {record.search_query_used && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Search Query Prompt</h4>
              <code className="text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 inline-block font-mono">
                "{record.search_query_used}"
              </code>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block mb-0.5">Author / User</span>
              <span className="font-semibold text-gray-700">{record.user_identifier || 'Anonymous'}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Date / Created</span>
              <span className="font-semibold text-gray-700">{record.created_at || 'Unknown'}</span>
            </div>
            {record.rating_score !== undefined && record.rating_score !== null && (
              <div>
                <span className="text-gray-400 block mb-0.5">Rating / Score</span>
                <span className="font-semibold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {record.rating_score}
                </span>
              </div>
            )}
          </div>

          {/* Survey Fields if present */}
          {record.source_type === 'user_survey' && (
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2 text-xs">
              <h4 className="font-bold text-purple-900 mb-1">Survey Structured Responses</h4>
              <div><span className="text-purple-600 font-medium">Usage Frequency:</span> {record.usage_frequency}</div>
              <div><span className="text-purple-600 font-medium">Library Size:</span> {record.library_size}</div>
              <div><span className="text-purple-600 font-medium">Struggle Frequency:</span> {record.struggle_frequency}</div>
              <div><span className="text-purple-600 font-medium">Search Success Outcome:</span> {record.survey_outcome}</div>
            </div>
          )}

          {/* Taxonomy Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Taxonomy Classifications</h4>
            <div className="flex flex-wrap gap-1.5">
              {record.taxonomy.what_users_remember.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Remember: {t}
                </span>
              ))}
              {record.taxonomy.what_users_forget.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                  Forget: {t}
                </span>
              ))}
              {record.taxonomy.retrieval_barriers.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  Barrier: {t}
                </span>
              ))}
              {record.taxonomy.problem_cluster.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Cluster: {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
          {record.source_url ? (
            <a
              href={record.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1a73e8] hover:underline font-medium"
            >
              <span>View Original Web Resource</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-gray-400">Direct In-App / Survey Record</span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
