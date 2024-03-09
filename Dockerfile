FROM node:18.16.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]