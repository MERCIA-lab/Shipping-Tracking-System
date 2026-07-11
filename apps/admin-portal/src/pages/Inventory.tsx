import { useState, useMemo } from 'react';
import { useInventoryStore } from '../stores/inventory';
import { AlertTriangle, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Inventory() {
  const { items, deleteItem } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesWarehouse =
        !warehouseFilter || item.warehouseName === warehouseFilter;
      return matchesSearch && matchesWarehouse;
    });
  }, [items, searchTerm, warehouseFilter]);

  const warehouses = Array.from(new Set(items.map((i) => i.warehouseName)));
  const lowStockItems = items.filter((i) => i.quantity <= i.reorderLevel);
  const outOfStockItems = items.filter((i) => i.quantity === 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Inventory</h1>
          <p className="text-slate-400 mt-1">Manage stock levels across warehouses</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          <Plus size={20} />
          Adjust Stock
        </button>
      </div>

      {/* Alerts */}
      {outOfStockItems.length > 0 && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={20} />
          <div>
            <p className="text-red-500 font-medium">{outOfStockItems.length} items out of stock</p>
            <p className="text-sm text-red-400">Urgent: Immediate restocking required</p>
          </div>
        </div>
      )}

      {lowStockItems.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" size={20} />
          <div>
            <p className="text-amber-500 font-medium">
              {lowStockItems.length} items below reorder level
            </p>
            <p className="text-sm text-amber-400">Consider placing a restocking order</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatBox label="Total Items" value={totalItems.toLocaleString()} />
        <StatBox label="Warehouse Locations" value={warehouses.length} />
        <StatBox label="Low Stock Items" value={lowStockItems.length} highlight="amber" />
        <StatBox label="Out of Stock" value={outOfStockItems.length} highlight="red" />
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Warehouses</option>
          {warehouses.map((wh) => (
            <option key={wh} value={wh}>
              {wh}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">
                  Warehouse
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">
                  Quantity
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">
                  Capacity
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredItems.map((item) => {
                const utilizationPercent = (item.quantity / item.maxCapacity) * 100;
                let statusColor = 'text-emerald-400';
                let statusLabel = 'Good';

                if (item.quantity === 0) {
                  statusColor = 'text-red-400';
                  statusLabel = 'Out of Stock';
                } else if (item.quantity <= item.reorderLevel) {
                  statusColor = 'text-amber-400';
                  statusLabel = 'Low Stock';
                }

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{item.productName}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{item.warehouseName}</td>
                    <td className="px-6 py-4 text-center text-white font-medium">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-300">{item.reorderLevel}</td>
                    <td className="px-6 py-4 text-center text-slate-300">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-slate-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              utilizationPercent > 80
                                ? 'bg-emerald-500'
                                : utilizationPercent > 50
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 w-8">
                          {utilizationPercent.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight }: any) {
  const highlightColor =
    highlight === 'amber' ? 'text-amber-400' : highlight === 'red' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
