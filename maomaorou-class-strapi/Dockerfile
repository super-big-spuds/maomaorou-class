FROM node:18.9.0 as prod

ARG NODE_ENV=dev

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/

COPY ./ ./

RUN yarn install

RUN yarn build

RUN npm install pm2 -g

EXPOSE 1337

CMD ["pm2-runtime", "start", "yarn", "--interpreter", "bash", "--name", "api", "--", "start"]
