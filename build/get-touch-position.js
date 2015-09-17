/**
 * @since 15-09-03 18:05
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isMobileJs = require('./is-mobile.js');

var _isMobileJs2 = _interopRequireDefault(_isMobileJs);

exports['default'] = function (e) {
    var touch = _isMobileJs2['default'] ? e.changedTouches[0] : e;
    return {
        x: touch.pageX - e.target.offsetLeft,
        y: touch.pageY - e.target.offsetTop
    };
};

module.exports = exports['default'];