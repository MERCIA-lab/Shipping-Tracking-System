import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Payment {
  id: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'stripe' | 'paypal' | 'bank_transfer' | 'apple_pay';
  customerName: string;
  createdAt: string;
  processedAt?: string;
}

interface PaymentsState {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePaymentStatus: (id: string, status: Payment['status']) => void;
  getPayment: (id: string) => Payment | undefined;
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
  payments: [],

  addPayment: (payment) => {
    const newPayment: Payment = {
      ...payment,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({ payments: [newPayment, ...state.payments] }));
  },

  updatePaymentStatus: (id, status) => {
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment.id === id
          ? {
            ...payment,
            status,
            processedAt: status === 'completed' ? new Date().toISOString() : payment.processedAt,
          }
          : payment,
      ),
    }));
  },

  getPayment: (id) => {
    let current: Payment[] = [];
    set((state) => {
      current = state.payments;
      return state;
    });
    return current.find((p) => p.id === id);
  },
}));

export const fetchPayments = async (storeId = 'demo-store') => {
  const response = await fetch(`${API_BASE_URL}/payments?storeId=${storeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }

  const data = await response.json();
  return data.data ?? [];
};
