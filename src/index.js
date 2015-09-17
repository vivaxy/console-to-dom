/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';
import setStyle from './set-style.js';

let container = document.createElement('div');
let inner = document.createElement('div');

let log = (...args)=> {
    let code = document.createElement('code');
    code.textContent = Array.prototype.join.apply(args, ' ');
    container.appendChild(code);
};

let originalConsole = window.console;
let methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];
methodNameArray.forEach((name)=> {
    let method = originalConsole[name];
    originalConsole[name] = (...args) => {
        method.call(console, args);
    };
});

setStyle(inner, {
    height: '100%',
    backgroundColor: '#fff'
});
container.appendChild(inner);

setStyle(container, {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '50%',
    padding: '2%',
    backgroundColor: '#999'
});
document.body.appendChild(container);
