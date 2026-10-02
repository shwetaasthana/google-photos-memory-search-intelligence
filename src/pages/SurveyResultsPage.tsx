import React from 'react';
import { ClipboardList, Users, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { UnifiedResearchRecord } from '../types';

interface SurveyResultsPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const SurveyResultsPage: React.FC<SurveyResultsPageProps> = ({ records, onSelectRecord }) => {
  const surveyRecords = records.filter(r => r.source_type === 'user_survey');

  // Compute Frequency distribution
  const freqCounts: Record<string, number> = {};
  surveyRecords.forEach(r => {
    if (r.usage_frequency) {
      freqCounts[r.usage_frequency] = (freqCounts[r.usage_frequency] || 0) + 1;
    }
  });

  const freqData = Object.entries(freqCounts).map(([name, value]) => ({ name, value }));

  // Compute Struggle frequency
  const struggleCounts: Record<string, number> = {};
  surveyRecords.forEach(r => {
    if (r.struggle_frequency) {
      struggleCounts[r.struggle_frequency] = (struggleCounts[r.struggle_frequency] || 0) + 1;
    }
  });

  const struggleData = Object.entries(struggleCounts).map(([name, value]) => ({ name, value }));

  const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#a142f4'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          <ClipboardList className="w-4 h-4" />
          <span>Form Responses Dashboard</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">User Survey Analysis ({surveyRecords.length} Respondents)</h2>
        <p className="text-xs text-gray-500 mt-1">
          Direct survey response metrics, usage frequency distributions, struggle rates, and qualitative stories.
        </p>
      </div>

      {/* Survey Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Total Survey Respondents</div>
          <div className="text-3xl font-bold text-emerald-600">{surveyRecords.length}</div>
          <div className="text-[11px] text-gray-400 mt-2">Google Forms Submissions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Struggled to Find Photos</div>
          <div className="text-3xl font-bold text-rose-600">100%</div>
          <div className="text-[11px] text-gray-400 mt-2">All respondents reported struggle</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-500 mb-1">Top Target Photo Types</div>
          <div className="text-lg font-bold text-gray-900">Trip, Person & Medical</div>
          <div className="text-[11px] text-gray-400 mt-2">Multi-select survey selections</div>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Usage Frequency Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Google Photos Usage Frequency</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={freqData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {freqData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val} Users`, 'Count']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Struggle Frequency Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Retrieval Struggle Experience</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={struggleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {struggleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[(index + 2) % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val} Users`, 'Count']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Survey Qualitative Stories */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Qualitative User Incident Stories</h3>
        <div className="space-y-3">
          {surveyRecords.map((s, idx) => (
            <div
              key={s.record_id}
              onClick={() => onSelectRecord(s)}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-emerald-200 transition-all cursor-pointer text-xs space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-800">Respondent #{idx + 1} ({s.created_at})</span>
                <span className="text-[#1a73e8] font-medium flex items-center gap-1">
                  Inspect Record <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-gray-800 font-sans leading-relaxed">
                "{s.primary_text}"
              </p>
              {s.secondary_text && (
                <div className="text-[11px] text-gray-500 bg-blue-50/50 p-2 rounded border border-blue-100/60">
                  Fallback strategy: {s.secondary_text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
