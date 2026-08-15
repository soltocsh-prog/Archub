import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PanelLeftClose, Calendar, Archive, X, Circle, BookOpen, PenTool, Box, Image as ImageIcon } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

const ICON_MAP = {
  'legal': BookOpen,
  'design-base': PenTool,
  'modeling': Box,
  'rendering': ImageIcon
};

export default function Sidebar({ isOpen, toggle, activeTabs, currentToolId, removeTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { workflows, getToolById } = useWorkflow();

  if (!isOpen) return null;

  return (
    <aside className="w-64 h-full bg-arch-navy text-gray-300 flex flex-col transition-all duration-300 shrink-0 z-50">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-700">
        <span className="font-bold text-white tracking-wider text-lg">ArchHub</span>
        <button 
          onClick={toggle} 
          className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          title="Collapse Sidebar"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col space-y-6">
        
        {/* Core Navigation */}
        <div className="px-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-arch-blue/50 text-white font-medium' : 'hover:bg-gray-800 hover:text-gray-100'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-arch-blue/50 text-white font-medium' : 'hover:bg-gray-800 hover:text-gray-100'
              }`
            }
          >
            <Calendar size={18} />
            <span className="text-sm">사내 일정</span>
          </NavLink>
        </div>

        {/* Workflows */}
        <div className="px-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Workflows</div>
          <div className="space-y-1 relative">
            {workflows.map((workflow) => {
              // Get tabs belonging to this workflow
              const workflowTabs = activeTabs
                .map(id => getToolById(id))
                .filter(tool => tool && tool.workflowId === workflow.id);
                
              const isActiveRoute = location.pathname === `/workflow/${workflow.id}`;
              const IconComponent = ICON_MAP[workflow.id] || Box;

              return (
                <div key={workflow.id} className="relative group">
                  {/* Main NavLink for the Workflow Dashboard */}
                  <NavLink
                    to={`/workflow/${workflow.id}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                      isActiveRoute ? 'bg-arch-blue/30 text-white font-medium' : 'hover:bg-gray-800 hover:text-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={18} />
                      <span className="text-sm">{workflow.name}</span>
                    </div>
                    
                    {/* Dots indicator */}
                    {workflowTabs.length > 0 && (
                      <div className="flex items-center gap-1.5 ml-2">
                        {workflowTabs.map(tool => {
                          const isToolActive = currentToolId === tool.id;
                          return (
                            <Circle 
                              key={tool.id} 
                              size={8} 
                              className={isToolActive ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'} 
                            />
                          );
                        })}
                      </div>
                    )}
                  </NavLink>

                  {/* Hover Menu for Open Tabs */}
                  {workflowTabs.length > 0 && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <div className="py-1">
                        <div className="px-3 py-1 text-xs text-gray-400 border-b border-gray-700">열려있는 탭</div>
                        {workflowTabs.map(tool => {
                          const isToolActive = currentToolId === tool.id;
                          return (
                            <div 
                              key={tool.id}
                              onClick={() => navigate(`/tool/${tool.id}`)}
                              className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors ${
                                isToolActive ? 'text-white bg-gray-700/50' : 'text-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Circle size={8} className={isToolActive ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'} />
                                <span className="text-sm truncate">{tool.name}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTab(tool.id);
                                  if (isToolActive) navigate(`/workflow/${workflow.id}`);
                                }}
                                className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer (+a Tools) */}
      <div className="p-3 border-t border-gray-700 space-y-1">
        <NavLink 
          to="/resources" 
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isActive ? 'bg-arch-blue/50 text-white font-medium' : 'hover:bg-gray-800 text-gray-300 hover:text-white'
            }`
          }
        >
          <Archive size={18} />
          <span>리소스 & 스크립트 뱅크</span>
        </NavLink>
      </div>
    </aside>
  );
}
