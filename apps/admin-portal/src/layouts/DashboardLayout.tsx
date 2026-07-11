import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
