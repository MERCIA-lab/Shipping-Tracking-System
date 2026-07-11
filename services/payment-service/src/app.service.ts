import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly payments = [
    { id: 'PAY-1001', amount: 129.99, method: 'card', status: 'captured' },
    { id: 'PAY-1002', amount: 84.5, method: 'paypal', status: 'settled' },
  ];

  listPayments(storeId?: string) {
    return {
      data: this.payments.map((payment) => ({ ...payment, storeId: storeId || 'demo-store' })),
      total: this.payments.length,
    };
  }
}
