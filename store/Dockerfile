FROM node:22.11

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:ts

#Exposed port for documentation purposes (does not map the host to the container listening port 3000)
EXPOSE 3005

CMD ["npm", "start"]