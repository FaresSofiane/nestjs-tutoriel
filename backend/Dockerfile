FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
RUN bun install --no-cache

COPY . .

# Commande par défaut quand le container se lance
CMD ["bun", "run", "start:dev"]