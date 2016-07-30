'use strict';

const Lab = require('lab');
const chai = require('chai');
const expect = chai.expect;
const Composer = require('../index');


const lab = exports.lab = Lab.script();


lab.experiment('App', () => {

    lab.test('it composes a server', (done) => {

        Composer((err, composedServer) => {

            expect(composedServer).to.be.an('object');
            done(err);
        });
    });
});
