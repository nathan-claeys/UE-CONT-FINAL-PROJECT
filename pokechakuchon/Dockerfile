# syntax=docker/dockerfile:1
FROM node:23.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g fastify-cli
RUN npm run build:ts
CMD ["fastify", "start", "-l", "info", "dist/app.js"]
EXPOSE 8080