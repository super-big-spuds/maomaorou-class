FROM node:18.19.0 as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3100

FROM base as production
COPY . .
RUN npm install
RUN npm run compile
RUN npm run build

RUN npm install pm2 -g

CMD ["pm2-runtime", "start", "npm", "--name", "web", "--", "start"]
