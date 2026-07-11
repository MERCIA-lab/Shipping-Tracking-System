import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'inventory-service', timestamp: new Date().toISOString() };
  }

  @Get('inventory')
  list(@Query('storeId') storeId: string) {
    return this.appService.listInventory(storeId);
  }
}
