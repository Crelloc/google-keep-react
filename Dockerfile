FROM node:lts
WORKDIR /app
COPY package*.json ./ 
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
ADD  . ./
RUN npm run-script build
WORKDIR ./backend
RUN npm install
CMD NODE_ENV=production node app.js
