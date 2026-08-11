import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Archive, Settings } from 'lucide-react';
import MainLayout from './layouts/MainLayout';
import WorkflowDashboard from './pages/WorkflowDashboard';
import SaaSViewer from './pages/SaaSViewer';
import CalendarPage from './pages/CalendarPage';
import ResourcesPage from './pages/ResourcesPage';
import VaultPage from './pages/VaultPage';
import CalendarWidget from './components/CalendarWidget';

// Placeholder Pages
const Dashboard = () => (
  <div className="p-8 max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-arch-navy mb-2">Architectural Command Center</h2>
        <p className="text-gray-500">환영합니다. 오늘도 멋진 설계를 시작해 볼까요?</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-gradient-to-br from-arch-navy to-arch-blue p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Workflows</h3>
            <p className="text-blue-100 mb-6 text-sm">좌측 사이드바에서 업무 단계를 선택하여 전용 SaaS 도구들을 활용하세요.</p>
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-medium">법규 검토</div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-medium">디자인 베이스</div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-medium">모델링</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-arch-border hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
              <Archive size={20} className="text-orange-500" />
            </div>
            <h4 className="font-bold text-arch-navy mb-1 text-sm">리소스 뱅크</h4>
            <p className="text-xs text-gray-500">최신 스크립트 및 소스</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-arch-border hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <Settings size={20} className="text-green-500" />
            </div>
            <h4 className="font-bold text-arch-navy mb-1 text-sm">계정 금고</h4>
            <p className="text-xs text-gray-500">보안 계정 관리</p>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <CalendarWidget />
      </div>
    </div>
  </div>
);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="workflow/:id" element={<WorkflowDashboard />} />
          <Route path="tool/:id" element={<SaaSViewer />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="settings" element={<VaultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
