import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly demoUsers = [
    {
      id: '1',
      email: 'admin@imeek.com',
      name: 'Admin User',
      role: 'super_admin',
      password: 'admin123',
    },
    {
      id: '2',
      email: 'manager@imeek.com',
      name: 'Store Manager',
      role: 'manager',
      password: 'manager123',
    },
  ];

  login(email: string, password: string) {
    const user = this.demoUsers.find((entry) => entry.email === email && entry.password === password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: `demo-token-${user.id}`,
    };
  }

  getUser(token?: string) {
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    const userId = token.replace('demo-token-', '');
    const user = this.demoUsers.find((entry) => entry.id === userId);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
