'use strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const Manifest = require('../manifest');


const lab = exports.lab = Lab.script();


lab.experiment('Manifest', () => {

  lab.test('it gets manifest data', (done) => {

    expect(Manifest.get('/')).to.be.an('object');
    done();
  });


  lab.test('it gets manifest meta data', (done) => {

    expect(Manifest.meta('/')).to.match(/this file defines the plot device/i);
    done();
  });
});
