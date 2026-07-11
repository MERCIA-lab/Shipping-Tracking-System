import React from 'react';

type MetricItem = {
  label: string;
  value: string;
};

type MetricSectionProps = {
  title: string;
  items: MetricItem[];
};

export function MetricSection({ title, items }: MetricSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-slate-800/70 p-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-1 text-xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
