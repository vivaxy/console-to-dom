(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 2015-09-17 17:51
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _setStyleJs = require('./set-style.js');

var _setStyleJs2 = _interopRequireDefault(_setStyleJs);

var ConsoleContainer = (function () {
    function ConsoleContainer() {
        _classCallCheck(this, ConsoleContainer);

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        this.parent = document.body;
        this.inner = this._createElement({
            width: '100%',
            height: '100%',
            overflow: 'auto',
            fontSize: '12px',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        });
        this.container = this._createElement({
            top: height * 50 / 100 + 'px',
            left: 0,
            width: width + 'px',
            height: height * 50 / 100 + 'px',
            padding: width / 100 + 'px',
            paddingTop: width * 10 / 100 + 'px',
            position: 'absolute',
            boxSizing: 'border-box',
            backgroundColor: '#888'
        });
        this.container.appendChild(this.inner);
        this.parent.appendChild(this.container);
        this.setZIndex(this._getMaxZIndex());
        this._listenToZIndexChange();
        this._listenToTouch();
    }

    _createClass(ConsoleContainer, [{
        key: '_createElement',
        value: function _createElement(style) {
            var type = arguments.length <= 1 || arguments[1] === undefined ? 'div' : arguments[1];

            var div = document.createElement(type);
            (0, _setStyleJs2['default'])(div, style);
            return div;
        }
    }, {
        key: 'write',
        value: function write(level, data) {
            var code = this._createElement({
                display: 'block',
                //whiteSpace: 'pre-wrap',
                whiteSpace: 'nowrap',
                color: this._getColor(level)
            }, 'code');
            code.textContent = Array.prototype.map.call(data, function (obj) {
                var string = '';
                switch (true) {
                    case obj instanceof Date:
                    case obj instanceof Function:
                        string = obj.toString();
                        break;
                    case typeof obj === 'string':
                        string = obj;
                        break;
                    case typeof obj === 'undefined':
                        string = 'undefined';
                        break;
                    default:
                        string = JSON.stringify(obj);
                }
                return string;
            }).join(' ');
            this.inner.appendChild(code);
            code.scrollIntoView(true);
            return this;
        }
    }, {
        key: '_getColor',
        value: function _getColor(level) {
            var colorMap = ['#333', '#3c3', '#33c', '#cc3', '#c33'];
            return colorMap[level];
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(index) {
            var currentZIndex = this._getZIndex(this.container);
            var maxZIndex = Math.max(index, currentZIndex - 1);
            this.container.style.zIndex = maxZIndex + 1;
            return this;
        }
    }, {
        key: '_getZIndex',
        value: function _getZIndex(ele) {
            return this._getInteger(ele.style.zIndex);
        }
    }, {
        key: '_getInteger',
        value: function _getInteger(value) {
            return parseInt(value) || 0;
        }
    }, {
        key: '_getMaxZIndex',
        value: function _getMaxZIndex() {
            var _this2 = this;

            return Math.max.apply(Math, Array.prototype.map.call(document.querySelectorAll('*'), function (ele) {
                return ele === _this2.container ? 0 : _this2._getZIndex(ele);
            }));
        }
    }, {
        key: '_listenToZIndexChange',
        value: function _listenToZIndexChange() {
            var _this3 = this;

            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            if (MutationObserver) {
                (function () {
                    var _this = _this3;
                    var observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            if (mutation.target !== _this.container && mutation.attributeName === 'style') {
                                _this.setZIndex(_this._getZIndex(mutation.target));
                            }
                        });
                    });
                    var config = {
                        attributes: true,
                        subtree: true
                    };
                    observer.observe(document, config);
                    //observer.disconnect();
                })();
            }
            return this;
        }
    }, {
        key: '_listenToTouch',
        value: function _listenToTouch() {
            var _this4 = this;

            var position = {};
            var container = this.container;
            var inner = this.inner;
            inner.addEventListener('touchmove', function (e) {
                //e.stopPropagation();
            }, false);
            container.addEventListener('touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                position = _this4._getTouchPosition(e);
            }, false);
            container.addEventListener('touchmove', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var lastPosition = position;
                position = _this4._getTouchPosition(e);
                var top = _this4._getInteger(container.style.top);
                var left = _this4._getInteger(container.style.left);
                container.style.left = left + position.x - lastPosition.x + 'px';
                container.style.top = top + position.y - lastPosition.y + 'px';
            }, false);
            container.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        }
    }, {
        key: '_getTouchPosition',
        value: function _getTouchPosition(e) {
            var touch = e.changedTouches[0];
            return {
                x: touch.pageX - e.target.offsetLeft,
                y: touch.pageY - e.target.offsetTop
            };
        }
    }]);

    return ConsoleContainer;
})();

exports['default'] = ConsoleContainer;
module.exports = exports['default'];
},{"./set-style.js":5}],2:[function(require,module,exports){
/**
 * @since 15-09-02 10:25
 * @author vivaxy
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventEmitter = (function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.events = {};
    }

    /**
     *
     * @param event
     * @param callback
     * @returns {EventEmitter}
     */

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
            return this;
        }

        /**
         *
         * @param event
         * @returns {EventEmitter}
         */
    }, {
        key: 'emit',
        value: function emit(event) {
            var callbacks = this.events[event],
                _this = this,
                _arguments = arguments;
            if (callbacks) {
                callbacks.forEach(function (callback) {
                    callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
                });
            }
            return this;
        }

        /**
         *
         * @param event
         * @param callback
         * @returns {EventEmitter}
         */
    }, {
        key: 'off',
        value: function off(event, callback) {
            if (this.events[event] && callback) {
                this.events[event].splice(this.events[event].indexOf(callback), 1);
            } else {
                this.events[event] = [];
            }
            return this;
        }
    }]);

    return EventEmitter;
})();

exports['default'] = EventEmitter;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logJs = require('./log.js');

var _logJs2 = _interopRequireDefault(_logJs);

var _consoleContainerJs = require('./console-container.js');

var _consoleContainerJs2 = _interopRequireDefault(_consoleContainerJs);

var log = new _logJs2['default']();
var container = new _consoleContainerJs2['default']();

log.on('data', function (level, data) {
  container.write(level, data);
});
},{"./console-container.js":1,"./log.js":4}],4:[function(require,module,exports){
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
},{"./event-emitter":2}],5:[function(require,module,exports){
/**
 * @since 2015-09-17 17:32
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (ele, style) {
    for (var key in style) {
        ele.style[key] = style[key];
    }
};

module.exports = exports['default'];
},{}]},{},[3]);
