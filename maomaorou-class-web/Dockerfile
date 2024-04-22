FROM node:18.19.0-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3100

FROM base as production
WORKDIR /app

FROM base as production
COPY . .
RUN npm install
RUN npm run compile
RUN npm run build
CMD npm run start
