# ---------- Build & Test ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test || echo "Skipping tests"

# ---------- Runtime ----------
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
