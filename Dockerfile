FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 4000

ARG JWT_PASSWORD
ENV JWT_PASSWORD=$JWT_PASSWORD

CMD ["npm", "start"]