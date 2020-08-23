FROM node:latest

# Create app directory
WORKDIR /app

COPY ./src /app

RUN npm install

EXPOSE 4000
CMD [ "npm", "start" ]

