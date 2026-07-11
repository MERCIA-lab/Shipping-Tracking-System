import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { date: 'Jan 1', sales: 2400, revenue: 2400 },
  { date: 'Jan 2', sales: 1398, revenue: 2210 },
  { date: 'Jan 3', sales: 9800, revenue: 2290 },
  { date: 'Jan 4', sales: 3908, revenue: 2000 },
  { date: 'Jan 5', sales: 4800, revenue: 2181 },
  { date: 'Jan 6', sales: 3800, revenue: 2500 },
  { date: 'Jan 7', sales: 4300, revenue: 2100 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Accessories', value: 25, color: '#8b5cf6' },
  { name: 'Fashion', value: 20, color: '#ec4899' },
  { name: 'Home', value: 12, color: '#f59e0b' },
  { name: 'Sports', value: 8, color: '#10b981' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 432, revenue: 43200 },
  { name: 'Phone Case', sales: 328, revenue: 6552 },
  { name: 'Laptop Stand', sales: 287, revenue: 12900 },
  { name: 'USB-C Cable', sales: 156, revenue: 2026 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Analytics</h1>
        <p className="text-slate-400 mt-1">View business metrics and performance insights</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4">
        <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Total Revenue" value="$45,250.00" change="+12.5%" />
        <MetricCard label="Total Orders" value="1,248" change="+8.2%" />
        <MetricCard label="Avg Order Value" value="$36.28" change="+4.1%" />
        <MetricCard label="Conversion Rate" value="3.24%" change="+0.5%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Top Products</h2>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition"
            >
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{product.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{product.sales} sales</span>
                  <span>Revenue: ${product.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-emerald-400">${(product.revenue / 1000).toFixed(1)}K</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change }: any) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <span className="text-emerald-400 text-sm font-medium">{change}</span>
      </div>
    </div>
  );
}
