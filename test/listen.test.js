let expect = require('chai').expect;
let { Listen } = require('../lib/listen');

// unit test of /lib/main.js
describe('main.js', () => {

    // test of class Listen
    describe('class Listen', () => {

        // test of constructor
        describe('constructor()', function () {

            // target
            it('it should return a Listen instance', () => {

                // create a new instance of Listen
                let listen = new Listen('echo', (params) => {
                    return params;
                });

                // check it is instance of Listen
                expect(listen).to.be.an.instanceOf(Listen);

            })

        });

        // unit test of exec()
        describe('exec()', () => {

            // target
            it('should return a \'hello world\' string', () => {

                // create a new instance of Listen
                let listen = new Listen('echo', (params) => {
                    return params;
                });

                // check if the exec worked
                expect(listen.exec('hello world')).to.equal('hello world');

            });

        });

    });

});