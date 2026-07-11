import { Controller, Get, Req, Res, All, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  private readonly logger = new Logger(ProxyController.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get('health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: this.proxyService.getAllServices(),
    };
  }

  @Get('services')
  getServices() {
    return {
      gateway: 'http://localhost:3000',
      services: this.proxyService.getAllServices(),
    };
  }

  @All('products*')
  async proxyProducts(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('products');
    await this.forwardRequest(req, res, target);
  }

  @All('auth*')
  async proxyAuth(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('auth');
    await this.forwardRequest(req, res, target);
  }

  @All('orders*')
  async proxyOrders(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('orders');
    await this.forwardRequest(req, res, target);
  }

  @All('inventory*')
  async proxyInventory(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('inventory');
    await this.forwardRequest(req, res, target);
  }

  @All('payments*')
  async proxyPayments(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('payments');
    await this.forwardRequest(req, res, target);
  }

  @All('users*')
  async proxyUsers(@Req() req, @Res() res) {
    const target = this.proxyService.getServiceUrl('users');
    await this.forwardRequest(req, res, target);
  }

  private async forwardRequest(req: any, res: any, targetUrl: string) {
    if (!targetUrl) {
      return res.status(503).json({ error: 'Service unavailable' });
    }

    const originalPath = req.originalUrl || '/';
    const url = `${targetUrl}${originalPath}`;
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

      if (['post', 'put', 'patch'].includes(method)) {
        config.data = req.body;
      }

      const response = await this.httpService.request(config).toPromise();
      return res.status(response.status).send(response.data);
    } catch (error: any) {
      this.logger.error(`Proxy error: ${error.message}`, error);
      const status = error.response?.status || 502;
      const message = error.response?.data || { error: 'Bad Gateway' };
      return res.status(status).json(message);
    }
  }
}
