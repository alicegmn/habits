# ---------- Build & Test Stage ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm test


# ---------- Production Stage ----------
FROM node:18-alpine AS production
WORKDIR /app

# Copy dependencies and code from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]
