FROM node:20 AS build
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./tsconfig.json .
RUN npm install

COPY ./src ./src
RUN npm run build


FROM node:20-slim

WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install --production

COPY --from=build /usr/src/app/dist ./

ENV NODE_ENV="production"
CMD [ "node", "index.js" ]
