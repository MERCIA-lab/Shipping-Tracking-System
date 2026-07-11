import { create } from 'zustand';

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

const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: '1',
    orderNumber: '#ORD-001234',
    amount: 114.99,
    status: 'completed',
    method: 'stripe',
    customerName: 'John Doe',
    createdAt: '2024-01-10T10:00:00Z',
    processedAt: '2024-01-10T10:05:00Z',
  },
  {
    id: '2',
    orderId: '2',
    orderNumber: '#ORD-001233',
    amount: 50.57,
    status: 'completed',
    method: 'paypal',
    customerName: 'Jane Smith',
    createdAt: '2024-01-09T14:20:00Z',
    processedAt: '2024-01-09T14:25:00Z',
  },
  {
    id: '3',
    orderId: '3',
    orderNumber: '#ORD-001232',
    amount: 54.49,
    status: 'pending',
    method: 'bank_transfer',
    customerName: 'Bob Wilson',
    createdAt: '2024-01-08T11:30:00Z',
  },
  {
    id: '4',
    orderId: '4',
    orderNumber: '#ORD-001231',
    amount: 153.48,
    status: 'completed',
    method: 'stripe',
    customerName: 'Alice Johnson',
    createdAt: '2024-01-07T09:15:00Z',
    processedAt: '2024-01-07T09:20:00Z',
  },
  {
    id: '5',
    orderId: '5',
    orderNumber: '#ORD-001230',
    amount: 89.99,
    status: 'failed',
    method: 'paypal',
    customerName: 'Mike Brown',
    createdAt: '2024-01-06T15:45:00Z',
  },
];

export const usePaymentsStore = create<PaymentsState>((set) => ({
  payments: mockPayments,

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
    return mockPayments.find((p) => p.id === id);
  },
}));
