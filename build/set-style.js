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