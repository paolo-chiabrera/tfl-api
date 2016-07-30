'use strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const Config = require('../config');


const lab = exports.lab = Lab.script();


lab.experiment('Config', () => {

    lab.test('it gets config data', (done) => {

        expect(Config.get('/')).to.be.an('object');
        done();
    });


    lab.test('it gets config meta data', (done) => {

        expect(Config.meta('/')).to.match(/this file configures the plot device/i);
        done();
    });
});
