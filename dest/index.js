/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @since 2015-09-17 15:40
	 * @author vivaxy
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _consoleContainer = __webpack_require__(6);

	var _consoleContainer2 = _interopRequireDefault(_consoleContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var consoleToDom = function consoleToDom() {
	    var style = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var logger = new _logger2.default();
	    var container = new _consoleContainer2.default(style);

	    logger.on('data', function (level, data) {
	        container.write(level, data);
	    }).on('ajax', function (data) {
	        container.write(1, [data.method, data.url]);
	    }).on('error', function (data) {
	        container.write(4, data);
	    });
	};

	exports.default = consoleToDom;

	window.consoleToDom = consoleToDom;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @since 2015-09-17 18:01
	 * @author vivaxy
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _logLevel = __webpack_require__(4);

	var _logLevel2 = _interopRequireDefault(_logLevel);

	var _eventEmitter = __webpack_require__(5);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Logger = (function (_EventEmitter) {
	    _inherits(Logger, _EventEmitter);

	    function Logger() {
	        _classCallCheck(this, Logger);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Logger).call(this));

	        _this2._listenToConsole()._listenToAjax()._listenToError();
	        return _this2;
	    }

	    /**
	     * override the original `console.log`
	     * @returns {Logger}
	     * @private
	     */

	    _createClass(Logger, [{
	        key: '_listenToConsole',
	        value: function _listenToConsole() {
	            var _this3 = this;

	            var originalConsole = window.console;
	            _logLevel2.default.forEach(function (level) {
	                var method = originalConsole[level.string];
	                originalConsole[level.string] = function () {
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }

	                    method.apply(console, args);
	                    _this3.emit('data', level.level, args);
	                };
	            });
	            return this;
	        }

	        /**
	         * catch ajax
	         * @returns {Logger}
	         * @private
	         */

	    }, {
	        key: '_listenToAjax',
	        value: function _listenToAjax() {
	            var _this = this;
	            var originalSend = XMLHttpRequest.prototype.send;
	            var originalOpen = XMLHttpRequest.prototype.open;
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
	    }, {
	        key: '_listenToError',
	        value: function _listenToError() {
	            var _this4 = this;

	            window.addEventListener('error', function (e) {
	                _this4.emit('error', [e]);
	            }, false);
	        }
	    }]);

	    return Logger;
	})(_eventEmitter2.default);

	exports.default = Logger;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * @since 2015-09-20 14:47
	 * @author vivaxy
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = [{
	    level: 0,
	    string: 'log', // verbose
	    color: '#333' // gray
	}, {
	    level: 1,
	    string: 'debug',
	    color: '#3cc' // green
	}, {
	    level: 2,
	    string: 'info',
	    color: '#38c' // cyan
	}, {
	    level: 3,
	    string: 'warn',
	    color: '#cc3' // yellow
	}, {
	    level: 4,
	    string: 'error',
	    color: '#c33' // red
	}];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * @since 15-09-02 10:25
	 * @author vivaxy
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	            var _this = this;
	            var callbacks = this.events[event];
	            var _arguments = arguments;
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

	exports.default = EventEmitter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @since 2015-09-17 17:51
	 * @author vivaxy
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _logLevel = __webpack_require__(4);

	var _logLevel2 = _interopRequireDefault(_logLevel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConsoleContainer = (function () {
	    function ConsoleContainer(style) {
	        _classCallCheck(this, ConsoleContainer);

	        this.parent = document.body || alert('`console to dom`: document has not body');
	        this.top = style.top;
	        this.left = style.left;
	        this.height = style.height;
	        this.width = style.width;
	        this.padding = style.padding;

	        if (this.top === undefined) {
	            this.top = 50;
	        }
	        if (this.left = undefined) {
	            this.left = 0;
	        }
	        if (this.height === undefined) {
	            this.height = 50;
	        }
	        if (this.width === undefined) {
	            this.width = 100;
	        }
	        if (this.padding === undefined) {
	            this.padding = 5;
	        }
	        this._initializeContainer();
	        this._initializeInner();
	        this._listenToTouch();
	        this.setZIndex(this._getMaxZIndex());
	        this._listenToZIndexChange();
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
	                top: height * this.top / 100 + 'px',
	                left: width * this.left / 100 + 'px',
	                width: width * this.width / 100 + 'px',
	                height: height * this.height / 100 + 'px',
	                padding: width * this.padding / 100 + 'px',
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
	        value: function write() {
	            var level = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var data = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            var code = this._createElement({
	                display: 'block',
	                whiteSpace: 'pre',
	                color: this._getColor(level),
	                backgroundImage: 'linear-gradient(180deg, #ccc, transparent 51%)',
	                backgroundSize: '100% 1px',
	                backgroundRepeat: 'no-repeat'
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
	                    case obj instanceof ErrorEvent:
	                        string = obj.error.stack;
	                        break;
	                    default:
	                        string = JSON.stringify(obj);
	                }
	                return string;
	            }).join(' ');
	            this.inner.appendChild(code);
	            // show to last line, instead of move last into view
	            //code.scrollIntoView(true);
	            this.inner.scrollTop = this.inner.scrollHeight;
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
	            var logLevelColorMap = _logLevel2.default.map(function (level) {
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

	exports.default = ConsoleContainer;

/***/ }
/******/ ]);