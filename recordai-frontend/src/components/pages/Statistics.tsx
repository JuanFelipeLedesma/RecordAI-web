import React from 'react';

export function Statistics() {
  const data = [
    { name: 'Birthdays', value: 20, color: '#000000' },
    { name: 'Medical', value: 15, color: '#404040' },
    { name: 'Shopping', value: 25, color: '#808080' },
    { name: 'Home', value: 30, color: '#B0B0B0' },
    { name: 'Others', value: 10, color: '#D0D0D0' }
  ];

  // Simple pie chart component without recharts to avoid potential issues
  const PieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="120"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * 754} 754`; // 2πr where r=120
            const strokeDashoffset = -(cumulativePercentage / 100) * 754;
            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke={item.color}
                strokeWidth="40"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="px-32 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Filter */}
        <div className="flex justify-center mb-8">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-black">
            <option value="last-month">Last month</option>
            <option value="last-3-months">Last 3 months</option>
            <option value="last-6-months">Last 6 months</option>
            <option value="last-year">Last year</option>
          </select>
        </div>

        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center h-96">
            <PieChart />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-black">{entry.name}</span>
                <span className="text-sm text-gray-600">({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Statistics are calculated based on completed and upcoming reminders in the selected time period.</p>
        </div>
      </div>
    </div>
  );
}