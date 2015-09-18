/**
 * @since 2015-09-17 15:43
 * @author vivaxy
 */
'use strict';
var methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];

var dateFormat = function (date) {
    var pad = function (number, length) {
        var numberString = number.toString();
        while (numberString.length < length) {
            numberString = '0' + numberString;
        }
        return numberString;
    };
    var timezoneOffset = date.getTimezoneOffset();
    return date.getFullYear() + '-' +
        pad(date.getMonth() + 1, 2) + '-' +
        pad(date.getDate(), 2) + ' ' +
        pad(date.getHours(), 2) + ':' +
        pad(date.getMinutes(), 2) + ':' +
        pad(date.getSeconds(), 2) + '.' +
        pad(date.getMilliseconds(), 3) + ' ' +
        (timezoneOffset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(timezoneOffset) / 60) * 100 + Math.abs(timezoneOffset) % 60, 4);
};

methodNameArray.forEach(function (name) {
    console[name].call(console, true, 0, 'name', undefined, null, [1, 2, 3], {
        test: 4
    }, new Date(), function (vari) {
        return vari++;
    });
});

setInterval(function () {
    console.log(dateFormat(new Date()));
}, 1000);
