/**
 * A class to save the listen info
 * @author - John Kindem
 */
class Listen {
    /**
     * the constructor of Listen class
     * @param {string} instruction - a string, to identified what instruction you want to listen
     * @param {function} handler - a function, when a instruction is listened, the function will be call
     */
    constructor(instruction, handler) {

        // save the params to the class
        this.instruction = instruction;
        this.handler = handler;

    };

}

// export the Listen class
module.exports.Listen = Listen;
