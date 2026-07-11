import { create } from 'zustand';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer';
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getOrder: (id: string) => Order | undefined;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-001234',
    customerId: 'cust-1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 99.99 },
    ],
    subtotal: 99.99,
    tax: 10.0,
    shipping: 5.0,
    total: 114.99,
    status: 'delivered',
    paymentMethod: 'stripe',
    shippingAddress: '123 Main St, New York, NY 10001',
    trackingNumber: 'FDX123456789',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z',
  },
  {
    id: '2',
    orderNumber: '#ORD-001233',
    customerId: 'cust-2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { productId: '2', productName: 'USB-C Cable', quantity: 2, price: 12.99 },
      { productId: '3', productName: 'Phone Case', quantity: 1, price: 19.99 },
    ],
    subtotal: 45.97,
    tax: 4.6,
    shipping: 0,
    total: 50.57,
    status: 'shipped',
    paymentMethod: 'paypal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    trackingNumber: 'UPS987654321',
    createdAt: '2024-01-09T14:20:00Z',
    updatedAt: '2024-01-11T09:00:00Z',
  },
  {
    id: '3',
    orderNumber: '#ORD-001232',
    customerId: 'cust-3',
    customerName: 'Bob Wilson',
    customerEmail: 'bob@example.com',
    items: [{ productId: '5', productName: 'Laptop Stand', quantity: 1, price: 44.99 }],
    subtotal: 44.99,
    tax: 4.5,
    shipping: 5.0,
    total: 54.49,
    status: 'processing',
    paymentMethod: 'stripe',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-08T11:30:00Z',
  },
  {
    id: '4',
    orderNumber: '#ORD-001231',
    customerId: 'cust-4',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    items: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { productId: '4', productName: 'Wireless Mouse', quantity: 1, price: 34.99 },
    ],
    subtotal: 134.98,
    tax: 13.5,
    shipping: 5.0,
    total: 153.48,
    status: 'paid',
    paymentMethod: 'bank_transfer',
    shippingAddress: '321 Elm St, Houston, TX 77001',
    createdAt: '2024-01-07T09:15:00Z',
    updatedAt: '2024-01-08T08:00:00Z',
  },
];

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: mockOrders,

  addOrder: (order) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order,
      ),
    }));
  },

  getOrder: (id) => {
    return mockOrders.find((o) => o.id === id);
  },
}));
