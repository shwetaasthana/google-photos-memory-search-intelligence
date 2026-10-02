import React from 'react';
import { Database, Search, HelpCircle, AlertTriangle, ArrowRight, Brain, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';
import { getSourceStats, getTaxonomyCategoryStats } from '../data/dataLoader';

interface OverviewPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
  setActivePage: (p: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ records, onSelectRecord, setActivePage }) => {
  const stats = getSourceStats(records);
  const rememberedStats = getTaxonomyCategoryStats(records, 'what_users_remember');
  const barrierStats = getTaxonomyCategoryStats(records, 'retrieval_barriers');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Research Question Card - Deep Dark Slate / Navy Theme */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-white via-transparent to-transparent pointer-events-none" />
        <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Core Product Discovery Question</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight max-w-3xl mb-4 text-slate-100 tracking-tight">
          "How might we help users retrieve a photo when they remember the experience, context, or visual details — but not the exact searchable information?"
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Grounding: 2,535 Real Normalized Research Records
          </span>
          <span className="bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700 shadow-xs">
            4 Multi-Source Channels
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Total Research Records</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-2">100% Real Normalized Dataset</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Play Store Reviews</div>
          <div className="text-3xl font-bold text-blue-600">{stats.playStore.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-2">Play Store App Reviews</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Reddit Discussions</div>
          <div className="text-3xl font-bold text-indigo-600">{stats.reddit.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-2">Scraped Community Threads</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Google SERP Search</div>
          <div className="text-3xl font-bold text-amber-600">{stats.googleSearch.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-2">Discovery Query Snippets</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">User Survey Responses</div>
          <div className="text-3xl font-bold text-emerald-600">{stats.survey.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-2">Primary Form Submissions</div>
        </div>
      </div>

      {/* 4 Research Pillars Navigation */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Four Major Research Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">1. What Users Remember</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                People remember context, people, locations, and events — but lack searchable terms.
              </p>
              <div className="text-xs font-semibold text-blue-800 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                Top Cue: {rememberedStats[0]?.category || 'Person / Location'} ({rememberedStats[0]?.percentage || 0}%)
              </div>
            </div>
            <button
              onClick={() => setActivePage('remember')}
              className="mt-6 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>Explore Memory Cues</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">2. What Users Forget</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Users routinely forget exact calendar dates, indexable OCR keywords, and raw filenames.
              </p>
              <div className="text-xs font-semibold text-rose-800 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                Primary Gap: Exact Calendar Dates & Keywords
              </div>
            </div>
            <button
              onClick={() => setActivePage('forget')}
              className="mt-6 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>Explore Memory Gaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">3. How They Search</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Users attempt single keywords, face tags, and manual scrolling before falling back to external apps.
              </p>
              <div className="text-xs font-semibold text-indigo-800 bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                Journey: Memory → Keyword → Scroll → Fallback
              </div>
            </div>
            <button
              onClick={() => setActivePage('behavior')}
              className="mt-6 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>Explore Search Behavior</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">4. Where Retrieval Breaks</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Unrelated search results, chronological date resets on restore, and loose un-albumed photos.
              </p>
              <div className="text-xs font-semibold text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-100">
                Top Barrier: {barrierStats[0]?.category || 'Unrelated Search Results'} ({barrierStats[0]?.percentage || 0}%)
              </div>
            </div>
            <button
              onClick={() => setActivePage('problems')}
              className="mt-6 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>Explore Retrieval Barriers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Featured Representative Evidence */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Representative Evidence Samples</h3>
            <p className="text-xs text-gray-500">Sample records from Play Store, Reddit, Search, and Survey</p>
          </div>
          <button
            onClick={() => setActivePage('evidence')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            View All {records.length.toLocaleString()} Records &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.slice(0, 4).map((r) => (
            <div
              key={r.record_id}
              onClick={() => onSelectRecord(r)}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-blue-200 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
            >
              <p className="text-xs text-gray-800 line-clamp-3 leading-relaxed mb-3">
                "{r.primary_text}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-semibold text-gray-700 uppercase tracking-wider">{r.source_type.replace('_', ' ')}</span>
                <span>ID: {r.record_id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
