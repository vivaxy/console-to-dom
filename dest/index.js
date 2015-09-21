(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

var _logLevelJs = require('./log-level.js');

var _logLevelJs2 = _interopRequireDefault(_logLevelJs);

var ConsoleContainer = (function () {
    function ConsoleContainer() {
        _classCallCheck(this, ConsoleContainer);

        this.parent = document.body;
        this._initializeContainer()._initializeInner()._listenToTouch().setZIndex(this._getMaxZIndex())._listenToZIndexChange();
    }

    /**
     *
     * @returns {ConsoleContainer}
     * @private
     */

    _createClass(ConsoleContainer, [{
        key: '_initializeContainer',
        value: function _initializeContainer() {
            var width = window.innerWidth; // document.body.clientWidth;
            var height = window.innerHeight; // document.body.clientHeight;
            this.container = this._createElement({
                top: height * 50 / 100 + 'px',
                left: 0 + 'px',
                width: width + 'px',
                height: height * 50 / 100 + 'px',
                padding: width * 5 / 100 + 'px',
                //padding: width / 100 + 'px',
                //paddingTop: width * 10 / 100 + 'px',
                position: 'absolute',
                boxSizing: 'border-box',
                backgroundColor: '#888'
            });
            this.dragTop = this._createElement({
                top: 0 + 'px',
                left: 0 + 'px',
                width: width + 'px',
                height: width * 5 / 100 + 'px',
                position: 'absolute'
            });
            this.dragLeft = this._createElement({
                top: 0 + 'px',
                left: 0 + 'px',
                width: width * 5 / 100 + 'px',
                height: height * 50 / 100 + 'px',
                position: 'absolute'
            });
            this.dragRight = this._createElement({
                top: 0 + 'px',
                right: 0 + 'px',
                width: width * 5 / 100 + 'px',
                height: height * 50 / 100 + 'px',
                position: 'absolute'
            });
            this.dragBottom = this._createElement({
                bottom: 0 + 'px',
                left: 0 + 'px',
                width: width + 'px',
                height: width * 5 / 100 + 'px',
                position: 'absolute'
            });
            this.parent.appendChild(this.container);
            return this;
        }

        /**
         *
         * @returns {ConsoleContainer}
         * @private
         */
    }, {
        key: '_initializeInner',
        value: function _initializeInner() {
            this.inner = this._createElement({
                width: '100%',
                height: '100%',
                overflow: 'auto',
                fontSize: '12px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
            });
            this.container.appendChild(this.inner);
            return this;
        }

        /**
         * create element by type
         * @param style
         * @param type
         * @returns {Element}
         * @private
         */
    }, {
        key: '_createElement',
        value: function _createElement(style) {
            var type = arguments.length <= 1 || arguments[1] === undefined ? 'div' : arguments[1];

            var div = document.createElement(type);
            this._setStyle(div, style);
            return div;
        }

        /**
         * output log to console div
         * @param level
         * @param data
         * @returns {ConsoleContainer}
         */
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

        /**
         * get correspond color according to log level
         * @param level
         * @returns {string}
         * @private
         */
    }, {
        key: '_getColor',
        value: function _getColor(level) {
            var logLevelColorMap = _logLevelJs2['default'].map(function (level) {
                return level.color;
            });
            // rewrite `_getColor` for higher performance
            this._getColor = function (level) {
                return logLevelColorMap[level];
            };
            return this._getColor(level);
        }

        /**
         * set z-index to log container
         * @param index
         * @returns {ConsoleContainer}
         */
    }, {
        key: 'setZIndex',
        value: function setZIndex(index) {
            var currentZIndex = this._getZIndex(this.container);
            var maxZIndex = Math.max(index, currentZIndex - 1);
            this.container.style.zIndex = maxZIndex + 1;
            return this;
        }

        /**
         * get element z-index
         * @param ele
         * @returns {*}
         * @private
         */
    }, {
        key: '_getZIndex',
        value: function _getZIndex(ele) {
            return this._getInteger(ele.style.zIndex);
        }

        /**
         * get integer from style value
         * 0 => 0
         * 1 => 1
         * auto => 0
         * inherit => 0
         * @param value
         * @returns {Number|number}
         * @private
         */
    }, {
        key: '_getInteger',
        value: function _getInteger(value) {
            return parseInt(value) || 0;
        }

        /**
         * get max z-index of all elements
         * @returns {number}
         * @private
         */
    }, {
        key: '_getMaxZIndex',
        value: function _getMaxZIndex() {
            var _this2 = this;

            return Math.max.apply(Math, Array.prototype.map.call(document.querySelectorAll('*'), function (ele) {
                return ele === _this2.container ? 0 : _this2._getZIndex(ele);
            }));
        }

        /**
         * use `MutationObserver` to find element z-index change, to keep log container always on top
         * @returns {ConsoleContainer}
         * @private
         */
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

        /**
         * enable users to move log container
         * @returns {ConsoleContainer}
         * @private
         */
    }, {
        key: '_listenToTouch',
        value: function _listenToTouch() {
            var _this4 = this;

            var position = {};
            var container = this.container;
            ['top', 'left', 'right', 'bottom'].forEach(function (name) {
                var drag = _this4['drag' + name[0].toUpperCase() + name.slice(1)];
                //let container = this.container;
                //let inner = this.inner;
                //inner.addEventListener('touchmove', (e)=> {
                //    e.stopPropagation();
                //}, false);
                drag.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    position = _this4._getTouchPosition(e);
                }, false);
                drag.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var lastPosition = position;
                    position = _this4._getTouchPosition(e);
                    var top = _this4._getInteger(container.style.top);
                    var left = _this4._getInteger(container.style.left);
                    container.style.left = left + position.x - lastPosition.x + 'px';
                    container.style.top = top + position.y - lastPosition.y + 'px';
                }, false);
                drag.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
                container.appendChild(drag);
            });
            return this;
        }

        /**
         * get touch position according to window position
         * @param e
         * @returns {{x: (*|Number), y: (*|Number)}}
         * @private
         */
    }, {
        key: '_getTouchPosition',
        value: function _getTouchPosition(e) {
            var touch = e.changedTouches[0];
            return {
                //x: touch.pageX - e.target.offsetLeft,
                x: touch.pageX,
                //y: touch.pageY - e.target.offsetTop
                y: touch.pageY
            };
        }

        /**
         * set styles to element
         * @param ele
         * @param style
         * @private
         */
    }, {
        key: '_setStyle',
        value: function _setStyle(ele, style) {
            for (var key in style) {
                ele.style[key] = style[key];
            }
            return this;
        }
    }]);

    return ConsoleContainer;
})();

