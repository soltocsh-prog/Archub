import React, { useState, useEffect } from 'react';

export default function CalendarWidget() {
  const [calendarIds, setCalendarIds] = useState(['en.south_korea#holiday@group.v.calendar.google.com']);

  useEffect(() => {
    const saved = localStorage.getItem('archhub_calendars_v2');
    if (saved) {
      const data = JSON.parse(saved);
      setCalendarIds(data.map(c => c.id));
    }
  }, []);

  const baseUrl = "https://calendar.google.com/calendar/embed?mode=AGENDA&ctz=Asia%2FSeoul&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0";
  const finalUrl = `${baseUrl}&${calendarIds.map(id => `src=${encodeURIComponent(id)}`).join('&')}`;

  return (
    <div className="bg-white rounded-2xl border border-arch-border shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-arch-navy text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          다가오는 사내 일정
        </h3>
      </div>
      <div className="flex-1">
        <iframe
          src={finalUrl}
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          title="Calendar Widget"
        />
      </div>
    </div>
  );
}
