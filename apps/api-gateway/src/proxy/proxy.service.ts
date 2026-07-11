import { Injectable } from '@nestjs/common';

@Injectable()
export class ProxyService {
  private services = {
    products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
    orders: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
    inventory: process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004',
    payments: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
    users: process.env.USER_SERVICE_URL || 'http://localhost:3006',
  };

  getServiceUrl(service: string): string {
    return this.services[service] || null;
  }

  getAllServices(): Record<string, string> {
    return this.services;
  }
}
