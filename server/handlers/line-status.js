'user strict';

const Boom = require('boom');

const TflLineStatus = require('tfl-line-status');
const tflLineStatus = new TflLineStatus();

// methods

function getLines (request, reply) {
  reply(tflLineStatus.getLines());
}

function getLineStatus (request, reply) {
  try {
    tflLineStatus.getLineStatus(request.params.lineCode)
      .then(status => reply(status), err => {
        request.server.log(['error', 'tflLineStatus.getStatus', err]);
        reply(Boom.badImplementation('A bad error occurred', err));
      });
  } catch (e) {
    request.server.log(['error', 'tflLineStatus.getStatus', e]);
    reply(Boom.badImplementation('A bad error occurred', e));
  }
}

// exports

module.exports = {
  getLines,
  getLineStatus,
  _tflLineStatus: tflLineStatus
};
