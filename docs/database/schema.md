# Database Design

## Core Domains

The system is centered on commerce and marketplace data. The primary transactional database should be PostgreSQL.

## Primary Tables

### Users and Access
- users
- roles
- permissions
- user_roles
- api_tokens
- audit_logs

### Stores and Merchants
- stores
- store_settings
- store_domains
- store_themes

### Catalog
- categories
- brands
- products
- product_variants
- product_images
- product_videos
- product_prices
- discount_rules

### Inventory
- inventory_items
- warehouses
- stock_movements
- stock_transfers
- low_stock_alerts

### Orders and Fulfillment
- orders
- order_items
- payments
- shipments
- delivery_agents
- return_requests

### Customers and Commerce
- addresses
- wishlists
- reviews
- support_tickets
- coupons
- gift_cards
- reward_points

### Marketplace Integration
- imports
- import_jobs
- external_product_syncs
- integration_tokens

## Recommended Storage Strategy

- PostgreSQL: orders, products, users, payments, inventory, stores
- Redis: cart state, cache, rate limiting, transient sessions
- Elasticsearch: product index, search suggestions, category filters
- S3-compatible storage: product images, videos, documents
- ClickHouse: analytics events and reporting data

## Relationship Notes

- Each store owns products, inventory, orders, and promotions.
- Each order contains multiple order items and maps to one payment and one shipment.
- Each product may have many variants, media assets, and price records.
- Marketplace imports should be normalized before writing to the core catalog.
