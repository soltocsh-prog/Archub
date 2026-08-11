import { BookOpen, PenTool, Box, Image, Link } from 'lucide-react';

export const WORKFLOWS = [
  {
    id: 'legal',
    name: '법규 검토',
    icon: BookOpen,
    tools: [
      {
        id: 'notebooklm',
        name: 'NotebookLM',
        description: '사내 법규 문서 및 사례 데이터베이스 기반 질의응답',
        url: 'https://notebooklm.google.com/',
        iframeBlocked: true // Cannot be embedded due to Google security
      }
    ]
  },
  {
    id: 'design-base',
    name: '디자인 베이스',
    icon: PenTool,
    tools: [
      {
        id: 'cosmos',
        name: 'Cosmos',
        description: '건축/디자인 레퍼런스 통합 수집 플랫폼',
        url: 'https://cosmos.build/',
        iframeBlocked: true
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        description: '아이디어 및 이미지 보드 구성',
        url: 'https://www.pinterest.com/',
        iframeBlocked: true
      }
    ]
  },
  {
    id: 'modeling',
    name: '모델링',
    icon: Box,
    tools: []
  },
  {
    id: 'rendering',
    name: '렌더링',
    icon: Image,
    tools: []
  }
];

// Helper to find a tool by its ID
export const getToolById = (toolId) => {
  for (const workflow of WORKFLOWS) {
    const tool = workflow.tools.find(t => t.id === toolId);
    if (tool) return { ...tool, workflowId: workflow.id };
  }
  return null;
};
