FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY ./src .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]

