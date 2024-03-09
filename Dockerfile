FROM node:18.16.0

WORKDIR /

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start"]