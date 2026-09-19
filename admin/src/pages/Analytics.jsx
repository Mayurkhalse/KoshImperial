import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { SalesChart } from '../components/analytics/SalesChart.jsx';
import { RevenueCard } from '../components/analytics/RevenueCard.jsx';
import { TrendingUp, ShoppingBag, DollarSign, Award } from 'lucide-react';

export const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setData(res.data?.data));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
          INTELLIGENCE & METRICS
        </span>
        <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
          Financial & Ecological Analytics
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueCard
          title="Avg Order Value"
          value="₹3,450"
          change="+8.2%"
          icon={TrendingUp}
        />
        <RevenueCard
          title="Repeat Customer Rate"
          value="34.2%"
          change="+4.5%"
          icon={Award}
        />
        <RevenueCard
          title="Gross Margin"
          value="68.5%"
          change="Sustainable"
          icon={DollarSign}
        />
        <RevenueCard
          title="Cart Completion"
          value="42.1%"
          change="+3.1%"
          icon={ShoppingBag}
        />
      </div>

      <SalesChart data={data?.salesByMonth} />
    </div>
  );
};
