# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Vite globally
RUN npm install -g vite

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 3002 (Vite's default dev server port)
EXPOSE 3002

# Configure Vite to accept connections from any host
ENV VITE_HOST=0.0.0.0

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3002"]