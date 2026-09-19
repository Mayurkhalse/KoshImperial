import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const SalesChart = ({ data = [] }) => {
  const chartData =
    data.length > 0
      ? data
      : [
          { month: 'Jan', revenue: 42000 },
          { month: 'Feb', revenue: 68000 },
          { month: 'Mar', revenue: 95000 },
          { month: 'Apr', revenue: 124000 },
          { month: 'May', revenue: 148000 },
          { month: 'Jun', revenue: 190000 },
        ];

  return (
    <div className="bg-milkglass-100 border border-driftwood-300 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-driftwood-300">
        <div>
          <h3 className="font-serif text-xl text-evergreen-700 font-normal">Revenue Trajectory</h3>
          <p className="text-xs text-muted-brown">Monthly conscious sales growth (INR)</p>
        </div>
      </div>

      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#253929" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#253929" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC8" />
            <XAxis dataKey="month" stroke="#6B6355" fontSize={12} tickLine={false} />
            <YAxis stroke="#6B6355" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F7F6E4',
                borderColor: '#D4C4A8',
                borderRadius: '0px',
                fontSize: '12px',
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#253929"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
