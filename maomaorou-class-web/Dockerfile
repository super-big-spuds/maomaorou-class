FROM node:18.19.0 as base
WORKDIR /app
COPY package*.json ./
EXPOSE 3100

FROM base as production
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
