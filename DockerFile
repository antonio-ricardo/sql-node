FROM node

WORKDIR /app

COPY dist ./src

COPY package.json .env ./
COPY node_modules /app/node_modules

EXPOSE 3000

ENTRYPOINT [ "yarn", "prod"]