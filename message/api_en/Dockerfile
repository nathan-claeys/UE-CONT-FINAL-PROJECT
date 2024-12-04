# Use the official Node.js image as the base image
FROM node:23.1.0

# Set the working directory
ARG CONTEXT_DIR=.
WORKDIR ${CONTEXT_DIR}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install typescript -g
# Copy the rest of the application code
COPY . .
# Command to run the application
CMD ["npm","run", "dev"]
# Expose the port the app runs on
EXPOSE 3000


