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

3. Initialize node_modules (first time only or if you cleared volumes):

   ```bash
   docker compose -f docker/docker-compose.dev.yml run --rm backend npm ci
   ```

   The application will be available at:

4. Start the development environment:

   ```bash
   docker compose -f docker/docker-compose.dev.yml up -d
   ```

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

# Rebuild image
docker compose -f docker/docker-compose.dev.yml up --build
```

### Database Access

The PostgreSQL database is accessible with these default settings:

- Host: localhost
- Port: 5432
- User: postgres
- Password: password
- Database: chas_advance_dev

## Production Build

To build the production image:

```bash
docker build -t backend-chas-advance:latest .
```

The production Dockerfile:

- Uses multi-stage builds to minimize image siza
- Installs only production dependencies
- Runs with NODE_ENV=production
- Exposes port 3000

### Production Environment Variables

Required environment variables for production:

```
PORT=3000
DB_SERVER=<your-db-host>
DB_NAME=<your-db-name>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_PORT=5432
JWT_SECRET=<your-jwt-secret>
```

## Maintenence

### Updating Dependencies

To update node_modules:

```bash
# Update in development environment
docker compose -f docker/docker-compose.dev.yml run --rm backend npm update

# Rebuild the containers after updating
docker compose -f docker/docker-compose.dev.yml up --build
```

### Cleaning Up

Remove unused Docker resources:

```bash
# Remove unused containers, networks, images
docker system prune

# Include unused volumes
docker system prune --volumes
```

## Troubleshooting

1. If the app can't connect to the database:

   - Check that the DB\_\* environment variables match the postgres service settings
   - Try waiting a few seconds for postgres to initialize
   - Verifiy postgres logs: `docker compose -f docker/docker-compose.dev.yml logs db`

2. If node_modules aren't updating:

   - Remove the node_modules volume and reinstall:

   ```bash
   docker compose -f docker/docker-compose.dev.yml down -v
   docker compose -f docker/docker-compose.dev.yml up --build
   docker compose -f docker/docker-compose.dev.yml run --rm backend npm ci
   ```

3. For permission issues:
   - Ensure your user has Docker permissions
   - Check file ownership in mounted volumes
