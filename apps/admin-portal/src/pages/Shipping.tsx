import { useState, useMemo } from 'react';
import { Search, Truck, Package, MapPin } from 'lucide-react';

interface Shipment {
  id: string;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: 'fedex' | 'ups' | 'dhl' | 'usps';
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: number;
  createdAt: string;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    orderNumber: '#ORD-001234',
    customerName: 'John Doe',
    trackingNumber: 'FDX123456789',
    carrier: 'fedex',
    status: 'delivered',
    origin: 'New York Distribution Center',
    destination: '123 Main St, New York, NY 10001',
    estimatedDelivery: '2024-01-12T00:00:00Z',
    weight: 0.5,
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    orderNumber: '#ORD-001233',
    customerName: 'Jane Smith',
    trackingNumber: 'UPS987654321',
    carrier: 'ups',
    status: 'in_transit',
    origin: 'Los Angeles Distribution Center',
    destination: '456 Oak Ave, Los Angeles, CA 90001',
    estimatedDelivery: '2024-01-13T00:00:00Z',
    weight: 0.3,
    createdAt: '2024-01-09T14:20:00Z',
  },
  {
    id: '3',
    orderNumber: '#ORD-001232',
    customerName: 'Bob Wilson',
    trackingNumber: 'DHL555666777',
    carrier: 'dhl',
    status: 'picked_up',
    origin: 'Chicago Distribution Center',
    destination: '789 Pine Rd, Chicago, IL 60601',
    estimatedDelivery: '2024-01-14T00:00:00Z',
    weight: 0.75,
    createdAt: '2024-01-08T11:30:00Z',
  },
  {
    id: '4',
    orderNumber: '#ORD-001231',
    customerName: 'Alice Johnson',
    trackingNumber: 'USPS222333444',
    carrier: 'usps',
    status: 'in_transit',
    origin: 'Houston Distribution Center',
    destination: '321 Elm St, Houston, TX 77001',
    estimatedDelivery: '2024-01-15T00:00:00Z',
    weight: 1.2,
    createdAt: '2024-01-07T09:15:00Z',
  },
];

export default function Shipping() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');

  const filteredShipments = useMemo(() => {
    return mockShipments.filter((shipment) => {
      const matchesSearch =
        shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || shipment.status === statusFilter;
      const matchesCarrier = !carrierFilter || shipment.carrier === carrierFilter;
      return matchesSearch && matchesStatus && matchesCarrier;
    });
  }, [searchTerm, statusFilter, carrierFilter]);

  const stats = {
    total: mockShipments.length,
    pending: mockShipments.filter((s) => s.status === 'pending').length,
    inTransit: mockShipments.filter((s) => s.status === 'in_transit').length,
    delivered: mockShipments.filter((s) => s.status === 'delivered').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'in_transit':
        return 'bg-blue-500/10 text-blue-400';
      case 'picked_up':
        return 'bg-purple-500/10 text-purple-400';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  const getCarrierColor = (carrier: string) => {
    switch (carrier) {
      case 'fedex':
        return 'bg-purple-500/10 text-purple-400';
      case 'ups':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'dhl':
        return 'bg-red-500/10 text-red-400';
      case 'usps':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Shipping</h1>
        <p className="text-slate-400 mt-1">Track shipments and manage deliveries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Shipments" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} highlight="amber" />
        <StatCard label="In Transit" value={stats.inTransit} highlight="blue" />
        <StatCard label="Delivered" value={stats.delivered} highlight="emerald" />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by order, customer, or tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          value={carrierFilter}
          onChange={(e) => setCarrierFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Carriers</option>
          <option value="fedex">FedEx</option>
          <option value="ups">UPS</option>
          <option value="dhl">DHL</option>
          <option value="usps">USPS</option>
        </select>
      </div>

      {/* Shipments Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Tracking</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Carrier</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Est. Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{shipment.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{shipment.customerName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-slate-500" />
                      <p className="text-white font-mono text-sm">{shipment.trackingNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCarrierColor(shipment.carrier)}`}>
                      {shipment.carrier.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status === 'picked_up' ? 'Picked Up' : shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: any) {
  const highlightColor =
    highlight === 'amber'
      ? 'text-amber-400'
      : highlight === 'blue'
      ? 'text-blue-400'
      : highlight === 'emerald'
      ? 'text-emerald-400'
      : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
