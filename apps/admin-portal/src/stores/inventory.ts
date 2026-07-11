import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],

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
    let current: InventoryItem[] = [];
    set((state) => {
      current = state.items;
      return state;
    });
    return current.find((item) => item.id === id);
  },
}));

export const fetchInventory = async (storeId = 'demo-store') => {
  const response = await fetch(`${API_BASE_URL}/inventory?storeId=${storeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }

  const data = await response.json();
  return data.data ?? [];
};
