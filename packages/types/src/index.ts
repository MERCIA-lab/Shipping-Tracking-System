export type Store = {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'draft' | 'archived';
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  amazonStatus?: string;
  ebayStatus?: string;
};

export type Order = {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
};

export type InventoryItem = {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  lastRestocked: string;
};

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Payment = {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'stripe' | 'paypal' | 'apple_pay' | 'google_pay';
  createdAt: string;
};

export type Shipment = {
  id: string;
  orderId: string;
  carrier: 'fedex' | 'ups' | 'dhl' | 'usps';
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  estimatedDelivery: string;
};
