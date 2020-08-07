FROM node:latest
WORKDIR /app 
ADD . .
RUN npm install
RUN npm run-script build
WORKDIR ./backend
RUN npm install
CMD node app.js

