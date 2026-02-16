# Use your specific Node version
FROM node:22.17.1-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including peer deps
RUN npm install --legacy-peer-deps

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of your code
COPY . .

# Expose the port Express uses
EXPOSE 8000

# Run migrations and start the server
CMD npx prisma migrate deploy && node index.js