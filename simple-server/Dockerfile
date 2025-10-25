## For testing
## ## docker build --target build -t simple-server-test . + docker run --rm simple-server-test
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

## For production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]