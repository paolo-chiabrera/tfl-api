'user strict';

const Boom = require('Boom');

const TflPredictionSummary = require('tfl-prediction-summary');
const tflPredictionSummary = new TflPredictionSummary();

// methods

function getLines (request, reply) {
  reply(tflPredictionSummary.getLines());
}

function getPredictionSummary (request, reply) {
  try {
    tflPredictionSummary.getPredictionSummary(request.params.lineCode)
      .then(status => reply(status), err => {
        request.server.log(['error', 'tflPredictionSummary.getPredictionSummary', err]);
        reply(Boom.badImplementation('A bad error occurred', err));
      });
  } catch (e) {
    request.server.log(['error', 'tflPredictionSummary.getPredictionSummary', e]);
    reply(Boom.badImplementation('A bad error occurred', e));
  }
}

// exports

module.exports = {
  getLines,
  getPredictionSummary,
  _tflPredictionSummary: tflPredictionSummary
};
