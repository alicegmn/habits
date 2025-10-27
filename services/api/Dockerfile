# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY tsconfig.json ./
COPY src ./src

# Compile TS → JS
RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine
WORKDIR /app

# Copy package files and install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/server.js"]
