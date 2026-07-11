import { useState, useMemo } from 'react';
import { usePaymentsStore } from '../stores/payments';
import { Search, CreditCard } from 'lucide-react';

export default function Payments() {
  const { payments, updatePaymentStatus } = usePaymentsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || payment.status === statusFilter;
      const matchesMethod = !methodFilter || payment.method === methodFilter;
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const stats = {
    total: payments.length,
    completed: payments.filter((p) => p.status === 'completed').length,
    pending: payments.filter((p) => p.status === 'pending').length,
    failed: payments.filter((p) => p.status === 'failed').length,
    totalAmount: payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400';
      case 'failed':
        return 'bg-red-500/10 text-red-400';
      case 'refunded':
        return 'bg-slate-700/50 text-slate-300';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'stripe':
        return 'bg-blue-500/10 text-blue-400';
      case 'paypal':
        return 'bg-cyan-500/10 text-cyan-400';
      case 'bank_transfer':
        return 'bg-purple-500/10 text-purple-400';
      case 'apple_pay':
        return 'bg-gray-500/10 text-gray-400';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Payments</h1>
        <p className="text-slate-400 mt-1">Track and manage all payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard label="Total Payments" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} highlight="emerald" />
        <StatCard label="Pending" value={stats.pending} highlight="amber" />
        <StatCard label="Failed" value={stats.failed} highlight="red" />
        <StatCard label="Total Revenue" value={`$${stats.totalAmount.toFixed(0)}`} highlight="blue" />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by order number or customer..."
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
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Methods</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="apple_pay">Apple Pay</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Method</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{payment.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{payment.customerName}</td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white font-semibold">${payment.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(payment.method)}`}>
                      {payment.method === 'bank_transfer' ? 'Bank Transfer' : payment.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        updatePaymentStatus(
                          payment.id,
                          e.target.value as any,
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusColor(payment.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {new Date(payment.createdAt).toLocaleDateString()}
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
    highlight === 'emerald'
      ? 'text-emerald-400'
      : highlight === 'amber'
      ? 'text-amber-400'
      : highlight === 'red'
      ? 'text-red-400'
      : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
