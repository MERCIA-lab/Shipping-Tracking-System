import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'archived';
  image?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    price: 99.99,
    cost: 45.0,
    stock: 25,
    category: 'Electronics',
    status: 'active',
    description: 'Premium wireless headphones with noise cancellation',
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'USB-C Cable',
    sku: 'USB-001',
    price: 12.99,
    cost: 3.5,
    stock: 1,
    category: 'Accessories',
    status: 'active',
    description: '2m USB-C charging and data cable',
    image: 'https://via.placeholder.com/300x200?text=USB+Cable',
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z',
  },
  {
    id: '3',
    name: 'Phone Case',
    sku: 'PC-001',
    price: 19.99,
    cost: 7.0,
    stock: 5,
    category: 'Accessories',
    status: 'active',
    description: 'Protective phone case for iPhone 14',
    image: 'https://via.placeholder.com/300x200?text=Phone+Case',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    sku: 'WM-001',
    price: 34.99,
    cost: 15.0,
    stock: 0,
    category: 'Electronics',
    status: 'active',
    description: 'Ergonomic wireless mouse with USB receiver',
    image: 'https://via.placeholder.com/300x200?text=Wireless+Mouse',
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
  },
  {
    id: '5',
    name: 'Laptop Stand',
    sku: 'LS-001',
    price: 44.99,
    cost: 20.0,
    stock: 42,
    category: 'Accessories',
    status: 'active',
    description: 'Adjustable aluminum laptop stand',
    image: 'https://via.placeholder.com/300x200?text=Laptop+Stand',
    createdAt: '2024-01-05T11:45:00Z',
    updatedAt: '2024-01-05T11:45:00Z',
  },
];

export const useProductsStore = create<ProductsState>((set) => ({
  products: mockProducts,
  loading: false,
  error: null,

  addProduct: (product) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ products: [newProduct, ...state.products] }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p,
      ),
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  getProduct: (id) => {
    return mockProducts.find((p) => p.id === id);
  },
}));
