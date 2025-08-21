# Development Dockerfile for Next.js app
# - Multi-arch node base image
# - Bind dev server to 0.0.0.0 for access from host
# - Enable polling to detect file changes inside container

# FROM node:20-bookworm-slim

# ENV NODE_ENV=development \
#     NEXT_TELEMETRY_DISABLED=1 \
#     WATCHPACK_POLLING=true

# WORKDIR /app

# # Install dependencies first to leverage Docker layer caching
# COPY package.json package-lock.json* ./
# RUN bash -lc 'if [ -f package-lock.json ]; then npm ci; else npm i; fi'

# # Copy source
# COPY . .

# EXPOSE 3000

# # Ensure dev server listens on 0.0.0.0
# CMD ["sh", "-c", "npm run dev -- -H 0.0.0.0"]

# FROM node:20-slim AS runner
# WORKDIR /app

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

# ENV NODE_ENV=production
# ENV PORT=8080
# EXPOSE 8080

# CMD ["node", "server.js"]

# ---------- Build ----------
FROM node:20-bookworm-slim AS builder
ENV NODE_ENV=production
# Husky(prepare) 비활성화 및 설치 스크립트 무시
ENV HUSKY=0
WORKDIR /app

# deps 먼저 복사 → 캐시 최적화
COPY package.json package-lock.json* ./
RUN bash -lc 'if [ -f package-lock.json ]; then npm ci --omit=dev --ignore-scripts; else npm i --omit=dev --ignore-scripts; fi'

# 소스 복사 후 빌드
COPY . .
RUN npm run build

# ---------- Run ----------
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /app

# standalone 산출물만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 8080
CMD ["node", "server.js"]
    