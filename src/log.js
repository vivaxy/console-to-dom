/**
 * @since 2015-09-17 18:01
 * @author vivaxy
 */
'use strict';
import EventEmitter from './event-emitter';

class Log extends EventEmitter {
    constructor() {
        super();

        let log = (...args)=> {
            let code = document.createElement('code');
            code.textContent = Array.prototype.join.apply(args, ' ');
            container.appendChild(code);
        };
        let originalConsole = window.console;
        let methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];
        methodNameArray.forEach((name, index)=> {
            let method = originalConsole[name];
            originalConsole[name] = (...args) => {
                method.apply(console, args);
                this.emit('data', index, args);
            };
        });
    }
}

export default Log;
