import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users = [
    { id: 'u1', name: 'Ava Johnson', email: 'ava@example.com', role: 'customer' },
    { id: 'u2', name: 'Noah Chen', email: 'noah@example.com', role: 'customer' },
  ];

  listUsers(storeId?: string) {
    return {
      data: this.users.map((user) => ({ ...user, storeId: storeId || 'demo-store' })),
      total: this.users.length,
    };
  }
}
