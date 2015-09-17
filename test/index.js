/**
 * @since 2015-09-17 15:43
 * @author vivaxy
 */
'use strict';
var methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];

methodNameArray.forEach(function (name) {
    console[name].call(console, true, 0, 'name', undefined, null, [1, 2, 3], {
        test: 4
    }, new Date(), function (vari) {
        return vari++;
    });
});
