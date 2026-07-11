import React from 'react';

type SidebarItem = {
  label: string;
  href?: string;
};

type SidebarLayoutProps = {
  title: string;
  items: SidebarItem[];
  children: React.ReactNode;
};

export function SidebarLayout({ title, items, children }: SidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">Commerce operations</p>
          </div>
          <nav className="space-y-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href ?? '#'}
                className="block rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
