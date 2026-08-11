import React, { createContext, useContext, useState, useEffect } from 'react';
import { WORKFLOWS as DEFAULT_WORKFLOWS } from '../data/workflows';

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  // 로컬 스토리지에서 동적 워크플로우 데이터를 불러오거나 기본값 사용
  const [workflows, setWorkflows] = useState(() => {
    const saved = localStorage.getItem('archhub_dynamic_workflows');
    return saved ? JSON.parse(saved) : DEFAULT_WORKFLOWS;
  });

  // 상태가 변경될 때마다 로컬 스토리지 업데이트 (PWA 오프라인 대응)
  useEffect(() => {
    localStorage.setItem('archhub_dynamic_workflows', JSON.stringify(workflows));
  }, [workflows]);

  // 특정 워크플로우에 툴 추가
  const addTool = (workflowId, newTool) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === workflowId) {
        // 이미 존재하는 툴 ID인지 확인 방어 로직
        if (w.tools.some(t => t.id === newTool.id)) return w;
        return { ...w, tools: [...w.tools, newTool] };
      }
      return w;
    }));
  };

  // 특정 워크플로우에서 툴 삭제
  const removeTool = (workflowId, toolId) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === workflowId) {
        return { ...w, tools: w.tools.filter(t => t.id !== toolId) };
      }
      return w;
    }));
  };

  // 툴 ID로 검색하는 헬퍼 함수
  const getToolById = (toolId) => {
    for (const workflow of workflows) {
      const tool = workflow.tools.find(t => t.id === toolId);
      if (tool) return { ...tool, workflowId: workflow.id };
    }
    return null;
  };

  return (
    <WorkflowContext.Provider value={{ workflows, addTool, removeTool, getToolById }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export const useWorkflow = () => useContext(WorkflowContext);
