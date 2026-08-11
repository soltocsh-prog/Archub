import React from 'react';
import { useParams } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { ExternalLink, AlertCircle } from 'lucide-react';

export default function SaaSViewer() {
  const { id } = useParams();
  const { getToolById } = useWorkflow();
  const tool = getToolById(id);

  if (!tool) {
    return <div className="p-6 text-gray-500">도구를 찾을 수 없습니다.</div>;
  }

  // If the tool blocks iframes (like NotebookLM, Pinterest)
  if (tool.iframeBlocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#FAFAFA] p-6 text-center">
        <div className="bg-white p-10 rounded-2xl border border-arch-border shadow-sm max-w-lg w-full">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-arch-navy mb-3">{tool.name}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            해당 서비스는 자체 보안 정책(X-Frame-Options 등)으로 인해 ArchHub 내부 화면에 띄울 수 없습니다. <br/><br/>
            새 탭에서 열어 사용해 주세요. (우측 매뉴얼 바는 계속 유지됩니다.)
          </p>
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-arch-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <span>새 창에서 열기</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    );
  }

  // If it can be embedded
  return (
    <div className="w-full h-full">
      <iframe 
        src={tool.url} 
        title={tool.name}
        className="w-full h-full border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
