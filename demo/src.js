/**
 * @since 2015-09-17 15:43
 * @author vivaxy
 */
'use strict';
import Ajax from '../node_modules/ajax/src/ajax.js';

let methodNameArray = ['log', 'debug', 'info', 'warn', 'error'];

let dateFormat = function (date) {
    let pad = function (number, length) {
        let numberString = number.toString();
        while (numberString.length < length) {
            numberString = '0' + numberString;
        }
        return numberString;
    };
    let timezoneOffset = date.getTimezoneOffset();
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

let ajax = new Ajax({
    url: 'data.json'
}).on('success', (data) => {
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
        'function': () => {
            return 0;
        },
        'another': (value) => {
            console.log(value);
        }
    },
    'second': (value) => {
        console.log(value);
    }
});

ajax.send();

JSON.parse('test-error');
