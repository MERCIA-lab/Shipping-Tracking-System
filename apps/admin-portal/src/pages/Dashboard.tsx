import { useEffect, useMemo, useState } from 'react';
import { TrendingUp, ShoppingCart, Users, Eye, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const COLORS = ['#ec4899', '#f472b6', '#db2777', '#be185d'];

interface DashboardSummary {
  revenue: number;
  orders: number;
  customers: number;
  lowStock: number;
  conversionRate: number;
  products: number;
}

async function fetchJson(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error('Failed to load dashboard data');
  }

  return response.json();
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    revenue: 0,
    orders: 0,
    customers: 0,
    lowStock: 0,
    conversionRate: 0,
    products: 0,
  });
  const [salesData, setSalesData] = useState<Array<{ name: string; sales: number; revenue: number }>>([]);
  const [categoryData, setCategoryData] = useState<Array<{ name: string; value: number }>>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, ordersResponse, inventoryResponse, customersResponse] = await Promise.all([
          fetchJson('/products?storeId=demo-store&page=1&limit=50'),
          fetchJson('/orders?storeId=demo-store'),
          fetchJson('/inventory?storeId=demo-store'),
          fetchJson('/users?storeId=demo-store'),
        ]);

        const products = Array.isArray(productsResponse?.data) ? productsResponse.data : [];
        const orders = Array.isArray(ordersResponse?.data) ? ordersResponse.data : [];
        const inventory = Array.isArray(inventoryResponse?.data) ? inventoryResponse.data : [];
        const customers = Array.isArray(customersResponse?.data) ? customersResponse.data : [];

        const revenue = orders.reduce((sum: number, order: any) => sum + Number(order.total || 0), 0);
        const lowStock = inventory.filter((item: any) => Number(item.quantity || 0) <= Number(item.reorderLevel || 0));
        const recent = [...orders]
          .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
          .slice(0, 3);

        const categoryMap: Record<string, number> = {};
        products.forEach((product: any) => {
          const name = product.category || 'Uncategorized';
          categoryMap[name] = (categoryMap[name] || 0) + 1;
        });

        const chartData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
          name: day,
          sales: products.slice(index, index + 1).reduce((sum: number, product: any) => sum + Number(product.stock || 0), 0),
          revenue: orders.slice(index, index + 1).reduce((sum: number, order: any) => sum + Number(order.total || 0), 0),
        }));

        if (!isMounted) return;

        setSummary({
          revenue,
          orders: orders.length,
          customers: customers.length,
          lowStock: lowStock.length,
          conversionRate: customers.length ? Number(((orders.length / customers.length) * 100).toFixed(2)) : 0,
          products: products.length,
        });
        setSalesData(chartData);
        setCategoryData(Object.entries(categoryMap).map(([name, value]) => ({ name, value })));
        setRecentOrders(recent);
        setLowStockItems(lowStock.slice(0, 3));
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const kpiCards = useMemo(
    () => [
      {
        title: "Today's Revenue",
        value: formatCurrency(summary.revenue),
        change: summary.orders > 0 ? `${summary.orders} live orders` : 'Awaiting orders',
        isPositive: summary.revenue > 0,
        icon: <TrendingUp className="text-green-500" />,
      },
      {
        title: "Today's Orders",
        value: summary.orders.toString(),
        change: summary.products > 0 ? `${summary.products} products tracked` : 'No products yet',
        isPositive: summary.orders > 0,
        icon: <ShoppingCart className="text-blue-500" />,
      },
      {
        title: 'Low Stock Items',
        value: summary.lowStock.toString(),
        change: summary.lowStock > 0 ? 'Needs attention' : 'All stock levels healthy',
        isPositive: summary.lowStock === 0,
        icon: <AlertTriangle className="text-amber-500" />,
      },
      {
        title: 'Customers',
        value: summary.customers.toString(),
        change: summary.customers > 0 ? 'Profiles synced' : 'No customers yet',
        isPositive: summary.customers > 0,
        icon: <Users className="text-emerald-500" />,
      },
      {
        title: 'Conversion Rate',
        value: `${summary.conversionRate}%`,
        change: summary.conversionRate > 0 ? 'Based on activity' : 'No conversions yet',
        isPositive: summary.conversionRate > 0,
        icon: <Eye className="text-purple-500" />,
      },
    ],
    [summary],
  );

  return (
    <div className="space-y-8">
      {error ? (
        <div className="rounded-2xl border border-amber-700 bg-amber-950/40 p-4 text-sm text-amber-200">
          {error}. The dashboard is showing fallback values until the backend services are reachable.
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Sales Trend</h2>
          {loading ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">Loading metrics…</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData.length ? salesData : [{ name: 'No data', sales: 0, revenue: 0 }] }>
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
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Category Distribution</h2>
          {loading ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">Loading categories…</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData.length ? categoryData : [{ name: 'No data', value: 1 }]} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                  {(categoryData.length ? categoryData : [{ name: 'No data', value: 1 }]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.length ? (
              recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{order.orderNumber || `#${order.id}`}</p>
                    <p className="text-xs text-slate-400">{order.customerName || 'Customer'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{formatCurrency(Number(order.total || 0))}</p>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status || 'pending')}`}>{order.status || 'Pending'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No recent orders available yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            {lowStockItems.length ? (
              lowStockItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-2 border-amber-500">
                  <div>
                    <p className="text-sm font-medium text-white">{item.productName || item.productId}</p>
                    <p className="text-xs text-slate-400">{item.warehouseName || item.warehouseId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-500">{item.quantity} left</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">All inventory levels look healthy.</p>
            )}
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
      <p className={`text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>
    </div>
  );
}

function renderLabel({ name, value }: any) {
  return `${name} ${value}`;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'delivered':
      return 'bg-emerald-500/10 text-emerald-400';
    case 'shipped':
      return 'bg-blue-500/10 text-blue-400';
    case 'processing':
      return 'bg-amber-500/10 text-amber-400';
    case 'paid':
      return 'bg-sky-500/10 text-sky-400';
    default:
      return 'bg-slate-700/50 text-slate-300';
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
