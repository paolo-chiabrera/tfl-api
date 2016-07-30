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
      reply({ message: 'Welcome to the TFL Line Status API' });
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
    path: '/line-status/status',
    config: {
      handler: lineStatus.getLineStatus,
      description: 'Get all the lines status',
      notes: 'Returns an array with all the lines status',
      tags: ['api']
    }
  });

  server.route({
    method: 'GET',
    path: '/line-status/status/{lineCode}',
    config: {
      handler: lineStatus.getLineStatus,
      description: 'Get the lines status',
      notes: 'Returns the line status object for the required line',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().required().valid(lineStatus._tflLineStatus.getLines())
        }
      }
    }
  });

  // prediction-summary

  server.route({
    method: 'GET',
    path: '/prediction-summary',
    handler: function (request, reply) {
      reply({ message: 'Welcome to the TFL Prediction Summary API' });
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
    path: '/prediction-summary/summary',
    config: {
      handler: predictionSummary.getPredictionSummary,
      description: 'Get all the prediction summary',
      notes: 'Returns an array with all the prediction summaries',
      tags: ['api']
    }
  });

  server.route({
    method: 'GET',
    path: '/prediction-summary/summary/{lineCode}',
    config: {
      handler: predictionSummary.getPredictionSummary,
      description: 'Get a prediction summary',
      notes: 'Returns an object with the specific prediction summary',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().required().valid(predictionSummary._tflPredictionSummary.getLines())
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'api'
};
