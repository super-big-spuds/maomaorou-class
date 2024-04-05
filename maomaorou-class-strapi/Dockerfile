FROM node:18 as dev

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

COPY ./ ./

RUN yarn install

EXPOSE 1337

CMD ["yarn", "develop"]