import React from 'react';
import { 
  LayoutDashboard, Database, Brain, HelpCircle, Search, AlertTriangle, 
  Sparkles, Layers, GitBranch, Lightbulb, Target, FileSearch, ClipboardList, Table2, 
  Camera
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  totalRecordsCount: number;
}

export const navItems = [
  { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
  { id: 'sources', label: '2. Research Sources', icon: Database },
  { id: 'remember', label: '3. What Users Remember', icon: Brain },
  { id: 'forget', label: '4. What Users Forget', icon: HelpCircle },
  { id: 'behavior', label: '5. Search Behavior', icon: Search },
  { id: 'problems', label: '6. Retrieval Problems', icon: AlertTriangle },
  { id: 'scenarios', label: '7. User Scenarios', icon: Sparkles },
  { id: 'insights', label: '8. Key Insights', icon: Lightbulb },
  { id: 'clusters', label: '9. Problem Clusters', icon: Layers },
  { id: 'rootcauses', label: '10. Root Causes', icon: GitBranch },
  { id: 'opportunities', label: '11. Opportunity Areas', icon: Target },
  { id: 'mvp', label: '12. MVP Hypotheses', icon: Sparkles },
  { id: 'evidence', label: '13. Evidence Explorer', icon: FileSearch },
  { id: 'survey', label: '14. Survey Results', icon: ClipboardList },
  { id: 'rawdata', label: '15. Raw Data', icon: Table2 },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, totalRecordsCount }) => {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-sm z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a73e8]">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">GOOGLE PHOTOS</div>
            <div className="text-sm font-bold text-gray-900 leading-snug">Memory Search Intelligence</div>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
          Understanding how people retrieve photos they remember but cannot precisely describe.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {totalRecordsCount.toLocaleString()} Verified Records
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 custom-scrollbar">
        <div className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Discovery Intelligence
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-blue-50 text-[#1a73e8] font-semibold border border-blue-100/80 shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1a73e8]' : 'text-gray-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-[11px] text-gray-400 text-center">
        Google Photos PM Assignment &bull; Phase 2
      </div>
    </aside>
  );
};
