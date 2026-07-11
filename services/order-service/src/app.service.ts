import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly orders = [
    {
      id: 'ORD-1001',
      customerName: 'Ava Johnson',
      status: 'processing',
      total: 129.99,
      items: 2,
      createdAt: '2026-07-10T10:15:00.000Z',
    },
    {
      id: 'ORD-1002',
      customerName: 'Noah Chen',
      status: 'shipped',
      total: 84.5,
      items: 1,
      createdAt: '2026-07-09T18:35:00.000Z',
    },
  ];

  listOrders(storeId?: string) {
    return {
      data: this.orders.map((order) => ({ ...order, storeId: storeId || 'demo-store' })),
      total: this.orders.length,
    };
  }
}
