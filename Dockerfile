FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache openssl
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Production image
FROM base AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next


USER nextjs

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# CMD ["npm", "run", "start"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm run start"]
