# iMeek Platform - Complete Development Guide

This guide covers setting up and running the entire iMeek platform stack locally.

## 🏗️ Architecture

```
Frontend (React)
    ↓
API Gateway (Port 3000)
    ├→ Product Service (Port 3001)
    ├→ Auth Service (Port 3002)
    ├→ Order Service (Port 3003)
    └→ ... other services
    ↓
PostgreSQL Database
```

## 📋 Prerequisites

- **Node.js:** 18.0 or higher
- **npm:** 9.0 or higher
- **PostgreSQL:** 14 or higher (or Docker)
- **Git:** For version control

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd /c/Users/LENOVO/imeek-platform
npm install
```

### 2. Start PostgreSQL (Docker)
```bash
docker-compose up -d postgres redis
# Or use local PostgreSQL if already running
```

### 3. Start Services
```bash
# Terminal 1: API Gateway
npm run dev:gateway

# Terminal 2: Product Service
npm run dev:product

# Terminal 3: Admin Portal
npm run dev:admin
```

### 4. Access Applications
- **Admin Portal:** http://localhost:5173
- **API Gateway:** http://localhost:3000/api
- **Product Service:** http://localhost:3001/api

## 📦 Project Structure

```
apps/
├── admin-portal/          # React dashboard
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── stores/       # Zustand stores (to migrate to API)
│   │   ├── components/   # Reusable components
│   │   └── hooks/        # React hooks (useProductsApi)
│   └── vite.config.ts    # Vite + API proxy
├── api-gateway/          # NestJS proxy
│   └── src/
│       ├── proxy/        # Routing logic
│       └── app.module.ts
└── customer-web/         # Coming soon

services/
├── product-service/      # Product management (✅ Complete)
│   ├── src/
│   │   ├── products/
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   ├── products.service.ts
│   │   │   └── products.controller.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── .env
├── auth-service/         # (Coming soon)
├── order-service/        # (Coming soon)
└── ... other services

packages/
├── api-sdk/              # HTTP client
├── types/                # TypeScript types
├── ui/                   # UI components
└── utils/                # Utilities

infrastructure/
├── docker/               # Dockerfiles
├── kubernetes/           # K8s manifests
└── terraform/            # Infrastructure as code
```

## 🔧 Development Workflow

### Working on Admin Portal

1. **Start development server:**
   ```bash
   cd apps/admin-portal
   npm run dev:admin  # Runs on http://localhost:5173
   ```

2. **Make changes** in `src/` directory
   - Hot reload enabled automatically
   - API proxied to localhost:3000

3. **Test API integration:**
   - Check Network tab in DevTools
   - Verify requests go to `http://localhost:3000/api`

### Working on Product Service

1. **Start development server:**
   ```bash
   cd services/product-service
   npm run dev  # Runs on http://localhost:3001
   ```

2. **Make changes** in `src/` directory
   - Hot reload enabled with NestJS watch
   - Database schema auto-syncs (development)

3. **Test endpoints:**
   ```bash
   curl http://localhost:3000/api/products?storeId=store-123
   ```

### Working on API Gateway

1. **Start development server:**
   ```bash
   cd apps/api-gateway
   npm run dev  # Runs on http://localhost:3000
   ```

2. **Make changes** in `src/proxy/`
   - Add/modify routes in proxy.controller.ts
   - Hot reload enabled

## 🗄️ Database Setup

### Option 1: Docker (Recommended)
```bash
# Start database
docker-compose up -d postgres

# View logs
docker-compose logs postgres

# Stop database
docker-compose down
```

### Option 2: Local PostgreSQL
```bash
# Create database (macOS/Linux)
psql -U postgres
CREATE DATABASE imeek_products;
CREATE DATABASE imeek_orders;
CREATE DATABASE imeek_auth;

# Or on Windows with PowerShell
psql -U postgres -c "CREATE DATABASE imeek_products;"
```

### Database Seeding
```bash
# Product Service auto-creates tables on startup with:
# - Automatic schema synchronization (dev only)
# - Proper indexing for performance
# - Seed data via migration scripts (TODO)
```

## 📡 API Testing

### Using curl
```bash
# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "demo-store",
    "name": "Test Product",
    "sku": "TEST-001",
    "price": 99.99,
    "cost": 50.00,
    "stock": 10,
    "category": "Test",
    "status": "active"
  }'

# Get products
curl "http://localhost:3000/api/products?storeId=demo-store"

# Update product
curl -X PATCH http://localhost:3000/api/products/{product-id} \
  -H "Content-Type: application/json" \
  -d '{"stock": 5}'

# Delete product
curl -X DELETE http://localhost:3000/api/products/{product-id}
```

### Using Postman/Insomnia
1. Import collection from `docs/api/postman-collection.json`
2. Set variables: `{{BASE_URL}}=http://localhost:3000/api`
3. Send requests

