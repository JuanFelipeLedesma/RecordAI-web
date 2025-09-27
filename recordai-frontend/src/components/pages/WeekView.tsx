import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekViewProps {
  currentWeek: Date;
  onWeekChange: (week: Date) => void;
}

export function WeekView({ currentWeek, onWeekChange }: WeekViewProps) {
  const getWeekDays = () => {
    const startOfWeek = new Date(currentWeek);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weekReminders = {
    0: [{ title: 'Study Calculus', time: '14:30' }, { title: 'Buy fruit', time: '16:00' }],
    1: [{ title: 'Team meeting', time: '09:00' }],
    2: [{ title: 'Doctor appointment', time: '10:00' }, { title: 'Finish book', time: '19:00' }],
    3: [{ title: 'Gym session', time: '18:00' }],
    4: [{ title: 'Grocery shopping', time: '11:00' }, { title: 'Movie night', time: '20:00' }],
    5: [{ title: 'Birthday party', time: '15:00' }],
    6: [{ title: 'Rest day' }]
  };

  const formatWeekHeader = () => {
    const startDate = weekDays[0].getDate();
    const endDate = weekDays[6].getDate();
    const month = weekDays[0].toLocaleDateString('en', { month: 'short' });
    return `Week of ${startDate} ${month}`;
  };

  const prevWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    onWeekChange(newWeek);
  };

  const nextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    onWeekChange(newWeek);
  };

  return (
    <div className="px-32 py-8">
      {/* Week Navigator */}
      <div className="flex items-center justify-center mb-8 bg-white border border-gray-200 rounded-lg p-4 sticky top-0">
        <button
          onClick={prevWeek}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="mx-8 text-xl font-medium text-black min-w-48 text-center">
          {formatWeekHeader()}
        </h2>
        
        <button
          onClick={nextWeek}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 min-h-64">
            <div className="mb-4 pb-2 border-b border-gray-100">
              <div className="font-medium text-black">{dayNames[index]}</div>
              <div className="text-lg text-gray-600">{day.getDate()}</div>
            </div>
            
            <div className="space-y-2">
              {(weekReminders[index] || []).map((reminder, reminderIndex) => (
                <div key={reminderIndex} className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-sm font-medium text-black">{reminder.title}</div>
                  {reminder.time && (
                    <div className="text-xs text-gray-600 mt-1">{reminder.time}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}