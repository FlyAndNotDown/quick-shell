let expect = require('chai').expect;
let { Shell } = require('../lib/shell');

// unit test of ./lib/shell.js
describe('shell.js', () => {

    // test of class Shell
    describe('class Shell', () => {

        // test of constructor
        describe('constructor()', () => {

            it('should return a instance of shell', () => {

                // create a new instance of Shell
                let shell = new Shell();

                // check if it is a instance of shell
                expect(shell).to.be.an.instanceOf(Shell);

            });

        });

    });

});