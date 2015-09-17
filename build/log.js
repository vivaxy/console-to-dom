/**
 * @since 2015-09-17 18:01
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _eventEmitter = require('./event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var Log = (function (_EventEmitter) {
    _inherits(Log, _EventEmitter);

    function Log() {
        var _this = this;

        _classCallCheck(this, Log);

        _get(Object.getPrototypeOf(Log.prototype), 'constructor', this).call(this);

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
        methodNameArray.forEach(function (name, index) {
            var method = originalConsole[name];
            originalConsole[name] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                method.apply(console, args);
                _this.emit('data', index, args);
            };
        });
    }

    return Log;
})(_eventEmitter2['default']);

exports['default'] = Log;
module.exports = exports['default'];