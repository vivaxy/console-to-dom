/**
 * @since 2015-09-17 18:01
 * @author vivaxy
 */
'use strict';
import logLevel from './log-level.js';
import EventEmitter from '../event-emitter/src/event-emitter.js';

class Logger extends EventEmitter {
    constructor() {
        super();
        this._override();
    }

    /**
     * override the original `console.log`
     * @returns {Logger}
     * @private
     */
    _override() {
        let originalConsole = window.console;
        logLevel.forEach((level)=> {
            let method = originalConsole[level.string];
            originalConsole[level.string] = (...args) => {
                method.apply(console, args);
                this.emit('data', level.level, args);
            };
        });
        return this;
    }
}

export default Logger;
