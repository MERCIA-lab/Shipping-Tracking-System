import { Controller, Get, Req, Res, All, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProxyService } from './proxy.service';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';

@Controller()
export class ProxyController {
  private readonly logger = new Logger(ProxyController.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('services')
  getServices() {
    return this.proxyService.getAllServices();
  }

  /**
   * Proxy all product service requests
   * /api/products/* -> http://localhost:3001/api/products/*
   */
  @All('products*')
  async proxyProducts(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('products');
    await this.forwardRequest(req, res, target);
  }

  /**
   * Proxy all auth service requests
   * /api/auth/* -> http://localhost:3002/api/auth/*
   */
  @All('auth*')
  async proxyAuth(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('auth');
    await this.forwardRequest(req, res, target);
  }

  /**
   * Proxy all order service requests
   * /api/orders/* -> http://localhost:3003/api/orders/*
   */
  @All('orders*')
  async proxyOrders(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('orders');
    await this.forwardRequest(req, res, target);
  }

  /**
   * Proxy all inventory service requests
   * /api/inventory/* -> http://localhost:3004/api/inventory/*
   */
  @All('inventory*')
  async proxyInventory(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('inventory');
    await this.forwardRequest(req, res, target);
  }

  /**
   * Proxy all payment service requests
   * /api/payments/* -> http://localhost:3005/api/payments/*
   */
  @All('payments*')
  async proxyPayments(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('payments');
    await this.forwardRequest(req, res, target);
  }

  /**
   * Proxy all user service requests
   * /api/users/* -> http://localhost:3006/api/users/*
   */
  @All('users*')
  async proxyUsers(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('users');
    await this.forwardRequest(req, res, target);
  }

  private async forwardRequest(req: any, res: any, targetUrl: string) {
    if (!targetUrl) {
      return res.status(503).json({ error: 'Service unavailable' });
    }

    const url = `${targetUrl}${req.originalUrl.replace('/api', '/api')}`;
    const method = req.method.toLowerCase();

    try {
      const config: any = {
        method,
        url,
        headers: {
          ...req.headers,
          host: new URL(targetUrl).host,
        },
      };

      // Forward body for POST, PUT, PATCH
      if (['post', 'put', 'patch'].includes(method)) {
        config.data = req.body;
      }

      const response = await this.httpService.request(config).toPromise();

      res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Proxy error: ${error.message}`, error);
      const status = error.response?.status || 502;
      const message = error.response?.data || { error: 'Bad Gateway' };
      res.status(status).json(message);
    }
  }
}
