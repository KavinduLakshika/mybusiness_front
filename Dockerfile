# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for Vite)
RUN npm install --include=dev

# Install Vite globally to ensure it's available
RUN npm install -g vite

# Clear npm cache to avoid conflicts
RUN npm cache clean --force

# Copy source code
COPY . .

# Expose port 3002
EXPOSE 3002

# Configure Vite to use port 3002 and bind to all interfaces
ENV VITE_PORT=3002
ENV VITE_HOST=0.0.0.0

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3002"]