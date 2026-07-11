import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],

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
    let current: Order[] = [];
    set((state) => {
      current = state.orders;
      return state;
    });
    return current.find((o) => o.id === id);
  },
}));

export const fetchOrders = async (storeId = 'demo-store') => {
  const response = await fetch(`${API_BASE_URL}/orders?storeId=${storeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  return data.data ?? [];
};
