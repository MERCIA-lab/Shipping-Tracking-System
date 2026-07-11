import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() };
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.appService.login(body.email, body.password);
  }

  @Post('me')
  me(@Body() body: { token?: string }) {
    return this.appService.getUser(body.token);
  }
}
