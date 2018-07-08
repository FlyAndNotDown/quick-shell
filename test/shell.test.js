let expect = require('chai').expect;
let { Shell } = require('../lib/shell');

// unit test of ./lib/shell.js
describe('shell.js', () => {

    // test of class Shell
    describe('class Shell', () => {

        // test of constructor
        describe('constructor()', () => {

            // target
            it('should return a instance of shell', () => {

                // create a new instance of Shell
                let shell = new Shell();

                // check if it is a instance of shell
                expect(shell).to.be.an.instanceOf(Shell);

            });

        });

        // test of __find_listen()
        describe('__find_listen()', () => {

            // target
            it('simple usage', () => {

                // create a instance of Shell
                let shell = new Shell();

                // test if the list is empty, if the function will return -1
                expect(shell.__find_listen('echo')).to.equal(-1);

                // add a new listen to the list
                shell.listen('echo', (params) => {
                    return params;
                });

                // test if it return 0 when it has just one element
                expect(shell.__find_listen('echo')).to.equal(0);

                // continue add listen
                shell.listen('ls', () => {});

                // continue test
                expect(shell.__find_listen('echo')).to.equal(0);
                expect(shell.__find_listen('ls')).to.equal(1);

            })

        });

        // test of listen()
        describe('listen()', () => {

            // target
            it('should create a new Listen obj inside class', () => {

                // create a new instance of Shell
                let shell = new Shell();

                // add a new listen
                shell.listen('echo', (params) => {
                    return params;
                });

                // check if the Listen has been save to the list
                expect(shell.__listens.length).to.be.equal(1);
                expect(shell.__listens[0].exec('hello world')).to.equal('hello world');

            });

            // target
            it('should return class itself', () => {

                // create a new instance of Shell
                let shell = new Shell();

                // add a new listen, and check if it is the instance of Shell
                expect(shell.listen('echo', (params) => {
                    return params;
                })).to.be.an.instanceOf(Shell);

            })

        })

    });

});