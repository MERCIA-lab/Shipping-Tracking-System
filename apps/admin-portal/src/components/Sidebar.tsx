import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Box,
  ShoppingCart,
  Users,
  CreditCard,
  Truck,
  BarChart3,
  Zap,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../stores/auth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: Box, label: 'Inventory', href: '/inventory' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: CreditCard, label: 'Payments', href: '/payments' },
  { icon: Truck, label: 'Shipping', href: '/shipping' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Zap, label: 'Integrations', href: '/integrations' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-900/80 backdrop-blur-sm min-h-screen p-6 fixed left-0 top-0 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">iMeek</h1>
        <p className="text-xs text-slate-400 mt-1">Commerce Platform</p>
      </div>

      <nav className="space-y-1 mb-12">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
