# Admin Portal - Quick Start

The admin portal is built with React, Vite, and TypeScript and provides a complete dashboard for merchants to manage their stores.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev:admin
```

The portal will be available at `http://localhost:5173`

### Demo Credentials

- Email: `admin@imeek.com` (or any email)
- Password: `demo`

## Features Available

### Dashboard
- KPI cards (Revenue, Orders, Visitors, Customers, Conversion)
- Sales trend chart (7-day view)
- Category distribution pie chart
- Recent orders list
- Low stock alerts

### Navigation
- **Dashboard**: Overview and KPIs
- **Products**: Product catalog management (coming soon)
- **Inventory**: Stock tracking (coming soon)
- **Orders**: Order management (coming soon)
- **Customers**: Customer profiles (coming soon)
- **Payments**: Payment transactions (coming soon)
- **Shipping**: Shipment tracking (coming soon)
- **Analytics**: Advanced reports (coming soon)
- **Integrations**: Marketplace sync (coming soon)
- **Settings**: Configuration (coming soon)

## Tech Stack

- React 19
- Vite 5
- TypeScript
- TailwindCSS 3
- Zustand (state management)
- React Router v6
- Recharts (data visualization)
- Lucide Icons

## Project Structure

```
apps/admin-portal/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── layouts/          # Layout wrappers
│   │   └── DashboardLayout.tsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── Inventory.tsx
│   │   ├── Orders.tsx
│   │   ├── Customers.tsx
│   │   ├── Payments.tsx
│   │   ├── Shipping.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   ├── stores/           # Zustand stores
│   │   └── auth.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Building for Production

```bash
npm run build:admin
```

Output will be in `dist/` directory.

## API Integration

The development server proxies `/api` requests to `http://localhost:3000` (API Gateway).

To connect actual backend services:

1. Ensure API Gateway is running on port 3000
2. Update authentication in `src/stores/auth.ts`
3. Create API client functions in `src/api/`
4. Connect pages to backend services

## Next Steps

1. Implement Products module with CRUD operations
2. Build Inventory management with warehouse support
3. Create Order management workflow
4. Add Analytics page with ClickHouse integration
5. Integrate with backend services
