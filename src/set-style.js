/**
 * @since 2015-09-17 17:32
 * @author vivaxy
 */
'use strict';
export default (ele, style) => {
    for (let key in style) {
        ele.style[key] = style[key];
    }
};
