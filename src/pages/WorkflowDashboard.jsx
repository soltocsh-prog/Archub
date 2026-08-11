import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { BookOpen, PenTool, Box, Image as ImageIcon } from 'lucide-react';

const ICON_MAP = {
  'legal': BookOpen,
  'design-base': PenTool,
  'modeling': Box,
  'rendering': ImageIcon
};

export default function WorkflowDashboard() {
  const { addTab } = useOutletContext();
  const { id } = useParams();
  const { workflows } = useWorkflow();
  const workflow = workflows.find(w => w.id === id);

  if (!workflow) {
    return <div className="p-6 text-gray-500">존재하지 않는 워크플로우입니다.</div>;
  }

  const IconComponent = ICON_MAP[workflow.id] || Box;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <IconComponent className="w-8 h-8 text-arch-navy" />
        <h1 className="text-3xl font-bold text-arch-navy tracking-tight">{workflow.name}</h1>
      </div>

      {workflow.tools.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
          아직 등록된 서비스가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflow.tools.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl border border-arch-border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <h3 className="text-lg font-semibold text-arch-navy mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-500 flex-1 mb-6 leading-relaxed">{tool.description}</p>
              
              <Link 
                to={`/tool/${tool.id}`}
                onClick={() => addTab(tool.id)}
                className="w-full text-center bg-arch-bg hover:bg-gray-200 text-arch-navy font-medium py-2 rounded-lg transition-colors"
              >
                서비스 열기
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