exports['default'] = ConsoleContainer;
module.exports = exports['default'];

},{"./log-level.js":4}],3:[function(require,module,exports){
/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loggerJs = require('./logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _consoleContainerJs = require('./console-container.js');

var _consoleContainerJs2 = _interopRequireDefault(_consoleContainerJs);

var logger = new _loggerJs2['default']();
var container = new _consoleContainerJs2['default']();

logger.on('data', function (level, data) {
  container.write(level, data);
});

},{"./console-container.js":2,"./logger.js":5}],4:[function(require,module,exports){
/**
 * @since 2015-09-20 14:47
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = [{
    level: 0,
    string: 'log', // verbose
    color: '#333' // gray
}, {
    level: 1,
    string: 'debug',
    color: '#3c3' // green
}, {
    level: 2,
    string: 'info',
    color: '#33c' // cyan
}, {
    level: 3,
    string: 'warn',
    color: '#cc3' // yellow
}, {
    level: 4,
    string: 'error',
    color: '#c33' // red
}];
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
/**
 * @since 2015-09-17 18:01
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _logLevelJs = require('./log-level.js');

var _logLevelJs2 = _interopRequireDefault(_logLevelJs);

var _eventEmitterSrcEventEmitterJs = require('../event-emitter/src/event-emitter.js');

var _eventEmitterSrcEventEmitterJs2 = _interopRequireDefault(_eventEmitterSrcEventEmitterJs);

var Logger = (function (_EventEmitter) {
    _inherits(Logger, _EventEmitter);

    function Logger() {
        _classCallCheck(this, Logger);

        _get(Object.getPrototypeOf(Logger.prototype), 'constructor', this).call(this);
        this._override();
    }

    /**
     * override the original `console.log`
     * @returns {Logger}
     * @private
     */

    _createClass(Logger, [{
        key: '_override',
        value: function _override() {
            var _this = this;

            var originalConsole = window.console;
            _logLevelJs2['default'].forEach(function (level) {
                var method = originalConsole[level.string];
                originalConsole[level.string] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    method.apply(console, args);
                    _this.emit('data', level.level, args);
                };
            });
            return this;
        }
    }]);

    return Logger;
})(_eventEmitterSrcEventEmitterJs2['default']);

exports['default'] = Logger;
module.exports = exports['default'];

},{"../event-emitter/src/event-emitter.js":1,"./log-level.js":4}]},{},[3]);
