import { useState, useMemo } from 'react';
import { useOrdersStore } from '../stores/orders';
import { Search, Eye, Printer } from 'lucide-react';

export default function Orders() {
  const { orders, updateOrderStatus } = useOrdersStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-400';
      case 'processing':
        return 'bg-purple-500/10 text-purple-400';
      case 'paid':
        return 'bg-cyan-500/10 text-cyan-400';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Orders</h1>
        <p className="text-slate-400 mt-1">Manage and track all orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard label="Total Orders" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} highlight="amber" />
        <StatCard label="Processing" value={stats.processing} highlight="purple" />
        <StatCard label="Shipped" value={stats.shipped} highlight="blue" />
        <StatCard label="Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} highlight="emerald" />
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by order number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Date</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-slate-400">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{order.customerName}</p>
                      <p className="text-xs text-slate-400">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white font-semibold">${order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value as any,
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-emerald-400 transition" title="Print">
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: any) {
  const highlightColor =
    highlight === 'amber'
      ? 'text-amber-400'
      : highlight === 'purple'
      ? 'text-purple-400'
      : highlight === 'blue'
      ? 'text-blue-400'
      : highlight === 'emerald'
      ? 'text-emerald-400'
      : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
