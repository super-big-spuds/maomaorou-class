FROM node:18.9.0 as prod

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/

COPY ./ ./

RUN yarn install

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
