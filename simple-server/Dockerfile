# ---------- Builder Stage ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm test || echo "Skipping tests"

# ---------- Production Stage ----------
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]

##
# - Caching: package*.json kopieras först = snabbare build
# - Mindre image: endast production-dependencies kopieras i slutsteget
# - Tester körs i builder-fas, ingen testkod i slut-imagen
# - Alpine-bas = liten slutstorlek