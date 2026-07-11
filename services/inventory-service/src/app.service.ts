import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly inventory = [
    { sku: 'WH-001', name: 'Wireless Headphones', stock: 24, warehouse: 'A1' },
    { sku: 'UC-001', name: 'USB Cable', stock: 8, warehouse: 'B2' },
    { sku: 'PC-001', name: 'Phone Case', stock: 0, warehouse: 'C1' },
  ];

  listInventory(storeId?: string) {
    return {
      data: this.inventory.map((item) => ({ ...item, storeId: storeId || 'demo-store' })),
      total: this.inventory.length,
    };
  }
}
