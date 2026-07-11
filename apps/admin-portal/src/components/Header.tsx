import { useAuthStore } from '../stores/auth';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 border-b border-pink-200 bg-white/50 backdrop-blur-sm px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-pink-50 border border-pink-200 rounded-lg text-sm text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button className="relative text-pink-600 hover:text-pink-700 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-pink-600 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-pink-200">
          <div className="text-right">
            <p className="text-sm font-medium text-pink-900">{user?.name}</p>
            <p className="text-xs text-pink-600">{user?.role}</p>
          </div>
          <button className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md">
            {user?.name.charAt(0)}
          </button>
        </div>
      </div>
    </header>
  );
}
