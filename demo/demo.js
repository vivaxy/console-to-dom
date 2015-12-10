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
	 * @since 2015-09-17 15:43
	 * @author vivaxy
	 */
	'use strict';

	var _ajax = __webpack_require__(1);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];

	var dateFormat = function dateFormat(date) {
	    var pad = function pad(number, length) {
	        var numberString = number.toString();
	        while (numberString.length < length) {
	            numberString = '0' + numberString;
	        }
	        return numberString;
	    };
	    var timezoneOffset = date.getTimezoneOffset();
	    return date.getFullYear() + '-' + pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2) + ' ' + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' + pad(date.getSeconds(), 2) + '.' + pad(date.getMilliseconds(), 3) + ' ' + (timezoneOffset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(timezoneOffset) / 60) * 100 + Math.abs(timezoneOffset) % 60, 4);
	};

	methodNameArray.forEach(function (name) {
	    console[name].call(console, true, 0, 'name', undefined, null, [1, 2, 3], {
	        test: 4
	    }, new Date(), function (variable) {
	        return variable++;
	    });
	});

	setTimeout(function () {
	    console.log(dateFormat(new Date()));
	}, 1000);

	setTimeout(function () {
	    console.log(dateFormat(new Date()));
	}, 1000);

	var ajax = new _ajax2.default({
	    url: 'data.json'
	}).on('success', function (data) {
	    console.log(JSON.parse(data));
	}).on('readystatechange', function (data) {
	    console.log(data);
	}).send('name=jack&date=2015-04-03');

	ajax.send({
	    'name': 'jones',
	    'data': '20150403'
	});

	ajax.send({
	    'first': {
	        'function': function _function() {
	            return 0;
	        },
	        'another': function another(value) {
	            console.log(value);
	        }
	    },
	    'second': function second(value) {
	        console.log(value);
	    }
	});

	ajax.send();

	JSON.parse('test-error');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @since 15-09-02 11:37
	 * @author vivaxy
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _eventEmitter = __webpack_require__(2);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Ajax = (function (_EventEmitter) {
	    _inherits(Ajax, _EventEmitter);

	    function Ajax(options) {
	        _classCallCheck(this, Ajax);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ajax).call(this, arguments));

	        _this2.url = options.url;
	        _this2.type = options.type;
	        _this2.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
	        return _this2;
	    }

	    _createClass(Ajax, [{
	        key: 'send',
	        value: function send(data) {
	            var _this = this;
	            this.xhr = new XMLHttpRequest();
	            this.xhr.addEventListener('readystatechange', function () {
	                /**
	                 0    UNSENT    open() has not been called yet.
	                 1    OPENED    send() has not been called yet.
	                 2    HEADERS_RECEIVED    send() has been called, and headers and status are available.
	                 3    LOADING    Downloading; responseText holds partial data.
	                 4    DONE
	                 */
	                if (_this.xhr.readyState === XMLHttpRequest.DONE) {
	                    if (_this.xhr.status >= 200 && _this.xhr.status < 300 || _this.xhr.status === 304) {
	                        // 2** is valid response status, and 304 means get from the cache
	                        // _this.xhr.responseType
	                        _this.emit('success', _this.xhr.responseText, _this.xhr);
	                    } else {
	                        _this.emit('error', _this.xhr);
	                    }
	                }
	            });
	            if (this.type && this.type.toUpperCase() === 'POST') {
	                this.xhr.open('POST', this.url, true);
	                this.xhr.setRequestHeader('Content-Type', this.contentType);
	                this.xhr.send(this._getQueryString(data));
	            } else {
	                var a = document.createElement('a');
	                a.href = this.url;
	                var search = '';
	                var timestamp = new Date().getTime();
	                switch (typeof data === 'undefined' ? 'undefined' : _typeof(data)) {
	                    case 'undefined':
	                        // undefined
	                        search = '_=' + timestamp;
	                        break;
	                    case 'string':
	                        // string
	                        search = data === '' ? '_=' + timestamp : data + '&_=' + timestamp;
	                        break;
	                    case 'object':
	                        search = this._getQueryString(this._mixin(data, {
	                            _: timestamp
	                        }));
	                        break;
	                    default:
	                        throw new Error('data type error: not in `undefined`, `string` or `object`');
	                }
	                var url = a.origin + a.pathname + '?' + search;
	                this.xhr.open('GET', url, true);
	                this.xhr.send();
	            }
	            // this.xhr.timeout = 0;
	            return this;
	        }
	    }, {
	        key: 'abort',
	        value: function abort() {
	            this.xhr.abort();
	            return this;
	        }
	    }, {
	        key: '_getQueryString',
	        value: function _getQueryString(data) {
	            if (typeof data === 'string') {
	                return data;
	            }
	            var queryString = '';
	            for (var key in data) {
	                if (data.hasOwnProperty(key)) {
	                    var value = data[key];
	                    if (typeof value !== 'string') {
	                        try {
	                            value = JSON.stringify(value);
	                        } catch (e) {
	                            throw 'data can not be parsed to queryString';
	                        }
	                    }
	                    if (value !== undefined) {
	                        // omit undefined key pair
	                        queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
	                    }
	                }
	            }
	            return queryString.slice(0, -1);
	        }
	    }, {
	        key: '_mixin',
	        value: function _mixin(a, b) {
	            var r = {};
	            r = this._copy(a, r);
	            r = this._copy(b, r);
	            return r;
	        }
	    }, {
	        key: '_copy',
	        value: function _copy(a, r) {
	            for (var i in a) {
	                if (a.hasOwnProperty(i)) {
	                    r[i] = a[i];
	                }
	            }
	            return r;
	        }
	    }]);

	    return Ajax;
	})(_eventEmitter2.default);

	exports.default = Ajax;

/***/ },
/* 2 */
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

/***/ }
/******/ ]);