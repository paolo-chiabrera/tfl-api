'use strict';

const Composer = require('./index');


Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        server.log(['info', 'Started the plot device on port ' + server.info.port]);
    });
});
