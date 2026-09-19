import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { RevenueCard } from '../components/analytics/RevenueCard.jsx';
import { SalesChart } from '../components/analytics/SalesChart.jsx';
import { TopProductsList } from '../components/analytics/TopProductsList.jsx';
import { DollarSign, ShoppingBag, Users, AlertTriangle } from 'lucide-react';

export const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/analytics')
      .then((res) => {
        setAnalytics(res.data?.data);
      })
      .catch((err) => {
        console.error('Analytics load error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const overview = analytics?.overview || {
    totalRevenue: 567000,
    totalOrders: 192,
    totalCustomers: 84,
  };

  const lowStock = analytics?.lowStockAlerts || [];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
          ATELIER OVERVIEW
        </span>
        <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
          Executive Dashboard
        </h1>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RevenueCard
          title="Total Gross Revenue"
          value={`₹${overview.totalRevenue.toLocaleString('en-IN')}`}
          change="+18.4% this month"
          icon={DollarSign}
        />
        <RevenueCard
          title="Orders Completed"
          value={overview.totalOrders.toString()}
          change="+12 today"
          icon={ShoppingBag}
        />
        <RevenueCard
          title="Registered Patrons"
          value={overview.totalCustomers.toString()}
          change="+8 this week"
          icon={Users}
        />
      </div>

      {/* Low Stock Banner if any */}
      {lowStock.length > 0 && (
        <div className="p-4 bg-warning/10 border border-warning/30 flex items-center gap-3 text-xs text-charcoal">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <div>
            <span className="font-semibold text-warning uppercase tracking-wider mr-2">
              Low Stock Notice:
            </span>
            <span>
              {lowStock.map((p) => `${p.name} (${p.stock} left)`).join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* Charts & Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <SalesChart data={analytics?.salesByMonth} />
        </div>

        <div className="lg:col-span-4">
          <TopProductsList products={analytics?.topProducts} />
        </div>
      </div>
    </div>
  );
};
