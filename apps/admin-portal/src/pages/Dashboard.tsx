import { TrendingUp, TrendingDown, ShoppingCart, Users, Eye } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 25 },
  { name: 'Home', value: 20 },
  { name: 'Sports', value: 20 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Today's Revenue"
          value="$12,456"
          change="+12.5%"
          isPositive={true}
          icon={<TrendingUp className="text-green-500" />}
        />
        <KPICard
          title="Today's Orders"
          value="234"
          change="+8.2%"
          isPositive={true}
          icon={<ShoppingCart className="text-blue-500" />}
        />
        <KPICard
          title="Visitors"
          value="8,432"
          change="-2.1%"
          isPositive={false}
          icon={<Eye className="text-purple-500" />}
        />
        <KPICard
          title="New Customers"
          value="42"
          change="+5.3%"
          isPositive={true}
          icon={<Users className="text-emerald-500" />}
        />
        <KPICard
          title="Conversion Rate"
          value="3.24%"
          change="+0.8%"
          isPositive={true}
          icon={<TrendingUp className="text-orange-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Category Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[
              { id: '#1234', customer: 'John Doe', amount: '$456.00', status: 'Delivered' },
              { id: '#1233', customer: 'Jane Smith', amount: '$234.50', status: 'Shipped' },
              { id: '#1232', customer: 'Bob Wilson', amount: '$789.00', status: 'Processing' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{order.id}</p>
                  <p className="text-xs text-slate-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            {[
              { product: 'Wireless Headphones', stock: 3, sku: 'WH-001' },
              { product: 'USB-C Cable', stock: 1, sku: 'USB-001' },
              { product: 'Phone Case', stock: 5, sku: 'PC-001' },
            ].map((item) => (
              <div key={item.sku} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-2 border-amber-500">
                <div>
                  <p className="text-sm font-medium text-white">{item.product}</p>
                  <p className="text-xs text-slate-400">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-amber-500">{item.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, isPositive, icon }: any) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm hover:bg-slate-800/50 transition">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-400">{title}</p>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">{value}</h3>
      <p className={`text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{change} from yesterday</p>
    </div>
  );
}

function renderLabel({ name, value }: any) {
  return `${name} ${value}%`;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered':
      return 'bg-emerald-500/10 text-emerald-400';
    case 'Shipped':
      return 'bg-blue-500/10 text-blue-400';
    case 'Processing':
      return 'bg-amber-500/10 text-amber-400';
    default:
      return 'bg-slate-700/50 text-slate-300';
  }
}
