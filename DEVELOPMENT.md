# Development Guide

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- Git

### Setup

1. Clone the repository
```bash
git clone https://github.com/your-org/imeek-platform.git
cd imeek-platform
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your local configuration
```

4. Start infrastructure services
```bash
docker-compose up -d
```

5. Run migrations (when ready)
```bash
npm run migrate --workspaces
```

### Development Workflow

#### Running All Services

```bash
# Terminal 1 - API Gateway
npm run dev:gateway

# Terminal 2 - Admin Portal
npm run dev:admin

# Terminal 3 - Customer Web
npm run dev:customer
```

#### Building Individual Services

```bash
npm run build --workspace apps/admin-portal
npm run build --workspace services/auth-service
```

### Project Structure

- **apps/** - Client applications (web, mobile, admin)
- **services/** - Backend microservices
- **packages/** - Shared libraries (ui, types, utils)
- **infrastructure/** - Deployment and infrastructure as code
- **docs/** - Architecture and API documentation

### API Documentation

API documentation is available at `http://localhost:3000/api/docs` when running the API gateway.

### Monitoring

Access Grafana dashboards at `http://localhost:3001` (after running monitoring stack).

## Recommended Development Order

1. Design System (UI components)
2. Layout and Routing
3. Authentication
4. Dashboard
5. Products Module
6. Inventory
7. Orders
8. Customers
9. Payments
10. Shipping
11. Marketplace Integration
12. Analytics & Reports
13. Marketing
14. Mobile Application
15. Production Deployment

## Contributing

Follow these guidelines:

- Commit messages should be descriptive and follow conventional commits
- All code should be formatted with Prettier
- TypeScript strict mode is enforced
- Unit tests are required for new features
