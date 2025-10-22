# Build stage
FROM node:22-alpine AS builder

# Install dependencies for potential native builds
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test

# Production stage
FROM node:22-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

RUN npm ci --only=production && \
    # Clean npm cache
    npm cache clean --force && \
    # Set directory permissions
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]