FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3333

CMD npm run start:prod