FROM node:20-alpine

WORKDIR /app

# Installera deps
COPY package*.json ./
RUN npm ci --omit=dev

# Kopiera appen
COPY . .

EXPOSE 8000
CMD ["node", "src/server.js"]
