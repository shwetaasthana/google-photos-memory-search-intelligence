import React from 'react';
import { HelpCircle, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { UnifiedResearchRecord } from '../types';
import { getTaxonomyCategoryStats } from '../data/dataLoader';

interface WhatUsersForgetPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const WhatUsersForgetPage: React.FC<WhatUsersForgetPageProps> = ({ records }) => {
  const rememberStats = getTaxonomyCategoryStats(records, 'what_users_remember');
  const forgetStats = getTaxonomyCategoryStats(records, 'what_users_forget');

  const colors = ['#ea4335', '#d93025', '#f9ab00', '#a142f4', '#5f6368'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>Cognitive Information Gaps</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">What Users Forget (Missing Search Keys)</h2>
        <p className="text-xs text-gray-500 mt-1">
          Analysis of missing metadata that prevents traditional search queries from succeeding.
        </p>
      </div>

      {/* Visual Comparison: REMEMBERED vs FORGOTTEN */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-900">Cognitive Divergence: Remembered vs. Forgotten</h3>
            <p className="text-xs text-gray-500">Comparing rich contextual human memory against required database search metadata</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <ArrowRightLeft className="w-4 h-4 text-[#1a73e8]" />
            <span>Memory Disconnect</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* REMEMBERED COLUMN */}
          <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">What Users Remember</span>
              <span className="text-xs font-bold text-emerald-600">Human Context</span>
            </div>
            {rememberStats.slice(0, 5).map(item => (
              <div key={item.category} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-100 text-xs">
                <span className="font-semibold text-gray-800">{item.category}</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{item.percentage}%</span>
              </div>
            ))}
          </div>

          {/* FORGOTTEN COLUMN */}
          <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">What Users Forget</span>
              <span className="text-xs font-bold text-rose-600">Searchable Keys</span>
            </div>
            {forgetStats.slice(0, 5).map(item => (
              <div key={item.category} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-rose-100 text-xs">
                <span className="font-semibold text-gray-800">{item.category}</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">{item.percentage}%</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Forgotten Stats Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Frequency of Forgotten Information Categories</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forgetStats} layout="vertical" margin={{ top: 5, right: 30, left: 140, bottom: 5 }}>
              <XAxis type="number" unit="%" domain={[0, 100]} stroke="#9ca3af" fontSize={12} />
              <YAxis dataKey="category" type="category" stroke="#4b5563" fontSize={12} width={130} />
              <Tooltip 
                formatter={(val: any) => [`${val}%`, 'Percentage']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
              />
              <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                {forgetStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
