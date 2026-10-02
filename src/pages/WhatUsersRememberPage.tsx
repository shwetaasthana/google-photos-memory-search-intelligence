import React, { useState } from 'react';
import { Brain, Filter, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { UnifiedResearchRecord } from '../types';
import { getTaxonomyCategoryStats } from '../data/dataLoader';

interface WhatUsersRememberPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const WhatUsersRememberPage: React.FC<WhatUsersRememberPageProps> = ({ records, onSelectRecord }) => {
  const stats = getTaxonomyCategoryStats(records, 'what_users_remember');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#a142f4', '#24c1e0', '#ff6d01'];

  const filteredEvidence = selectedCategory
    ? records.filter(r => r.taxonomy.what_users_remember.includes(selectedCategory))
    : records;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <Brain className="w-4 h-4" />
          <span>Cognitive Memory Breakdown</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">What Users Remember About Lost Photos</h2>
        <p className="text-xs text-gray-500 mt-1">
          Calculated dynamically from {records.length.toLocaleString()} research records. Shows the contextual memory attributes users recall when attempting photo retrieval.
        </p>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Memory Cue Frequency & Percentage Distribution</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats} layout="vertical" margin={{ top: 5, right: 30, left: 140, bottom: 5 }}>
              <XAxis type="number" unit="%" domain={[0, 100]} stroke="#9ca3af" fontSize={12} />
              <YAxis dataKey="category" type="category" stroke="#4b5563" fontSize={12} width={130} />
              <Tooltip 
                formatter={(val: any) => [`${val}%`, 'Frequency']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, idx) => {
          const isSelected = selectedCategory === item.category;
          return (
            <div
              key={item.category}
              onClick={() => setSelectedCategory(isSelected ? null : item.category)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/60 border-[#1a73e8] ring-2 ring-blue-100 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-blue-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">{item.category}</span>
                <span className="text-sm font-extrabold text-[#1a73e8]">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#1a73e8] transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>{item.count.toLocaleString()} Evidence Records</span>
                <span className="text-blue-600 font-semibold">{isSelected ? 'Active Filter ✓' : 'Click to filter'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Supporting Evidence Drilldown */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Supporting Evidence {selectedCategory ? `for "${selectedCategory}"` : 'across all memory cues'}
            </h3>
            <p className="text-xs text-gray-500">Showing {filteredEvidence.length.toLocaleString()} matching records</p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvidence.slice(0, 6).map((r) => (
            <div
              key={r.record_id}
              onClick={() => onSelectRecord(r)}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-blue-200 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
            >
              <p className="text-xs text-gray-800 line-clamp-3 leading-relaxed mb-3">
                "{r.primary_text}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-2.5">
                <span className="font-semibold text-gray-600 uppercase tracking-wider">{r.source_type.replace('_', ' ')}</span>
                <span className="text-[#1a73e8] font-medium flex items-center gap-1">
                  Inspect Record <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
