/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _setStyleJs = require('./set-style.js');

var _setStyleJs2 = _interopRequireDefault(_setStyleJs);

var container = document.createElement('div');
var inner = document.createElement('div');

var log = function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var code = document.createElement('code');
    code.textContent = Array.prototype.join.apply(args, ' ');
    container.appendChild(code);
};

var originalConsole = window.console;
var methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];
methodNameArray.forEach(function (name) {
    var method = originalConsole[name];
    originalConsole[name] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        method.call(console, args);
    };
});

(0, _setStyleJs2['default'])(inner, {
    height: '100%',
    backgroundColor: '#fff'
});
container.appendChild(inner);

(0, _setStyleJs2['default'])(container, {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '50%',
    padding: '2%',
    backgroundColor: '#999'
});
document.body.appendChild(container);