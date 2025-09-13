FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json tsconfig.json ormconfig.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar o restante do código
COPY src ./src

# Build da aplicação (gera dist/)
RUN npm run build

# Expõe a porta do serviço
EXPOSE 3003

# Comando de inicialização
CMD ["npm", "run", "start:prod"]
