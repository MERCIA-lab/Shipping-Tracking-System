import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-pink-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Header />
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
