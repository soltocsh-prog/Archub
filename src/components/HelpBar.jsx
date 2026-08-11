import React from 'react';
import ReactMarkdown from 'react-markdown';
import { X, BookText } from 'lucide-react';

export default function HelpBar({ close }) {
  // Mock markdown content for Phase 1
  const markdownContent = `
### 📘 사용 가이드

현재 선택된 툴의 매뉴얼이 여기에 표시됩니다.

**주요 기능:**
- Iframe 연동 가이드
- 프롬프트 작성 팁
- 사내 노하우 공유

> 이 패널은 \`react-markdown\`을 통해 렌더링됩니다.
  `;

  return (
    <aside className="w-80 h-full bg-white border-l border-arch-border flex flex-col shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.03)] z-20">
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2 text-arch-navy font-medium">
          <BookText size={18} className="text-arch-blue" />
          <span>Manual & Tips</span>
        </div>
        <button 
          onClick={close} 
          className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 prose prose-sm prose-slate max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </aside>
  );
}
