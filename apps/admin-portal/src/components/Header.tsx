import { useAuthStore } from '../stores/auth';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button className="relative text-slate-400 hover:text-slate-300 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
          <button className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
            {user?.name.charAt(0)}
          </button>
        </div>
      </div>
    </header>
  );
}
