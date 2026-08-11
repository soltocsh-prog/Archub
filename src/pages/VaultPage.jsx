import React, { useState } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { Plus, Trash2, Key, Globe, Layout, Info, CheckCircle, ShieldCheck } from 'lucide-react';

export default function VaultPage() {
  const { workflows, addTool, removeTool } = useWorkflow();
  const [activeTab, setActiveTab] = useState('tools'); // 'tools' | 'accounts'

  // 새 툴 추가를 위한 상태
  const [newTool, setNewTool] = useState({
    name: '',
    url: '',
    description: '',
    workflowId: 'design-base',
    iframeBlocked: false
  });

  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTool.name || !newTool.url) return;

    const toolId = newTool.name.toLowerCase().replace(/\s+/g, '-');
    addTool(newTool.workflowId, {
      id: toolId,
      name: newTool.name,
      description: newTool.description,
      url: newTool.url,
      iframeBlocked: newTool.iframeBlocked
    });

    // 폼 초기화
    setNewTool({
      name: '',
      url: '',
      description: '',
      workflowId: 'design-base',
      iframeBlocked: false
    });
    
    alert('새로운 도구가 워크플로우에 추가되었습니다!');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-arch-navy tracking-tight mb-2 uppercase">Vault</h1>
          <p className="text-gray-500">사내 공용 계정 및 개인 워크플로우 도구를 관리합니다.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
        <button 
          onClick={() => setActiveTab('tools')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'tools' ? 'bg-white text-arch-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          도구 관리
        </button>
        <button 
          onClick={() => setActiveTab('accounts')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'accounts' ? 'bg-white text-arch-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          공용 계정
        </button>
      </div>

      {activeTab === 'tools' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-arch-border p-6 rounded-2xl shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-arch-navy mb-6 flex items-center gap-2">
                <Plus size={20} className="text-arch-blue" />
                새 도구 추가
              </h3>
              <form onSubmit={handleAddTool} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">서비스 이름</label>
                  <input 
                    type="text" 
                    value={newTool.name}
                    onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                    placeholder="예: Midjourney"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-arch-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">URL</label>
                  <input 
                    type="url" 
                    value={newTool.url}
                    onChange={(e) => setNewTool({...newTool, url: e.target.value})}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-arch-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">워크플로우 선택</label>
                  <select 
                    value={newTool.workflowId}
                    onChange={(e) => setNewTool({...newTool, workflowId: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-arch-blue outline-none bg-white"
                  >
                    {workflows.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">설명 (간략히)</label>
                  <textarea 
                    value={newTool.description}
                    onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                    rows="2"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-arch-blue outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="iframeBlocked"
                    checked={newTool.iframeBlocked}
                    onChange={(e) => setNewTool({...newTool, iframeBlocked: e.target.checked})}
                    className="w-4 h-4 text-arch-blue"
                  />
                  <label htmlFor="iframeBlocked" className="text-xs text-gray-500">Iframe 차단 서비스인가요?</label>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-arch-navy text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors mt-4"
                >
                  워크플로우에 추가하기
                </button>
              </form>
            </div>
          </div>

          {/* Tool List */}
          <div className="lg:col-span-2 space-y-6">
            {workflows.map(workflow => (
              <div key={workflow.id} className="bg-white border border-arch-border rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="font-bold text-arch-navy text-sm">{workflow.name}</h4>
                  <span className="text-[10px] bg-white border px-2 py-0.5 rounded text-gray-400">{workflow.tools.length} Tools</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {workflow.tools.length === 0 ? (
                    <div className="px-6 py-8 text-center text-xs text-gray-400">등록된 도구가 없습니다.</div>
                  ) : (
                    workflow.tools.map(tool => (
                      <div key={tool.id} className="px-6 py-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-arch-bg rounded-lg flex items-center justify-center">
                            <Globe size={14} className="text-arch-blue" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-arch-navy">{tool.name}</p>
                            <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{tool.url}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeTool(workflow.id, tool.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-arch-blue/20 p-12 rounded-3xl text-center">
          <ShieldCheck size={48} className="text-arch-blue mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-arch-navy mb-2">공용 계정 게시판</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            팀원들이 함께 사용하는 SaaS의 계정 정보를 여기에 기록해 보세요. <br/>
            (현재 이 기능은 준비 중입니다. 곧 업데이트될 예정입니다!)
          </p>
        </div>
      )}
    </div>
  );
}
