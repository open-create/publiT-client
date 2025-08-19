# Development Dockerfile for Next.js app
# - Multi-arch node base image
# - Bind dev server to 0.0.0.0 for access from host
# - Enable polling to detect file changes inside container

FROM node:20-bookworm-slim

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    WATCHPACK_POLLING=true

WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package.json package-lock.json* ./
RUN bash -lc 'if [ -f package-lock.json ]; then npm ci; else npm i; fi'

# Copy source
COPY . .

EXPOSE 3000

# Ensure dev server listens on 0.0.0.0
CMD ["sh", "-c", "npm run dev -- -H 0.0.0.0"]
