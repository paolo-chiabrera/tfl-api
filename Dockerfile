FROM node:6

MAINTAINER Paolo Chiabrera <paolo.chiabrera@gmail.com>

ENV NODE_ENV production

ENV PM2_HOME /home/app/.pm2

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:

ADD package.json /tmp/package.json

RUN cd /tmp && npm install --save pm2@latest -g && npm install --production

RUN mkdir -p /home/app && cp -a /tmp/node_modules /home/app

RUN pm2 startup ubuntu

WORKDIR /home/app

ADD . /home/app

CMD pm2 start /home/app/server.js -x -i 1 --name app && pm2 save && pm2 logs
