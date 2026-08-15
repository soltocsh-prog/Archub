import React, { createContext, useContext } from 'react';
import { WORKFLOWS as DEFAULT_WORKFLOWS } from '../data/workflows';

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  // 툴 ID로 검색하는 헬퍼 함수
  const getToolById = (toolId) => {
    for (const workflow of DEFAULT_WORKFLOWS) {
      const tool = workflow.tools.find(t => t.id === toolId);
      if (tool) return { ...tool, workflowId: workflow.id };
    }
    return null;
  };

  return (
    <WorkflowContext.Provider value={{ workflows: DEFAULT_WORKFLOWS, getToolById }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export const useWorkflow = () => useContext(WorkflowContext);
