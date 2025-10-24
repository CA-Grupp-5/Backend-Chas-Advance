# Docker Setup Guide

This guide explains how to use Docker with the backend of Group 5s contribution to Chas Advance for both development and production environments.

## Prerequites

- Docker installed on your machine
- Docker Compose v2.x installed
- Git (for cloning the repository)

## Development

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your local settings (the database settings should match the `db` service in docker-compose.dev.yml)

3. Start the development environment:

   ```bash
   docker compose -f docker/docker-compose.dev.yml up --build
   ```

4. Initialize node_modules (first time only):
   ```bash
   docker compose -f docker/docker-compose.dev.yml run --rm backend npm ci
   ```
   The application will be available at:

- Backend API: http://localhost:3000
- Database: localhost:5432

## Development Environment Details

The development setup includes:

- Hot-reloading Node.js backend
- PostgreSQL database
- Mounted source code for live editing
- Named volumes for node_modules and database persistence

### Common Developmend Commands

```bash
# Start the development environment
docker compose -f docker/docker-compose.dev.yml up

# Start in detached mode
docker compose -f docker/docker-compose.dev.yml up -d

# View logs
docker compose -f docker/docker-compose.dev.yml logs -f

# Stop all services
docker compose -f docker/docker-compose.dev.yml down

# Stop and remove volumes (will clear database)
docker compose -f docker/docker-compose.dev.yml down -v

# Run tests in container
docker compose -f docker/docker-compose.dev.yml exec backend npm test
```

### Database Access

The PostgreSQL database is accessible with these default settings:

- Host: localhost
- Port: 5432
- User: postgres
- Password: password
- Database: chas_advance_dev
