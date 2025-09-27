import React from 'react';
import { ReminderItem } from '../ReminderItem';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UpcomingRemindersProps {
  onReminderClick: (reminder: any) => void;
}

export function UpcomingReminders({ onReminderClick }: UpcomingRemindersProps) {
  const upcomingReminders = [
    { id: 1, title: 'Study Calculus', date: '24-08', time: '14:30', category: 'Home', completed: false },
    { id: 2, title: 'Buy fruit', date: '24-08', time: '16:00', category: 'Shopping', completed: false },
    { id: 3, title: 'Finish book', date: '25-08', time: '19:00', category: 'Other', completed: false },
    { id: 4, title: 'Doctor appointment', date: '26-08', time: '10:00', category: 'Medical', completed: true },
    { id: 5, title: 'Team meeting', date: '28-08', time: '09:00', category: 'Other', completed: false },
    { id: 6, title: 'Birthday party', date: '30-08', time: '15:00', category: 'Birthday', completed: false }
  ];

  const handleToggle = (id: number) => {
    // Handle reminder completion toggle
    console.log('Toggle reminder:', id);
  };

  return (
    <div className="px-32 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Current Reminders */}
        <div className="col-span-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-medium text-black mb-6">Current Reminders</h3>
            
            <div className="space-y-1">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id}>
                  <ReminderItem
                    title={reminder.title}
                    date={reminder.date}
                    time={reminder.time}
                    category={reminder.category}
                    completed={reminder.completed}
                    showCheckbox={true}
                    onToggle={() => handleToggle(reminder.id)}
                    onClick={() => onReminderClick(reminder)}
                  />
                  <div className="border-b border-gray-100 last:border-b-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Next Month */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h3 className="font-medium text-black mb-6">Next Month</h3>
            
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 mb-4 overflow-hidden rounded-lg opacity-60">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1578625155481-7bc40a6481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGNhbGVuZGFyJTIwbWluaW1hbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NTc5NjkwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Empty calendar illustration"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <p className="text-gray-500 font-medium">Empty</p>
              <p className="text-sm text-gray-400 mt-1">No reminders scheduled for next month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}