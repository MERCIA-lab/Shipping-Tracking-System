import { Check, X, AlertCircle, RefreshCw, Settings, Plus } from 'lucide-react';

const integrations = [
  {
    name: 'Stripe',
    description: 'Payment processing and transactions',
    icon: '💳',
    status: 'connected',
    lastSync: '2024-01-15 10:30 AM',
  },
  {
    name: 'Amazon',
    description: 'Multi-channel selling platform',
    icon: '🛍️',
    status: 'connected',
    lastSync: '2024-01-15 09:15 AM',
  },
  {
    name: 'eBay',
    description: 'Alternative marketplace integration',
    icon: '🏷️',
    status: 'disconnected',
    lastSync: 'Never',
  },
  {
    name: 'Shopify',
    description: 'Unified commerce platform',
    icon: '🏪',
    status: 'error',
    lastSync: '2024-01-14 02:45 PM',
  },
  {
    name: 'Google Shopping',
    description: 'Product listing & advertising',
    icon: '🔍',
    status: 'connected',
    lastSync: '2024-01-15 11:00 AM',
  },
  {
    name: 'FedEx',
    description: 'Shipping and logistics',
    icon: '📦',
    status: 'connected',
    lastSync: '2024-01-15 10:45 AM',
  },
];

export default function Integrations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Integrations</h1>
          <p className="text-slate-400 mt-1">Connect and manage third-party applications</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          <Plus size={20} />
          Add Integration
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg font-medium transition hover:bg-blue-600/30">
          All Integrations
        </button>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg font-medium transition">
          Connected Only
        </button>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg font-medium transition">
          Issues
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:bg-slate-800/50 transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{integration.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                  <p className="text-sm text-slate-400">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.status === 'connected' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                    <Check size={14} />
                    Connected
                  </div>
                )}
                {integration.status === 'error' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-medium">
                    <AlertCircle size={14} />
                    Error
                  </div>
                )}
                {integration.status === 'disconnected' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium">
                    <X size={14} />
                    Disconnected
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="mb-4 pb-4 border-b border-slate-800">
              <p className="text-sm text-slate-400">
                Last sync: <span className="text-slate-300">{integration.lastSync}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
                <RefreshCw size={16} />
                Sync
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
                <Settings size={16} />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
