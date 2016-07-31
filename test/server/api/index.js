'use strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const Config = require('../../../config');
const Hapi = require('hapi');
const IndexPlugin = require('../../../server/api/index');

const TflLineStatus = require('tfl-line-status');
const tflLineStatus = new TflLineStatus();

const TflPredictionSummary = require('tfl-prediction-summary');
const tflPredictionSummary = new TflPredictionSummary();

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {

  const plugins = [IndexPlugin];
  server = new Hapi.Server();
  server.connection({ port: Config.get('/port/api') });
  server.register(plugins, (err) => {

    if (err) {
      return done(err);
    }

    done();
  });
});


lab.experiment('Index Plugin', () => {

  // index

  lab.test('it returns the default message', (done) => {
    const request = {
      method: 'GET',
      url: '/'
    };

    server.inject(request, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.message).to.match(/Welcome to the TFL API/i);

      done();
    });
  });

  // line-status

  lab.test('it returns the lines', (done) => {
    const request = {
      method: 'GET',
      url: '/line-status/lines'
    };

    server.inject(request, (response) => {
      const lines = tflLineStatus.getLines();

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.eql(lines);

      done();
    });
  });

  lab.test('it returns the routes', (done) => {
    const request = {
      method: 'GET',
      url: '/line-status'
    };

    server.inject(request, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.an('array');

      done();
    });
  });

  lab.test('it returns a specific line status object', (done) => {
    const request = {
      method: 'GET',
      url: '/line-status/lines/B'
    };

    server.inject(request, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.an('object');

      done();
    });
  });

  // prediction-summary

  lab.test('it returns the lines', (done) => {
    const request = {
      method: 'GET',
      url: '/prediction-summary/lines'
    };

    server.inject(request, (response) => {
      const lines = tflPredictionSummary.getLines();

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.eql(lines);

      done();
    });
  });

  // lab.test('it returns the routes', (done) => {
  //   const request = {
  //     method: 'GET',
  //     url: '/prediction-summary'
  //   };
  //
  //   server.inject(request, (response) => {
  //     expect(response.statusCode).to.equal(200);
  //     expect(response.result).to.be.an('array');
  //
  //     done();
  //   });
  // });

  lab.test('it returns a specific line summary object', (done) => {
    const request = {
      method: 'GET',
      url: '/prediction-summary/lines/W'
    };

    server.inject(request, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.an('object');

      done();
    });
  });
});
