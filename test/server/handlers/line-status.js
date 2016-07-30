'user strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const Q = require('q');

const lab = exports.lab = Lab.script();

const lineStatus = require('../../../server/handlers/line-status');

lab.experiment('lineStatus', () => {
  lab.test('it should be an obejct', (done) => {
    expect(lineStatus).to.be.an('object');
    done();
  });

  lab.experiment('_tflLineStatus', () => {
    lab.test('it should be defined', (done) => {
      expect(lineStatus._tflLineStatus).to.be.a('object');
      done();
    });
  });

  lab.experiment('getLines', () => {
    lab.test('it should be defined', (done) => {
      expect(lineStatus.getLines).to.be.a('function');
      done();
    });
  });

  lab.experiment('getLineStatus', () => {
    lab.test('it should be defined', (done) => {
      expect(lineStatus.getLineStatus).to.be.a('function');
      done();
    });

    lab.test('it should return an error: try/catch', (done) => {

      const fakeErr = new Error('fake error');

      const getLineStatus = sinon.stub(lineStatus._tflLineStatus, 'getLineStatus', () => {
        throw fakeErr;
      });

      const request = {
        params: {},
        server: {
          log: sinon.spy()
        }
      };

      const reply = sinon.spy();

      lineStatus.getLineStatus(request, reply);

      sinon.assert.calledOnce(getLineStatus);
      sinon.assert.calledOnce(request.server.log);
      sinon.assert.calledWith(reply, fakeErr);

      getLineStatus.restore();

      done();
    });

    lab.test('it should return an error: raised', (done) => {

      const fakeErr = new Error('fake error');

      const getLineStatus = sinon.stub(lineStatus._tflLineStatus, 'getLineStatus', () => {
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
        sinon.assert.calledOnce(getLineStatus);
        sinon.assert.calledOnce(request.server.log);
        sinon.assert.calledWith(reply, fakeErr);

        getLineStatus.restore();

        done();
      });

      lineStatus.getLineStatus(request, reply);
    });

    lab.test('it should return an object', (done) => {
      const expected = {};

      const getLineStatus = sinon.stub(lineStatus._tflLineStatus, 'getLineStatus', () => {
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
        sinon.assert.calledOnce(getLineStatus);
        sinon.assert.notCalled(request.server.log);

        expect(res).to.eql(expected);

        getLineStatus.restore();

        done();
      });

      lineStatus.getLineStatus(request, reply);
    });
  });
});
