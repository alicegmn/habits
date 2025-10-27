# ---------- Build & Test Stage ----------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy the rest of the application
COPY . .

# Run tests (will fail the build if tests fail)
RUN npm test

# ---------- Production Stage ----------
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose application port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
