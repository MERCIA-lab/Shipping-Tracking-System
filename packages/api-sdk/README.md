# API SDK

API client library for the iMeek platform. Use this to communicate with backend services from frontend applications.

## Installation

```bash
npm install @imeek/api-sdk
```

## Usage

```typescript
import { createApiClient } from '@imeek/api-sdk';

const api = createApiClient({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
  token: localStorage.getItem('auth_token'),
});

// Use API client
const orders = await api.orders.list();
const product = await api.products.get(id);
```

## Available Methods

### Auth
- `auth.login(email, password)`
- `auth.logout()`
- `auth.refreshToken()`

### Products
- `products.list()`
- `products.get(id)`
- `products.create(data)`
- `products.update(id, data)`
- `products.delete(id)`

### Orders
- `orders.list()`
- `orders.get(id)`
- `orders.create(data)`
- `orders.updateStatus(id, status)`

More methods coming soon...
