import React, { useState } from 'react';
import { Calendar } from '../Calendar';
import { TagChip } from '../TagChip';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  time?: string;
  tag: 'home' | 'shopping' | 'other' | 'medical' | 'work';
  completed: boolean;
}

interface DayDetailProps {
  selectedDate: Date;
  currentMonth: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (month: Date) => void;
  onReminderClick: (reminder: any) => void;
}

export function DayDetail({
  selectedDate,
  currentMonth,
  onDateSelect,
  onMonthChange,
  onReminderClick
}: DayDetailProps) {
  const [newTask, setNewTask] = useState('');
  
  const dayTasks: Task[] = [
    { id: '1', title: 'Study Calculus', time: '14:30', tag: 'home', completed: false },
    { id: '2', title: 'Buy fruit', time: '16:00', tag: 'shopping', completed: false },
    { id: '3', title: 'Finish book', time: '19:00', tag: 'other', completed: true },
    { id: '4', title: 'Call mom', time: '20:00', tag: 'other', completed: false },
    { id: '5', title: 'Review presentation', time: '21:00', tag: 'work', completed: true },
    { id: '6', title: 'Prepare lunch for tomorrow', tag: 'home', completed: false }
  ];

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${month} ${year}`;
  };

  const handleToggle = (id: string) => {
    console.log('Toggle task:', id);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      console.log('Add task:', newTask);
      setNewTask('');
    }
  };

  const pendingTasks = dayTasks.filter(task => !task.completed);
  const completedTasks = dayTasks.filter(task => task.completed);

  return (
    <div className="px-32 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">{formatDate(selectedDate)}</h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Large Calendar (65-70% width) */}
        <div className="col-span-8">
          <Calendar
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onDateSelect={onDateSelect}
            onMonthChange={onMonthChange}
            size="large"
            className="w-full"
          />
        </div>

        {/* Right Column - Day Tasks (30-35% width) */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* Quick Add */}
            <form onSubmit={handleAddTask} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a task..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </form>

            {/* Pending Tasks */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Pending</h3>
              
              <div className="space-y-1">
                {pendingTasks.map((task) => (
                  <div key={task.id}>
                    <div
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => onReminderClick(task)}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggle(task.id)}
                        className="mt-1 w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {task.title}
                        </div>
                        {task.time && (
                          <div className="text-xs text-gray-600 mt-1">
                            {task.time}
                          </div>
                        )}
                        <div className="mt-2">
                          <TagChip 
                            label={task.tag} 
                            variant={task.tag}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-100 last:border-b-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-4">Completed</h3>
                <div className="space-y-1">
                  {completedTasks.map((task) => (
                    <div key={task.id}>
                      <div
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer opacity-75"
                        onClick={() => onReminderClick(task)}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggle(task.id)}
                          className="mt-1 w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 line-through">
                            {task.title}
                          </div>
                          {task.time && (
                            <div className="text-xs text-gray-600 mt-1">
                              {task.time}
                            </div>
                          )}
                          <div className="mt-2">
                            <TagChip 
                              label={task.tag} 
                              variant={task.tag}
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-100 last:border-b-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}