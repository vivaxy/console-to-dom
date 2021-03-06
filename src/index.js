/**
 * @since 2015-09-17 15:40
 * @author vivaxy
 */
'use strict';
import Logger from './logger.js';
import ConsoleContainer from './console-container.js';

let consoleToDom = (style = {}) => {
    let logger = new Logger();
    let container = new ConsoleContainer(style);

    logger
        .on('data', (level, data)=> {
            container.write(level, data);
        })
        .on('ajax', (data) => {
            container.write(1, [data.method, data.url]);
        })
        .on('error', (data) => {
            container.write(4, data);
        });
};

export default consoleToDom;
window.consoleToDom = consoleToDom;
