FROM node:20-alpine3.18 as base

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start"]
