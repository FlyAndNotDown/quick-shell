// imports
let { Listen } = require('./listen');
let fs = require('fs');

/**
 * the main class of shell application
 * @author: John Kindem
 */
class Shell {

    /**
     * constructor
     */
    constructor() {

        // private, the list of Listen, to save the listens info
        this.__listens = [];

        // set the default prompt
        this.__prompt = '$';

        // set the default welcome info
        this.__welcome = '';

        // set the default error info
        this.__error = {
            inputNothing: '[error] you input nothing'
        };

    }

    /**
     * to find a listen in the list, and return its index
     * @param {string} instruction - the instruction you want to find
     * @returns {number} - the index of listen, if not find, return -1
     * @private
     */
    __findListen(instruction) {

        // find the same name in the list
        for (let i = 0; i < this.__listens.length; i++) {
            if (this.__listens[i].instruction === instruction) {
                return i;
            }
        }

        // if not find, return -1
        return -1;

    }

    /**
     * to create a listen, when instruction was caught, the handler will be called
     * @param {string} instruction - the instruction you want to caught
     * @param {function} handler - the handler
     * @returns {Shell} class itself
     */
    listen(instruction, handler) {

        // create a new instance of Listen, and save it to the list
        // find it first
        let index = this.__findListen(instruction);
        if (index >= 0) {
            // if find it, modify it to save new handler
            this.__listens[index].instruction = instruction;
            this.__listens[index].handler = handler;
        } else {
            // if not find, create a new instance and save it
            this.__listens.push(new Listen(instruction, handler));
        }

        // link style, return this to make link call available
        return this;

    }

    /**
     * set prompt of shell
     * @param {string} text - the prompt text you want to set
     * @returns {Shell} - class itself
     */
    prompt(text) {

        // set the prompt
        this.__prompt = text;

        // link style, return this to make link call available
        return this;

    }

    /**
     * set welcome text of shell
     * @param {string} text - the welcome text you want to set
     * @returns {Shell} - class itself
     */
    welcome(text) {

        // set the welcome text
        this.__welcome = text;

        // link style, return this to make link call available
        return this;

    }

    /**
     * read line from stdin, return the result
     * @returns {string} - line
     */
    static readLine() {

        // set a buffer
        let buffer = '';

        // read line from stdin, and save the result to the buffer
        process.stdin.pause();
        buffer = fs.readSync(process.stdin.fd, 1000, 0, 'utf8')[0].trim();
        process.stdin.resume();

        // return the buffer
        return buffer;

    }

    error(err) {

        // set the error info
        if (err.inputNothing) {
            this.__error.inputNothing = err.inputNothing
        }
        // TODO

        // link style, for the link call
        return this;

    }

    /**
     * start the process of shell
     */
    start() {

        // output the welcome text
        console.stdout.write(this.__welcome);

        // main loop
        while (true) {

            // output the prompt text
            console.log(this.__prompt);

            // read line from console
            let buffer = this.readLine();

            // main judge
            if (!buffer || buffer === '') {
                // if buffer is empty
                // output the error info
                console.log(this.__error.inputNothing);
            } else {
                // if buffer is not empty
                // split the buffer
                let strings = buffer.split(' ');
                let instruction = strings[0];

                // do the refactor to get the params
                let params = '';
                for (let i = 0, j = 0; i < strings.length; i++) {
                    if (i !== 0) {
                        params += j === 0 ? strings[i] : ` ${strings[i]}`;
                        j++;
                    }
                }

                // judge if the instruction is exit
                if (instruction === 'exit') {
                    break;
                }

                // judge if the instruction was caught by listens
                for (let i = 0; i < this.__listens.length; i++) {
                    if (instruction === this.__listens[i].instruction) {
                        // if it was caught
                        // pause the stdout
                        process.stdout.pause();
                        // do the handler
                        this.__listens[i].handler(params);
                        // resume the stdout
                        process.stdout.resume();
                        break;
                    }
                }
            }

        }

    }

}

// export the class
module.exports.Shell = Shell;