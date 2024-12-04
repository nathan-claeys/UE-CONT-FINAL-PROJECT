# syntax=docker/dockerfile:1
FROM node:23.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm","run","dev"]
EXPOSE 8080