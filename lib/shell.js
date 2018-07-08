// imports
let { Listen } = require('./listen');

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

    }

    /**
     * to find a listen in the list, and return its index
     * @param {string} instruction - the instruction you want to find
     * @returns {number} - the index of listen, if not find, return -1
     * @private
     */
    __find_listen(instruction) {

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
        let index = this.__find_listen(instruction);
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
     * pro
     */

}

// export the class
module.exports.Shell = Shell;