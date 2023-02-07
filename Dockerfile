FROM node:18.13.0 as builder

RUN apt-get update

FROM builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]