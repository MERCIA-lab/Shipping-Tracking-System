import { create } from 'zustand';

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  reorderLevel: number;
  maxCapacity: number;
  lastRestocked: string;
}

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => InventoryItem | undefined;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Wireless Headphones',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    quantity: 25,
    reorderLevel: 10,
    maxCapacity: 100,
    lastRestocked: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    productId: '2',
    productName: 'USB-C Cable',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    quantity: 1,
    reorderLevel: 20,
    maxCapacity: 500,
    lastRestocked: '2023-12-28T14:30:00Z',
  },
  {
    id: '3',
    productId: '3',
    productName: 'Phone Case',
    warehouseId: 'wh-2',
    warehouseName: 'Secondary Warehouse',
    quantity: 5,
    reorderLevel: 15,
    maxCapacity: 200,
    lastRestocked: '2024-01-05T09:00:00Z',
  },
  {
    id: '4',
    productId: '4',
    productName: 'Wireless Mouse',
    warehouseId: 'wh-1',
    warehouseName: 'Main Warehouse',
    quantity: 0,
    reorderLevel: 5,
    maxCapacity: 50,
    lastRestocked: '2023-12-15T08:00:00Z',
  },
  {
    id: '5',
    productId: '5',
    productName: 'Laptop Stand',
    warehouseId: 'wh-2',
    warehouseName: 'Secondary Warehouse',
    quantity: 42,
    reorderLevel: 10,
    maxCapacity: 150,
    lastRestocked: '2024-01-08T11:00:00Z',
  },
];

export const useInventoryStore = create<InventoryState>((set) => ({
  items: mockInventory,

  addItem: (item) => {
    const newItem: InventoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({ items: [newItem, ...state.items] }));
  },

  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  getItem: (id) => {
    return mockInventory.find((item) => item.id === id);
  },
}));
