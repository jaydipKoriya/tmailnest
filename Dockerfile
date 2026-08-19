# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Install ONLY production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Ensure the container listens on port 3000
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
