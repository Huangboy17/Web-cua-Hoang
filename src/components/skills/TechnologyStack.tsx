import React from 'react';
import { 
  Calculator, 
  Database, 
  Table2, 
  BarChart3, 
  CalendarRange, 
  Sparkles, 
  Bot, 
  Code2, 
  FileSpreadsheet, 
  Workflow, 
  Terminal, 
  Layers, 
  Server
} from 'lucide-react';

interface TechnologyStackProps {
  darkMode: boolean;
}

export const TechnologyStack: React.FC<TechnologyStackProps> = ({ darkMode }) => {
  const tools = [
    { name: 'G8 / F1 (Dự toán)', icon: Calculator },
    { name: 'SAP ERP (PS & CO)', icon: Database },
    { name: 'MS Excel (VBA / Macro)', icon: Table2 },
    { name: 'Power Query & Data Model', icon: FileSpreadsheet },
    { name: 'Power BI Dashboard', icon: BarChart3 },
    { name: 'MS Project (Tiến độ)', icon: CalendarRange },
    { name: 'GPT & Gemini API', icon: Sparkles },
    { name: 'Antigravity AI Agent', icon: Bot },
    { name: 'React & TypeScript', icon: Code2 },
    { name: 'Python & FastAPI', icon: Terminal },
    { name: 'PostgreSQL / Supabase', icon: Database },
    { name: 'Tailwind CSS', icon: Layers },
    { name: 'Node.js', icon: Server },
  ];

  return (
    <div id="technology-stack-section" className="mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
            darkMode ? 'text-purple-400' : 'text-purple-700'
          }`}>
            TOOLS & TECHNOLOGIES
          </h4>
          <p className={`text-xs font-normal mt-0.5 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Hệ thống công cụ chuyên ngành, nền tảng số hóa và công nghệ lập trình thực tế
          </p>
        </div>
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border self-start sm:self-auto ${
          darkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          {tools.length} Tools & Frameworks
        </span>
      </div>

      {/* Chips Container */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.name}
              className={`px-3 py-2 rounded-[10px] text-xs font-medium border flex items-center gap-2 transition-all duration-150 group cursor-default ${
                darkMode
                  ? 'bg-[#11131A] border-white/10 text-slate-300 hover:border-[#A78BFA] hover:text-[#A78BFA] hover:bg-white/[0.04]'
                  : 'bg-white border-[#E2E8F0] text-slate-700 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:shadow-xs hover:bg-slate-50/50 shadow-2xs'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span>{tool.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
