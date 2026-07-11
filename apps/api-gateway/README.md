# API Gateway

The API Gateway is the main entry point for all requests to the iMeek platform. It handles:

- Request routing to appropriate microservices
- Authentication and authorization
- Rate limiting
- Request/response logging
- API documentation

## Architecture

- NestJS with middleware for cross-cutting concerns
- JWT token validation
- RBAC (Role-Based Access Control)
- Service discovery for dynamic routing
