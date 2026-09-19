import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Badge } from '../common/Badge.jsx';
import { Eye } from 'lucide-react';

export const OrderHistoryTable = ({ orders = [], onSelectOrder }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center bg-milkglass-100 border border-driftwood-300">
        <p className="font-serif text-xl text-evergreen-700">No Orders Yet</p>
        <p className="text-xs text-muted-brown mt-2">When you place an order, its heirloom journey will appear here.</p>
      </div>
    );
  }

  const statusVariant = {
    pending: 'warning',
    confirmed: 'success',
    processing: 'warning',
    shipped: 'tag',
    delivered: 'success',
    cancelled: 'error',
    refunded: 'error',
  };

  return (
    <div className="bg-milkglass-100 border border-driftwood-300 overflow-x-auto shadow-luxury">
      <table className="w-full text-left text-sm">
        <thead className="bg-milkglass-300 border-b border-driftwood-300 text-xs uppercase tracking-wider text-evergreen-700 font-semibold">
          <tr>
            <th className="p-4">Order Number</th>
            <th className="p-4">Date</th>
            <th className="p-4">Items</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-driftwood-300 text-charcoal">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-milkglass-300/40 transition-colors">
              <td className="p-4 font-mono text-xs font-semibold text-evergreen-700">
                {order.orderNumber}
              </td>
              <td className="p-4 text-xs text-muted-brown">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="p-4 text-xs">
                {order.items?.length || 0} {order.items?.length === 1 ? 'piece' : 'pieces'}
              </td>
              <td className="p-4 font-sans font-semibold text-mahogany-base text-sm">
                {formatCurrency(order.total)}
              </td>
              <td className="p-4">
                <Badge variant={statusVariant[order.status] || 'tag'}>
                  {order.status}
                </Badge>
              </td>
              <td className="p-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelectOrder && onSelectOrder(order)}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-mahogany-base hover:text-mahogany-700 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
