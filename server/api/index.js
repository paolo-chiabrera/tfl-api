'use strict';

const Joi = require('joi');

const lineStatus = require('../handlers/line-status');
const predictionSummary = require('../handlers/prediction-summary');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply({ message: 'Welcome to the TFL API' });
    }
  });

  // line-status

  server.route({
    method: 'GET',
    path: '/line-status',
    handler: function (request, reply) {
      reply({
        routes: [
          '/line-status/lines',
          '/line-status/status/{lineCode?}'
        ]
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/line-status/lines',
    config: {
      handler: lineStatus.getLines,
      description: 'Get all the line codes',
      notes: 'Returns an array of line codes',
      tags: ['api']
    }
  });

  server.route({
    method: 'GET',
    path: '/line-status/status/{lineCode?}',
    config: {
      handler: lineStatus.getLineStatus,
      description: 'Get the lines status',
      notes: 'Returns the line status object for the required line',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().optional().allow(lineStatus._tflLineStatus.getLines())
        }
      }
    }
  });

  // prediction-summary

  server.route({
    method: 'GET',
    path: '/prediction-summary',
    handler: function (request, reply) {
      reply({
        routes: [
          '/prediction-summary/lines',
          '/prediction-summary/summary/{lineCode?}'
        ]
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/prediction-summary/lines',
    config: {
      handler: predictionSummary.getLines,
      description: 'Get all the line codes',
      notes: 'Returns an array of line codes',
      tags: ['api']
    }
  });

  server.route({
    method: 'GET',
    path: '/prediction-summary/summary/{lineCode?}',
    config: {
      handler: predictionSummary.getPredictionSummary,
      description: 'Get a specific prediction summary',
      notes: 'Returns the prediction summary object based on the required lineCode',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().optional().allow(predictionSummary._tflPredictionSummary.getLines())
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'api'
};
