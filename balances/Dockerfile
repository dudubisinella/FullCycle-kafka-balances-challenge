FROM node:16-alpine
WORKDIR /app
COPY package.json tsconfig.json ormconfig.json ./
COPY src ./src
RUN npm install
CMD ["sh","-c","node -e \"console.log('waiting for DB...')\" && npm run start"]