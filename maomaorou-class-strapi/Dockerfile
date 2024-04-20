FROM node:18.9.0 as dev

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/

COPY ./ ./

RUN yarn install


EXPOSE 1338