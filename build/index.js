/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logJs = require('./log.js');

var _logJs2 = _interopRequireDefault(_logJs);

var _consoleContainerJs = require('./console-container.js');

var _consoleContainerJs2 = _interopRequireDefault(_consoleContainerJs);

var log = new _logJs2['default']();
var container = new _consoleContainerJs2['default']();

log.on('data', function (level, data) {
  container.write(level, data);
});