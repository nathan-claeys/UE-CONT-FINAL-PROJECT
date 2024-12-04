# Use an official Node.js image
FROM node:19.7.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install TypeScript globally (optional) and build the TypeScript code
RUN npm install -g typescript && npx tsc

# Expose the application port
EXPOSE 3000

# Run the application using the compiled JavaScript output
CMD ["node", "dist/app.js"]
