FROM node:12.16-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN yarn

COPY . .
ENTRYPOINT yarn start