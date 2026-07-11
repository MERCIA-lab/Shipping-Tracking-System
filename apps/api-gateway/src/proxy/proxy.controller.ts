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

  @All('*path')
  async proxyRoute(@Req() req: any, @Res() res: any) {
    const rawPath = (req.originalUrl || '/').split('?')[0];
    const segments = rawPath.split('/').filter(Boolean);
    const service = segments[0] === 'api' ? segments[1] : segments[0];
    const target = service ? this.proxyService.getServiceUrl(service) : null;
    await this.forwardRequest(req, res, target);
  }

  private async forwardRequest(req: any, res: any, targetUrl: string | null) {
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
      if (!response) {
        return res.status(502).json({ error: 'Bad Gateway' });
      }
      return res.status(response.status).send(response.data);
    } catch (error: any) {
      this.logger.error(`Proxy error: ${error.message}`, error);
      const status = error.response?.status || 502;
      const message = error.response?.data || { error: 'Bad Gateway' };
      return res.status(status).json(message);
    }
  }
}
