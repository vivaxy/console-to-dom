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
 * @since 15-09-02 11:37
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

var _eventEmitterSrcEventEmitterJs = require('../event-emitter/src/event-emitter.js');

var _eventEmitterSrcEventEmitterJs2 = _interopRequireDefault(_eventEmitterSrcEventEmitterJs);

var Ajax = (function (_EventEmitter) {
    _inherits(Ajax, _EventEmitter);

    function Ajax(options) {
        _classCallCheck(this, Ajax);

        _get(Object.getPrototypeOf(Ajax.prototype), 'constructor', this).call(this, arguments);
        this.url = options.url;
        this.type = options.type;
        this.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
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
                if (_this.xhr.readyState === 4) {
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
                switch (typeof data) {
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
})(_eventEmitterSrcEventEmitterJs2['default']);

exports['default'] = Ajax;
module.exports = exports['default'];

},{"../event-emitter/src/event-emitter.js":1}],3:[function(require,module,exports){
/**
 * @since 2015-09-17 15:43
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ajaxSrcAjaxJs = require('../ajax/src/ajax.js');

var _ajaxSrcAjaxJs2 = _interopRequireDefault(_ajaxSrcAjaxJs);

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

var ajax = new _ajaxSrcAjaxJs2['default']({
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

},{"../ajax/src/ajax.js":2}]},{},[3]);
