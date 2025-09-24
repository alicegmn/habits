# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source
COPY src ./src

# Compile TS → JS
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

# Only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built code
COPY --from=build /app/dist ./dist

EXPOSE 8000
CMD ["node", "dist/server.js"]
