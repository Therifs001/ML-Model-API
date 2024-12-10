# Use the official Node.js image as the base image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080 (required by Cloud Run)
EXPOSE 8080

# Set environment variable to indicate whether it's in production or development
ENV NODE_ENV=production

# Use start:dev for development and start for production
CMD ["npm", "run", "start"]