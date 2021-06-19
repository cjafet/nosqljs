#FROM node:latest
FROM cjafet/alpine

ENV NODE_ENV=development PORT=7700

COPY ./core /nodejs/core/
COPY ./package.json /nodejs/

WORKDIR /nodejs

RUN ["npm", "install"]

EXPOSE $PORT

ENTRYPOINT ["node", "./core/server/nosql-server.js"]