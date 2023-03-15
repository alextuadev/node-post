FROM node:16

WORKDIR /app

COPY ./app/package*.json ./
COPY ./app/nodemon.json ./

RUN npm install
RUN npm install -g nodemon


COPY ./app ./

EXPOSE 3000

CMD ["npm", "run", "dev"]