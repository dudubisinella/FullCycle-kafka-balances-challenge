FROM node:16-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json tsconfig.json ormconfig.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar restante do código
COPY src ./src

# Compilar aplicação (gera dist/)
RUN npm run build

EXPOSE 3002

# Apenas inicia a aplicação NestJS
CMD ["npm", "run", "start:prod"]
