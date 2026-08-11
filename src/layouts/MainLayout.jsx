import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HelpBar from '../components/HelpBar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isHelpBarOpen, setIsHelpBarOpen] = useState(true);
  
  // State for tabs
  const [activeTabs, setActiveTabs] = useState(() => {
    const saved = localStorage.getItem('activeTabs');
    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('activeTabs', JSON.stringify(activeTabs));
  }, [activeTabs]);

  const addTab = (toolId) => {
    if (!activeTabs.includes(toolId)) {
      setActiveTabs([...activeTabs, toolId]);
    }
  };

  const removeTab = (toolId) => {
    setActiveTabs(activeTabs.filter(id => id !== toolId));
  };

  // Determine current active tool based on URL
  const currentToolId = location.pathname.startsWith('/tool/') 
    ? location.pathname.split('/')[2] 
    : null;

  return (
    <div className="flex h-screen w-full bg-arch-bg overflow-hidden text-gray-800">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        activeTabs={activeTabs}
        currentToolId={currentToolId}
        removeTab={removeTab}
      />
      
      {/* Main Stage */}
      <main className="flex-1 flex flex-col h-full bg-white relative shadow-sm z-10 transition-all duration-300">
        <header className="h-14 border-b border-arch-border flex items-center px-4 justify-between bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                title="Expand Sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="font-semibold text-arch-navy tracking-tight">Main Stage</h1>
          </div>
          <button 
            onClick={() => setIsHelpBarOpen(!isHelpBarOpen)} 
            className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              isHelpBarOpen ? 'bg-arch-blue/10 text-arch-blue' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {isHelpBarOpen ? 'Manual On' : 'Manual Off'}
          </button>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[#FAFAFA]">
          <Outlet context={{ addTab }} />
        </div>
      </main>

      {/* Help Bar (Right Panel) */}
      {isHelpBarOpen && (
        <HelpBar close={() => setIsHelpBarOpen(false)} currentToolId={currentToolId} />
      )}
    </div>
  );
}
