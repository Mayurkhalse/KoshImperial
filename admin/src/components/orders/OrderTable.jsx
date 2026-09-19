import React from 'react';
import { StatusUpdater } from './StatusUpdater.jsx';
import { Eye } from 'lucide-react';

export const OrderTable = ({ orders = [], onSelectOrder, onUpdateStatus }) => {
  return (
    <div className="bg-white border border-driftwood-300 overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-driftwood-300 text-evergreen-700 text-xs uppercase tracking-wider font-semibold border-b border-driftwood-300">
          <tr>
            <th className="p-4">Order #</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Date</th>
            <th className="p-4">Items</th>
            <th className="p-4">Total</th>
            <th className="p-4">Fulfillment</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-driftwood-300 text-charcoal">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-milkglass-300 transition-colors">
              <td className="p-4 font-mono text-xs font-semibold text-evergreen-700">
                {order.orderNumber}
              </td>
              <td className="p-4">
                <p className="font-serif text-sm font-medium text-evergreen-700">
                  {order.user?.name || order.shippingAddress?.fullName || 'Guest'}
                </p>
                <p className="text-[11px] text-muted-brown">{order.user?.email}</p>
              </td>
              <td className="p-4 text-xs text-muted-brown">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="p-4 text-xs">{order.items?.length || 0}</td>
              <td className="p-4 font-sans font-semibold text-mahogany-base text-sm">
                ₹{order.total.toLocaleString('en-IN')}
              </td>
              <td className="p-4">
                <StatusUpdater
                  currentStatus={order.status}
                  onUpdateStatus={(st) => onUpdateStatus(order._id, st)}
                />
              </td>
              <td className="p-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelectOrder(order)}
                  className="p-1.5 text-evergreen-700 hover:text-mahogany-base transition-colors inline-flex items-center gap-1 text-xs uppercase font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
