'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const Pack = require('./package');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/api'),
    labels: ['api']
  }],
  registrations: [
    {
      plugin: 'inert'
    }, {
      plugin: 'vision'
    }, {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            'title': 'Test API Documentation',
            'version': Pack.version,
          }
        }
      }
    }, {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            }, {
              module: 'good-console'
            }, 'stdout']
          }
        }
      }
    }, {
      plugin: './server/api/index'
    }
  ]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

  return store.meta(key, criteria);
};
