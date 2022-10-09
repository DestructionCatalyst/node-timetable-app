FROM node:18

COPY package*.json ./
RUN npm install

WORKDIR /app

EXPOSE 8080
