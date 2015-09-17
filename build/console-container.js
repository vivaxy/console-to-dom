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

        this.parent = document.body;
        this.inner = this._createElement({
            height: '100%',
            overflow: 'auto',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        });
        this.container = this._createElement({
            bottom: 0,
            padding: '2%',
            height: '50%',
            width: '100%',
            position: 'absolute',
            boxSizing: 'border-box',
            backgroundColor: '#999'
        });
        this.container.appendChild(this.inner);
        this.parent.appendChild(this.container);
        this.setZIndex(this._getMaxZIndex());
        this._listenToZIndexChange();
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
            return parseInt(ele.style.zIndex) || 0;
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
    }]);

    return ConsoleContainer;
})();

exports['default'] = ConsoleContainer;
module.exports = exports['default'];