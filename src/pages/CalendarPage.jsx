import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Info, ExternalLink, Plus, Trash2, Save, X as CloseIcon } from 'lucide-react';

export default function CalendarPage() {
  // [{ id: '...', name: '...' }] 형태의 상태 관리
  const [calendars, setCalendars] = useState([
    { id: 'en.south_korea#holiday@group.v.calendar.google.com', name: '대한민국 휴일' }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('archhub_calendars_v2');
    if (saved) {
      let data = JSON.parse(saved);
      // 기존에 잘못 들어간 데이터(iframe 태그 등) 자동 청소
      const cleaned = data.map(cal => ({
        ...cal,
        id: extractId(cal.id)
      }));
      setCalendars(cleaned);
    }
  }, []);

  const extractId = (input) => {
    let id = input.trim();
    // <iframe> 태그에서 src 추출
    if (id.includes('<iframe')) {
      const match = id.match(/src="([^"]+)"/);
      if (match) id = match[1];
    }
    // URL에서 src 파라미터 추출
    if (id.includes('src=')) {
      const urlParams = new URLSearchParams(id.split('?')[1]);
      const src = urlParams.get('src');
      if (src) id = src;
    }
    return id;
  };

  const handleAdd = () => {
    if (!newId.trim()) return;
    const finalId = extractId(newId);
    const updated = [...calendars, { id: finalId, name: newName.trim() || '이름 없음' }];
    setCalendars(updated);
    save(updated);
    setNewId('');
    setNewName('');
  };

  const handleDelete = (index) => {
    const updated = calendars.filter((_, i) => i !== index);
    setCalendars(updated);
    save(updated);
  };

  const save = (data) => {
    localStorage.setItem('archhub_calendars_v2', JSON.stringify(data));
  };

  // 구글 캘린더 임베드 URL 생성
  const baseUrl = "https://calendar.google.com/calendar/embed?ctz=Asia%2FSeoul&showPrint=0&showTabs=1&showCalendars=0";
  const finalIframeUrl = `${baseUrl}&${calendars.map(c => `src=${encodeURIComponent(c.id)}`).join('&')}`;

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-arch-navy" />
          <h1 className="text-3xl font-bold text-arch-navy tracking-tight">사내 일정</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://calendar.google.com/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-arch-blue border border-arch-blue/30 px-3 py-1.5 rounded-lg hover:bg-arch-blue/5 transition-colors"
          >
            <Plus size={16} />
            일정 편집하기
            <ExternalLink size={14} />
          </a>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              isEditing ? 'bg-arch-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Settings size={16} />
            캘린더 목록 관리
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="bg-white border border-arch-border p-6 rounded-2xl mb-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-arch-navy">연동된 캘린더 목록</h2>
            <button onClick={() => setIsEditing(false)}><CloseIcon size={20} className="text-gray-400" /></button>
          </div>
          
          <div className="space-y-3 mb-6">
            {calendars.map((cal, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-arch-navy truncate">{cal.name}</p>
                  <p className="text-xs text-gray-500 truncate">{cal.id}</p>
                </div>
                <button 
                  onClick={() => handleDelete(index)}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-bold text-arch-navy mb-3">새 캘린더 추가</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input 
                type="text" 
                placeholder="캘린더 이름 (예: 내 일정)" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-arch-blue outline-none"
              />
              <input 
                type="text" 
                placeholder="캘린더 ID (또는 Iframe 코드)" 
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-arch-blue outline-none"
              />
            </div>
            <button 
              onClick={handleAdd}
              className="w-full bg-arch-blue text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              목록에 추가
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-arch-border overflow-hidden min-h-[600px]">
        <iframe
          src={finalIframeUrl}
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        />
      </div>
    </div>
  );
}

// 아이콘 임포트 오류 방지용 임시 선언
const Settings = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
