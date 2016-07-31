'use strict';

const Joi = require('joi');

const lineStatus = require('../handlers/line-status');
const predictionSummary = require('../handlers/prediction-summary');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply({ message: 'Welcome to the TFL API' });
      },
      cache: {
        expiresIn: 3600 * 1000,
        privacy: 'public'
      }
    }    
  });

  // line-status

  server.route({
    method: 'GET',
    path: '/line-status',
    config: {
      handler: lineStatus.getLineStatus,
      description: 'Get all the line statuses',
      notes: 'Returns an array with all the lines status',
      tags: ['api'],
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/line-status/lines',
    config: {
      handler: lineStatus.getLines,
      description: 'Get the available line codes',
      notes: 'Returns an array of line codes',
      tags: ['api'],
      cache: {
        expiresIn: 3600 * 1000,
        privacy: 'private'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/line-status/lines/{lineCode}',
    config: {
      handler: lineStatus.getLineStatus,
      description: 'Get a specific lines status, based on the lineCode',
      notes: 'Returns the line status object for the required line',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().required().valid(lineStatus._tflLineStatus.getLines())
        }
      },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });

  // prediction-summary

  server.route({
    method: 'GET',
    path: '/prediction-summary',
    config: {
      handler: predictionSummary.getPredictionSummary,
      description: 'Get all the prediction summaries',
      notes: 'Returns an array with all the prediction summaries',
      tags: ['api'],
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/prediction-summary/lines',
    config: {
      handler: predictionSummary.getLines,
      description: 'Get the available line codes',
      notes: 'Returns an array of line codes',
      tags: ['api'],
      cache: {
        expiresIn: 3600 * 1000,
        privacy: 'private'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/prediction-summary/lines/{lineCode}',
    config: {
      handler: predictionSummary.getPredictionSummary,
      description: 'Get a specific prediction summary, based on the lineCode',
      notes: 'Returns an object with the specific prediction summary',
      tags: ['api'],
      validate: {
        params: {
          lineCode: Joi.string().required().valid(predictionSummary._tflPredictionSummary.getLines())
        }
      },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'api'
};
