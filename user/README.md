# User Service - Clash Of Pokéchakucha

Authentication and user management microservice for the Pokéchakucha game platform.

## Features

- User authentication & registration
- JWT-based session management
- Credit system management
- Experience/leveling system
- Profile management
- OpenAPI documentation

## Tech Stack

- Node.js >=16
- TypeScript
- Fastify framework
- PostgreSQL 15
- TypeORM
- Docker

## Quick Start

```bash
# Clone and enter directory
git clone <repository-url>
cd user

# Install dependencies
npm install

# Start database
docker-compose up -d postgres

# Start development server
npm run dev
```

## Environment Setup

1. Copy example environment file:

```bash
cp .env.example .env
```

2. Configure environment variables:

```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=pokechakucha
DB_PASSWORD=pokechakucha123
DB_NAME=pokechakucha_users

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Logging
LOG_LEVEL=info
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm test` - Run tests

### Database

The service uses PostgreSQL. Docker Compose configuration is provided:

```bash
# Start database
docker-compose up -d postgres

# Stop database
docker-compose down

# View logs
docker-compose logs postgres
```

Database credentials:

- User: pokechakucha
- Password: pokechakucha123
- Database: pokechakucha_users

## API Documentation

OpenAPI documentation is available at:

- Interactive UI: `http://localhost:3000/docs`
- OpenAPI spec: `http://localhost:3000/docs/json`

### Key Endpoints

```typescript
POST /users/register
{
  "username": string,
  "email": string,
  "password": string
}

POST /users/login
{
  "email": string,
  "password": string
}

GET /users/me
Header: Authorization: Bearer <token>
```

## API Integration

To integrate with this service:

1. Register a user
2. Login to get JWT token
3. Use token in Authorization header for protected endpoints
4. Route all user-related operations through this service

Example request:

```typescript
const response = await fetch("http://localhost:3000/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const { token, user } = await response.json();
```

## Architecture

The service follows a layered architecture:

- Routes (app.ts)
- Services (UserService.ts)
- Models (User.ts)
- Database (TypeORM)

Authentication flow uses JWT tokens that must be included in requests to protected endpoints of other services.

## Error Handling

Standard error responses:

```json
{
  "error": "ErrorType",
  "message": "Error description",
  "statusCode": 400
}
```

Common status codes:

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Contributing

1. Branch naming: `feature/*`, `fix/*`, `refactor/*`
2. Follow existing code style
3. Add tests for new features
4. Update documentation
5. Submit PR with descriptive title and description

## Contact

For issues or questions, contact:

- Team Lead: [ Messaoud HAMDI ]
- Developers : [ Messaoud HAMDI - Mouadh Bondka - Kaies Mhadhbi ]
