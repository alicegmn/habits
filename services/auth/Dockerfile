# 1. Bas-image
FROM node:20-alpine

# 2. Skapa arbetsmapp i containern
WORKDIR /app

# 3. Kopiera package.json + package-lock.json först (för att cacha npm install)
COPY package*.json ./

# 4. Installera dependencies
RUN npm install

# 5. Kopiera all kod
COPY . .

# 6. Standardkommando (dev mode med nodemon + ts-node)
CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts", "--exec", "npx ts-node src/server.ts"]