## 🧪 Testing

### Run Tests (TODO)
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# e2e tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Manual Testing Checklist

**Admin Portal**
- [ ] Login with credentials
- [ ] Navigate all sidebar modules
- [ ] Search products
- [ ] Filter by category/status
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] View analytics charts
- [ ] Check responsive design

**Product Service**
- [ ] GET /products returns paginated list
- [ ] POST /products creates new product
- [ ] PATCH /products/:id updates product
- [ ] DELETE /products/:id soft deletes
- [ ] Category filtering works
- [ ] Search by name/SKU works
- [ ] Stock calculations correct
- [ ] Error handling for duplicate SKU

**API Gateway**
- [ ] /health endpoint responds
- [ ] /services lists all microservices
- [ ] Requests properly routed to services
- [ ] CORS headers present
- [ ] Error responses structured

## 🐛 Debugging

### View Network Requests
```bash
# Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action in admin portal
4. Check request URL and response
```

### View Backend Logs
```bash
# Product Service logs show:
# - HTTP requests received
# - Database queries (in development)
# - Errors and stack traces

# Example output:
# [Nest] 12345 - 01/15/2024, 10:30:00 AM LOG [InstanceLoader] TypeOrmModule dependencies initialized +12345ms
# [Nest] 12345 - 01/15/2024, 10:30:00 AM LOG [InstanceLoader] ProductsModule dependencies initialized +1234ms
```

### Common Issues

**Port Already in Use**
```bash
# Find and kill process on port 3000
# macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill

# Windows PowerShell
Get-Process | Where-Object {$_.Port -eq 3000} | Stop-Process
```

**Database Connection Error**
```bash
# Verify PostgreSQL is running
psql -U postgres -h localhost -c "\l"

# Check connection string in .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
```

**CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
→ Verify admin portal (5173) is in gateway CORS origin list

**Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- [Architecture Overview](docs/architecture/overview.md)
- [Database Schema](docs/database/schema.md)
- [API Reference](docs/api/README.md)
- [Deployment Guide](docs/deployment/deployment-plan.md)
- [Phase 1 Complete](PHASE1_COMPLETE.md)
- [Phase 2 Complete](PHASE2_COMPLETE.md)
- [Phase 3 Implementation](PHASE3_IMPLEMENTATION.md)

## 🚢 Deployment

### Development
```bash
npm run dev:admin
npm run dev:gateway
npm run dev:product
```

### Production Build
```bash
# Build all services
npm run build

# Run production build
npm run start:admin
npm run start:gateway
npm run start:product
```

### Docker Deployment
```bash
# Build images
docker build -f docker/admin-portal.dockerfile -t imeek-admin:latest .
docker build -f docker/api-gateway.dockerfile -t imeek-gateway:latest .
docker build -f docker/product-service.dockerfile -t imeek-product:latest .

# Run containers
docker run -p 5173:5173 imeek-admin:latest
docker run -p 3000:3000 imeek-gateway:latest
docker run -p 3001:3001 imeek-product:latest
```

### Kubernetes Deployment
```bash
# Apply configurations
kubectl apply -f infrastructure/kubernetes/namespace-config.yaml
kubectl apply -f infrastructure/kubernetes/api-gateway-deployment.yaml

# Verify deployment
kubectl get pods -n imeek
kubectl get services -n imeek
```

## 🔗 Useful Commands

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run all dev servers
npm run dev

# Run specific service
npm run dev:admin    # Admin portal
npm run dev:gateway  # API Gateway
npm run dev:product  # Product service

# Format code
npm run format

# Lint code
npm run lint

# Clean build artifacts
npm run clean

# View current status
npm run status
```

## 📖 Learning Resources

- [NestJS Guide](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Guide](https://typeorm.io)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [RESTful API Design](https://restfulapi.net)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes following code style
3. Test thoroughly: `npm run test`
4. Commit with clear message: `git commit -m "Add feature description"`
5. Push and create Pull Request

## 📞 Support

- **Issues:** Create on GitHub
- **Questions:** Check documentation or ask in discussions
- **Bugs:** Report with reproduction steps

## 📅 Development Timeline

| Phase | Status | Completion |
|-------|--------|-----------|
| Phase 1 | ✅ Complete | Admin Portal + Dashboard |
| Phase 2 | ✅ Complete | All Admin Modules |
| Phase 3 | 🚧 In Progress | Backend Services |
| Phase 4 | ⏱️ Planned | Customer Web App |
| Phase 5 | ⏱️ Planned | Mobile App |

## 🎯 Next Steps

1. ✅ Product Service backend complete
2. 🚧 Integrate with Admin Portal
3. 🚧 Create Order Service
4. 🚧 Build Customer Storefront
5. 🚧 Mobile app development

---

**Ready to build something amazing? Let's go! 🚀**
