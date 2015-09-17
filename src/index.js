/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';
import Log from './log.js';
import ConsoleContainer from './console-container.js';

let log = new Log();
let container = new ConsoleContainer();

log.on('data', (level, data)=> {
    container.write(level, data);
});
