import React, { useState, useMemo } from 'react';
import { FileSearch, Search, Filter, ArrowUpRight, Check } from 'lucide-react';
import { UnifiedResearchRecord } from '../types';

interface EvidenceExplorerPageProps {
  records: UnifiedResearchRecord[];
  onSelectRecord: (r: UnifiedResearchRecord) => void;
}

export const EvidenceExplorerPage: React.FC<EvidenceExplorerPageProps> = ({ records, onSelectRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [selectedBarrier, setSelectedBarrier] = useState<string>('all');

  const clustersList = [
    'all',
    'Search Precision & Natural Language Failure',
    'Library Organization & Sorting Chaos',
    'Sync, Restore & Media Picker Failure',
    'Editing & Workflow Integration Friction',
    'Storage & Deduplication Management'
  ];

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const textMatch = searchTerm === '' || 
        r.primary_text.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.secondary_text && r.secondary_text.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.search_query_used && r.search_query_used.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const clusterMatch = selectedCluster === 'all' || r.taxonomy.problem_cluster.includes(selectedCluster);
      const barrierMatch = selectedBarrier === 'all' || r.taxonomy.retrieval_barriers.includes(selectedBarrier);

      return textMatch && clusterMatch && barrierMatch;
    });
  }, [records, searchTerm, selectedCluster, selectedBarrier]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <FileSearch className="w-4 h-4" />
          <span>Evidence Traceability</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Evidence Explorer</h2>
        <p className="text-xs text-gray-500 mt-1">
          Filter and search all {records.length.toLocaleString()} normalized research records with taxonomy tags and record inspector.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search keyword in evidence (e.g., 'passport', 'crashes', 'restore', 'album')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>

          {/* Problem Cluster Filter */}
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="w-full md:w-64 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#1a73e8]"
          >
            <option value="all">All Problem Clusters</option>
            {clustersList.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Showing <strong className="text-gray-900">{filteredRecords.length.toLocaleString()}</strong> matching records</span>
          {(searchTerm || selectedCluster !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedCluster('all'); }}
              className="text-blue-600 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.slice(0, 30).map((r) => (
          <div
            key={r.record_id}
            onClick={() => onSelectRecord(r)}
            className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {r.source_type.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">ID: {r.record_id}</span>
              </div>
              <p className="text-xs text-gray-800 line-clamp-4 leading-relaxed font-sans mb-3">
                "{r.primary_text}"
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">{r.created_at || 'No Date'}</span>
              <span className="text-[#1a73e8] font-semibold flex items-center gap-0.5">
                Inspect <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
