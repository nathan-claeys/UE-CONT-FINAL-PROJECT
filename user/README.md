# User Service - Clash Of Pokéchakucha

User authentication and management service for the Pokéchakucha game platform.

## Quick Start

```bash
# Start with Docker
docker-compose up -d

# Start development
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=pokechakucha
DB_PASSWORD=pokechakucha123
DB_NAME=pokechakucha_users
JWT_SECRET=your-secret-key
```

## API Endpoints

### Authentication

```http
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
```

### User Operations

```http
GET /users/me
Authorization: Bearer <token>

GET /users
Authorization: Bearer <token>
?page=1&limit=10&username=test
```

### Service Integration

```http
GET /users/verify
Authorization: Bearer <token>

GET /users/details/:userId
Authorization: Bearer <token>
```

## Error Codes

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Server Error

## Documentation

- API Docs: `http://localhost:3000/docs`
- OpenAPI: `http://localhost:3000/docs/json`

## Tech Stack

- Node.js & TypeScript
- Fastify
- PostgreSQL
- TypeORM
- Docker

## Scripts

- `npm run dev`: Development
- `npm run build`: Production build
- `npm start`: Production start

## Team

- Lead: Messaoud HAMDI
- Developers: Messaoud HAMDI, Mouadh Bondka, Kaies Mhadhbi
