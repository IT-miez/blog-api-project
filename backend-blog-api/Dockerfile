# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Smaller image
FROM node:16-alpine

WORKDIR /app

# Copy  necessary files
COPY --from=builder /app/ /app/
EXPOSE 5000

CMD ["npm", "start"]
