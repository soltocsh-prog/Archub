import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Image as ImageIcon, Filter, Search, Terminal, Box } from 'lucide-react';

const RESOURCE_DATA = {
  scripts: {
    title: '스크립트',
    icon: <Terminal className="text-orange-500" />,
    filters: ['all', 'rhino', 'sketchup', 'cad', 'gh'],
    items: [
      { id: 1, title: 'Rhino Curve Cleaner', tag: 'rhino', desc: '커브의 중복 점을 제거하고 최적화합니다.', color: 'from-orange-400 to-red-500' },
      { id: 2, title: 'Sketchup Auto Layer', tag: 'sketchup', desc: '컴포넌트 이름을 기반으로 레이어를 자동 할당합니다.', color: 'from-red-400 to-pink-500' },
      { id: 3, title: 'CAD Lisp Bundle', tag: 'cad', desc: '도면 작업을 가속화하는 10가지 리스프 모음입니다.', color: 'from-blue-400 to-indigo-500' },
      { id: 4, title: 'Grasshopper Wall Gen', tag: 'gh', desc: '파라메트릭 벽체 생성용 알고리즘 파일입니다.', color: 'from-green-400 to-teal-500' },
    ]
  },
  sources: {
    title: '소스',
    icon: <Box className="text-blue-500" />,
    filters: ['all', 'png', 'cad', '3d', 'psd'],
    items: [
      { id: 5, title: 'Cutout People (Arch)', tag: 'png', desc: '건축 투시도용 고화질 인물 소스 모음.', color: 'from-indigo-400 to-purple-500' },
      { id: 6, title: 'Classic Column 3D', tag: '3d', desc: '고전 양식 기둥의 정밀 3D 모델링 파일.', color: 'from-purple-400 to-pink-500' },
      { id: 7, title: 'Interior Detail CAD', tag: 'cad', desc: '실내 인테리어 상세 도면 (DWG) 세트.', color: 'from-cyan-400 to-blue-500' },
      { id: 8, title: 'Tree PSD Pack', tag: 'psd', desc: '계절별 나무 포토샵 소스 패키지.', color: 'from-emerald-400 to-green-500' },
    ]
  }
};

const ResourceSection = ({ category, data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? data.items 
    : data.items.filter(item => item.tag === activeFilter);

  return (
    <div className="mb-6 bg-white rounded-2xl border border-arch-border shadow-sm overflow-hidden">
      {/* Header (Collapsible) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            {data.icon}
          </div>
          <h3 className="text-xl font-bold text-arch-navy">{data.title}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">
            {data.items.length}
          </span>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-50">
          {/* Filter UI */}
          <div className="flex items-center gap-2 py-4 mb-2 overflow-x-auto no-scrollbar">
            <Filter size={14} className="text-gray-400 mr-2 flex-shrink-0" />
            {data.filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === f 
                    ? 'bg-arch-navy text-white border-arch-navy shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-arch-blue hover:text-arch-blue'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
              >
                {/* Background Gradient (Gem Style) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:scale-110 transition-transform duration-500`}></div>
                
                {/* Subtle Pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                  <div>
                    <span className="inline-block px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase mb-2">
                      {item.tag}
                    </span>
                    <h4 className="text-lg font-bold leading-tight group-hover:translate-x-1 transition-transform">{item.title}</h4>
                  </div>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Floating Icon on Hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity">
                  {data.icon}
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              선택한 필터에 해당하는 항목이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function ResourcesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-arch-navy tracking-tight mb-2 uppercase">Library</h1>
          <p className="text-gray-500">사내 노하우와 유용한 건축 리소스를 한곳에 모았습니다.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-arch-border text-sm focus:outline-none focus:border-arch-blue w-64 shadow-sm"
          />
        </div>
      </div>

      <ResourceSection category="scripts" data={RESOURCE_DATA.scripts} />
      <ResourceSection category="sources" data={RESOURCE_DATA.sources} />
    </div>
  );
}
