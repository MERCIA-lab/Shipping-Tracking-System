import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'user-service', timestamp: new Date().toISOString() };
  }

  @Get('users')
  list(@Query('storeId') storeId: string) {
    return this.appService.listUsers(storeId);
  }
}
