// imports
let { Listen } = require('./listen');
let rl = require('readline');

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
        this.__welcome = null;

        // set the default error info
        this.__error = {
            inputNothing: '[error] you input nothing',
            noMatchedInstruction: '[error] no matched instruction'
        };

        // some event
        this.__onStart = null;
        this.__onEnd = null;
        this.__onCaught = null;
        this.__onLine = null;

    }

    /**
     * onStart event
     * @param {function} handler - on start event happened, the handler will be called
     * @returns {Shell} - class itself
     */
    onStart(handler) {

        // set the event
        this.__onStart = handler;

        // link style
        return this;

    }

    /**
     * onEnd event
     * @param {function} handler - on end event happened, the handler will be called
     * @returns {Shell} - class itself
     */
    onEnd(handler) {

        // set the event
        this.__onEnd = handler;

        // link style
        return this;

    }

    /**
     * onCaught event
     * @param {function} handler - on caught event happened, the handler will be called
     * @returns {Shell} - class itself
     */
    onCaught(handler) {

        // set the event
        this.__onCaught = handler;

        // link style
        return this;

    }

    /**
     * onLine event
     * @param {function} handler - on line event happened, the handler will be called
     * @returns {Shell} - class itself
     */
    onLine(handler) {

        //set the event
        this.__onLine = handler;

        // link style
        return this;

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
     * set error info
     * @param {JSON} err - the err info you want to rewrite
     * @returns {Shell} - class itself
     */
    error(err) {

        // set the error info
        if (err.inputNothing) {
            this.__error.inputNothing = err.inputNothing
        }
        if (err.noMatchedInstruction) {
            this.__error.noMatchedInstruction = err.noMatchedInstruction
        }

        // link style, for the link call
        return this;

    }

    /**
     * start the process of shell
     */
    start() {

        // call the on start event
        if (this.__onStart) this.__onStart();

        // output the welcome text
        if (this.__welcome) console.log(this.__welcome);

        // output the prompt text
        process.stdout.write(this.__prompt + ' ');

        // create a readLine interface
        let face = rl.createInterface({
            input: process.stdin
        });

        // on a new line reach
        face.on('line', (line) => {
            // call the on line event
            if (this.__onLine) this.__onLine(line);

            // main judge
            if (!line || line === '') {
                // if line is empty
                // output the error info
                console.log(this.__error.inputNothing);
            } else {
                // if line is not empty
                // split the line
                let strings = line.split(' ');
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
                    // call the on end event
                    if (this.__onEnd) this.onEnd();

                    // exit the program
                    process.exit(0);
                }

                // define a var to log if there is instruction was caught
                let find = false;

                // judge if the instruction was caught by listens
                for (let i = 0; i < this.__listens.length; i++) {
                    if (instruction === this.__listens[i].instruction) {
                        // if it was caught
                        // call the on caught event
                        if (this.__onCaught) this.__onCaught(params);

                        // do the handler
                        this.__listens[i].handler(params);

                        // change the find flag
                        find = true;

                        // break out to the main loop
                        break;
                    }
                }

                // if there is no instruction was caught, output a error log
                if (!find) {
                    console.log(this.__error.noMatchedInstruction);
                }
            }

            // output the prompt text
            process.stdout.write(this.__prompt + ' ');
        });

    }

}

// export the class
module.exports.Shell = Shell;