import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  joinedAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface CustomersState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: [],

  addCustomer: (customer) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({ customers: [newCustomer, ...state.customers] }));
  },

  updateCustomer: (id, updates) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updates } : customer,
      ),
    }));
  },

  deleteCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    }));
  },

  getCustomer: (id) => {
    let current: Customer[] = [];
    set((state) => {
      current = state.customers;
      return state;
    });
    return current.find((c) => c.id === id);
  },
}));

export const fetchCustomers = async (storeId = 'demo-store') => {
  const response = await fetch(`${API_BASE_URL}/users?storeId=${storeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }

  const data = await response.json();
  return data.data ?? [];
};
