From node:14-alpine

WORKDIR /usr/local/application

ENV PORT=3000 

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "app.js"]