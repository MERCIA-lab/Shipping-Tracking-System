import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
      {subtitle ? <p className="mt-2 text-sm text-emerald-400">{subtitle}</p> : null}
    </div>
  );
}
