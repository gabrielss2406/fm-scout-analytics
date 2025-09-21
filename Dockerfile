# Etapa 1 - build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2 - servidor para os arquivos estáticos
FROM node:20-alpine AS prod

WORKDIR /app
# instalar o "serve" para servir a pasta dist
RUN npm install -g serve

# copiar a pasta dist do build
COPY --from=build /app/dist ./dist

# expor a porta
EXPOSE 3000

# rodar o servidor estático
CMD ["serve", "-s", "dist", "-l", "3000"]