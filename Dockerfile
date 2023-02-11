FROM node:16.17.0

ENV BASE_URL=http://0.0.0.0:3000
ENV BASIC_ENABLED=false


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
