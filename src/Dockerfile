# Use Node 20
FROM node:20-slim

# Install OpenSSL (Required for Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port 5000
EXPOSE 5000

# Run migrations and start
CMD npx prisma migrate deploy && npm start