import React from 'react';
import { 
  Building2, 
  Cpu, 
  Layers, 
  Sparkles, 
  Code2, 
  Database, 
  Calculator, 
  Workflow 
} from 'lucide-react';
import { SkillCategory } from '../types';
import { SkillsHero } from './skills/SkillsHero';
import { CapabilityStats } from './skills/CapabilityStats';
import { CapabilityCard } from './skills/CapabilityCard';
import { DifferentiatorCard } from './skills/DifferentiatorCard';
import { TechnologyStack } from './skills/TechnologyStack';

interface SkillsSectionProps {
  categories: SkillCategory[];
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, darkMode }) => {
  const getCategoryIcon = (name: string = '') => {
    const safeName = (name || '').toLowerCase();
    if (safeName.includes('kinh tế') || safeName.includes('dự toán') || safeName.includes('chi phí')) return Building2;
    if (safeName.includes('ai') || safeName.includes('tự động') || safeName.includes('công nghệ')) return Sparkles;
    if (safeName.includes('frontend') || safeName.includes('web') || safeName.includes('dev')) return Code2;
    if (safeName.includes('database') || safeName.includes('cloud') || safeName.includes('dữ liệu')) return Database;
    return Layers;
  };

  const safeCategories = categories && categories.length > 0 ? categories : [];

  return (
    <section 
      id="skills" 
      className={`py-20 md:py-28 relative border-t transition-colors ${
        darkMode ? 'bg-[#08090D] border-white/10 text-[#F8FAFC]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TẦNG 1: HERO HEADER */}
        <SkillsHero darkMode={darkMode} />

        {/* TẦNG 2: 4 CAPABILITY KPI CARDS */}
        <CapabilityStats categories={safeCategories} darkMode={darkMode} />

        {/* TẦNG 3: 2 BENTO CAPABILITY CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {safeCategories.map((cat, idx) => {
            const catName = cat.categoryName || `Danh mục ${idx + 1}`;
            const isConstruction = idx === 0 || catName.toLowerCase().includes('kinh tế') || catName.toLowerCase().includes('chi phí');
            
            const number = String(idx + 1).padStart(2, '0');
            const title = isConstruction 
              ? 'KINH TẾ XÂY DỰNG & QUẢN LÝ CHI PHÍ' 
              : (idx === 1 ? 'AI & DIGITAL AUTOMATION' : catName.toUpperCase());
            const subtitle = isConstruction
              ? 'Nền tảng chuyên môn cốt lõi'
              : (idx === 1 ? 'Công nghệ hỗ trợ tự động hóa công việc' : 'Năng lực mở rộng & công nghệ bổ trợ');
            
            const countLabel = isConstruction
              ? `${String(cat.skills?.length || 0).padStart(2, '0')} NĂNG LỰC CỐT LÕI`
              : `${String(cat.skills?.length || 0).padStart(2, '0')} NĂNG LỰC CÔNG NGHỆ`;

            const icon = getCategoryIcon(catName);

            return (
              <CapabilityCard
                key={catName + idx}
                id={`capability-card-${idx + 1}`}
                number={number}
                title={title}
                subtitle={subtitle}
                countLabel={countLabel}
                skills={cat.skills || []}
                icon={icon}
                darkMode={darkMode}
                accentVariant={isConstruction ? 'purple' : 'blue'}
              />
            );
          })}
        </div>

        {/* TẦNG 4: DIFFERENTIATOR BOX */}
        <DifferentiatorCard darkMode={darkMode} />

        {/* TẦNG 4B: TECHNOLOGY STACK */}
        <TechnologyStack darkMode={darkMode} />

      </div>
    </section>
  );
};
export default SkillsSection;
