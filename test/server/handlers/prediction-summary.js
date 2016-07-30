'user strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const Q = require('q');

const lab = exports.lab = Lab.script();

const predictionSummary = require('../../../server/handlers/prediction-summary');

lab.experiment('predictionSummary', () => {
  lab.test('it should be an obejct', (done) => {
    expect(predictionSummary).to.be.an('object');
    done();
  });

  lab.experiment('_tflPredictionSummary', () => {
    lab.test('it should be defined', (done) => {
      expect(predictionSummary._tflPredictionSummary).to.be.a('object');
      done();
    });
  });

  lab.experiment('getLines', () => {
    lab.test('it should be defined', (done) => {
      expect(predictionSummary.getLines).to.be.a('function');
      done();
    });

    lab.test('it should return all the line codes', (done) => {
      predictionSummary.getLines({}, (res) => {
        expect(res).to.eql(predictionSummary._tflPredictionSummary.getLines());
        done();
      });
    });
  });

  lab.experiment('getPredictionSummary', () => {
    lab.test('it should be defined', (done) => {
      expect(predictionSummary.getPredictionSummary).to.be.a('function');
      done();
    });

    lab.test('it should return an error: try/catch', (done) => {

      const fakeErr = new Error('fake error');

      const getPredictionSummary = sinon.stub(predictionSummary._tflPredictionSummary, 'getPredictionSummary', () => {
        throw fakeErr;
      });

      const request = {
        params: {},
        server: {
          log: sinon.spy()
        }
      };

      const reply = sinon.spy();

      predictionSummary.getPredictionSummary(request, reply);

      sinon.assert.calledOnce(getPredictionSummary);
      sinon.assert.calledOnce(request.server.log);
      sinon.assert.calledWith(reply, fakeErr);

      getPredictionSummary.restore();

      done();
    });

    lab.test('it should return an error: raised', (done) => {

      const fakeErr = new Error('fake error');

      const getPredictionSummary = sinon.stub(predictionSummary._tflPredictionSummary, 'getPredictionSummary', () => {
        const deferred = Q.defer();

        setTimeout(function () {
          deferred.reject(fakeErr);
        }, 10);

        return deferred.promise;
      });

      const request = {
        params: {},
        server: {
          log: sinon.spy()
        }
      };

      const reply = sinon.spy(() => {
        sinon.assert.calledOnce(getPredictionSummary);
        sinon.assert.calledOnce(request.server.log);
        sinon.assert.calledWith(reply, fakeErr);

        getPredictionSummary.restore();

        done();
      });

      predictionSummary.getPredictionSummary(request, reply);
    });

    lab.test('it should return an object', (done) => {
      const expected = {};

      const getPredictionSummary = sinon.stub(predictionSummary._tflPredictionSummary, 'getPredictionSummary', () => {
        const deferred = Q.defer();

        setTimeout(function () {
          deferred.resolve(expected);
        }, 10);

        return deferred.promise;
      });

      const request = {
        params: {},
        server: {
          log: sinon.spy()
        }
      };

      const reply = sinon.spy((res) => {
        sinon.assert.calledOnce(getPredictionSummary);
        sinon.assert.notCalled(request.server.log);

        expect(res).to.eql(expected);

        getPredictionSummary.restore();

        done();
      });

      predictionSummary.getPredictionSummary(request, reply);
    });
  });
});
