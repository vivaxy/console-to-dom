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
        this
            ._listenToConsole()
            ._listenToAjax()
            ._listenToError();
    }

    /**
     * override the original `console.log`
     * @returns {Logger}
     * @private
     */
    _listenToConsole() {
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

    /**
     * catch ajax
     * @returns {Logger}
     * @private
     */
    _listenToAjax() {
        let _this = this;
        let originalSend = XMLHttpRequest.prototype.send;
        let originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            this.method = method;
            this.url = url;
            this.async = async;
            this.user = user;
            this.password = password;
            originalOpen.apply(this, arguments);
        };
        XMLHttpRequest.prototype.send = function (body) {
            _this.emit('ajax', {
                method: this.method,
                url: this.url,
                async: this.async,
                user: this.user,
                password: this.password,
                responseHeaders: JSON.stringify(this.getAllResponseHeaders())
            });
            originalSend.call(this, body);
        };
        return this;
    }

    _listenToError() {
        window.addEventListener('error', (e)=> {
            this.emit('error', [e]);
        }, false);
    }
}

export default Logger;
