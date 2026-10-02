import React, { useState, useMemo } from 'react';
import { Table2, Search, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';

interface RawDataPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const RawDataPage: React.FC<RawDataPageProps> = ({ records, onSelectRecord }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        r.record_id.toLowerCase().includes(s) ||
        r.source_type.toLowerCase().includes(s) ||
        r.primary_text.toLowerCase().includes(s) ||
        (r.user_identifier && r.user_identifier.toLowerCase().includes(s))
      );
    });
  }, [records, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
          <Table2 className="w-4 h-4 text-gray-500" />
          <span>Complete Dataset Table</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Raw Normalized Research Data</h2>
        <p className="text-xs text-gray-500 mt-1">
          Search, filter, and inspect all {records.length.toLocaleString()} normalized records stored in <code>normalized_research_data.json</code>.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        
        {/* Table Search & Controls */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search raw dataset..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#1a73e8]"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Page <strong className="text-gray-900">{currentPage}</strong> of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1.5 rounded-md border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-md border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Render */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/70 border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Record ID</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Author / User</th>
                <th className="py-3 px-4">Primary Text Preview</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((r) => (
                <tr key={r.record_id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{r.record_id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                      {r.source_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium truncate max-w-[120px]">{r.user_identifier || 'Anonymous'}</td>
                  <td className="py-3 px-4 text-gray-800 line-clamp-2 max-w-md font-sans">"{r.primary_text}"</td>
                  <td className="py-3 px-4 text-gray-500 text-[11px]">{r.created_at || 'N/A'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectRecord(r)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1a73e8] hover:underline"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
