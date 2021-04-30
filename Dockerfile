FROM node:12.20.1-alpine

WORKDIR /opt/web

RUN npm install pm2 -g

COPY package.json package-lock.json ./
RUN npm install --production

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

EXPOSE 5000

RUN npm run build

WORKDIR ./backend

RUN npm install

CMD ["/bin/sh", "-c", "pm2-runtime 'NODE_ENV=production node app.js'"]
