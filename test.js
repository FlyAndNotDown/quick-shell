let shell = require('./index');

shell.listen('echo', (params) => {
    console.log(params);
}).start();