FROM node:22.1
WORKDIR /app
COPY . .
RUN npm install -g fastify-cli

RUN npm install

RUN npm run build:ts

CMD ["fastify", "start", "-l", "info", "dist/app.js"]

EXPOSE 3000