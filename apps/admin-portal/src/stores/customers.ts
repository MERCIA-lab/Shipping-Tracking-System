import { create } from 'zustand';

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

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    city: 'New York',
    country: 'USA',
    totalOrders: 5,
    totalSpent: 542.50,
    lastOrder: '2024-01-10T10:00:00Z',
    joinedAt: '2023-08-15T10:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    city: 'Los Angeles',
    country: 'USA',
    totalOrders: 12,
    totalSpent: 1245.75,
    lastOrder: '2024-01-09T14:20:00Z',
    joinedAt: '2023-06-20T08:30:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1 (555) 345-6789',
    city: 'Chicago',
    country: 'USA',
    totalOrders: 3,
    totalSpent: 189.99,
    lastOrder: '2024-01-08T11:30:00Z',
    joinedAt: '2023-11-10T14:00:00Z',
    status: 'active',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 (555) 456-7890',
    city: 'Houston',
    country: 'USA',
    totalOrders: 8,
    totalSpent: 956.25,
    lastOrder: '2024-01-07T09:15:00Z',
    joinedAt: '2023-07-25T11:45:00Z',
    status: 'active',
  },
  {
    id: '5',
    name: 'Mike Brown',
    email: 'mike@example.com',
    phone: '+1 (555) 567-8901',
    city: 'Phoenix',
    country: 'USA',
    totalOrders: 2,
    totalSpent: 123.45,
    lastOrder: '2023-12-15T16:00:00Z',
    joinedAt: '2023-12-01T09:00:00Z',
    status: 'inactive',
  },
];

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: mockCustomers,

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
    return mockCustomers.find((c) => c.id === id);
  },
}));
