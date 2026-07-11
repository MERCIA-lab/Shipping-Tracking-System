import { useState, useMemo } from 'react';
import { useCustomersStore } from '../stores/customers';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

export default function Customers() {
  const { customers } = useCustomersStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === 'active').length,
    inactive: customers.filter((c) => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'inactive':
        return 'bg-slate-700/50 text-slate-300';
      case 'suspended':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Customers</h1>
        <p className="text-slate-400 mt-1">Manage customer accounts and information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard label="Total Customers" value={stats.total} />
        <StatCard label="Active" value={stats.active} highlight="emerald" />
        <StatCard label="Inactive" value={stats.inactive} highlight="slate" />
        <StatCard label="Total Revenue" value={`$${stats.totalRevenue.toFixed(0)}`} highlight="blue" />
        <StatCard label="Avg Order Value" value={`$${stats.avgOrderValue.toFixed(2)}`} highlight="purple" />
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:bg-slate-800/50 transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                  {customer.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{customer.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getStatusColor(
                      customer.status,
                    )}`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail size={14} className="text-slate-500" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Phone size={14} className="text-slate-500" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={14} className="text-slate-500" />
                <span>
                  {customer.city}, {customer.country}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="text-center">
                <p className="text-sm text-slate-400">Orders</p>
                <p className="text-lg font-semibold text-white">{customer.totalOrders}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Total Spent</p>
                <p className="text-lg font-semibold text-emerald-400">
                  ${customer.totalSpent.toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Joined</p>
                <p className="text-lg font-semibold text-blue-400">
                  {new Date(customer.joinedAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
          <p className="text-slate-400">No customers found</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, highlight }: any) {
  const highlightColor =
    highlight === 'emerald'
      ? 'text-emerald-400'
      : highlight === 'slate'
      ? 'text-slate-400'
      : highlight === 'blue'
      ? 'text-blue-400'
      : highlight === 'purple'
      ? 'text-purple-400'
      : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
