/**
 * @since 2015-09-17 17:51
 * @author vivaxy
 */
'use strict';
import logLevel from './log-level.js';

class ConsoleContainer {
    constructor(style) {
        this.parent = document.body || alert('`console to dom`: document has not body');
        this.top = style.top;
        this.left = style.left;
        this.height = style.height;
        this.width = style.width;
        this.padding = style.padding;

        if (this.top === undefined) {
            this.top = 50;
        }
        if (this.left = undefined) {
            this.left = 0;
        }
        if (this.height === undefined) {
            this.height = 50;
        }
        if (this.width === undefined) {
            this.width = 100;
        }
        if (this.padding === undefined) {
            this.padding = 5;
        }
        this._initializeContainer();
        this._initializeInner();
        this._listenToTouch();
        this.setZIndex(this._getMaxZIndex());
        this._listenToZIndexChange();
    }

    /**
     *
     * @returns {ConsoleContainer}
     * @private
     */
    _initializeContainer() {
        let width = window.innerWidth; // document.body.clientWidth;
        let height = window.innerHeight; // document.body.clientHeight;
        this.container = this._createElement({
            top: height * this.top / 100 + 'px',
            left: width * this.left / 100 + 'px',
            width: width * this.width / 100 + 'px',
            height: height * this.height / 100 + 'px',
            padding: width * this.padding / 100 + 'px',
            //padding: width / 100 + 'px',
            //paddingTop: width * 10 / 100 + 'px',
            position: 'absolute',
            boxSizing: 'border-box',
            backgroundColor: '#888'
        });
        this.dragTop = this._createElement({
            top: 0 + 'px',
            left: 0 + 'px',
            width: width + 'px',
            height: width * 5 / 100 + 'px',
            position: 'absolute'
        });
        this.dragLeft = this._createElement({
            top: 0 + 'px',
            left: 0 + 'px',
            width: width * 5 / 100 + 'px',
            height: height * 50 / 100 + 'px',
            position: 'absolute'
        });
        this.dragRight = this._createElement({
            top: 0 + 'px',
            right: 0 + 'px',
            width: width * 5 / 100 + 'px',
            height: height * 50 / 100 + 'px',
            position: 'absolute'
        });
        this.dragBottom = this._createElement({
            bottom: 0 + 'px',
            left: 0 + 'px',
            width: width + 'px',
            height: width * 5 / 100 + 'px',
            position: 'absolute'
        });
        this.parent.appendChild(this.container);
        return this;
    }

    /**
     *
     * @returns {ConsoleContainer}
     * @private
     */
    _initializeInner() {
        this.inner = this._createElement({
            width: '100%',
            height: '100%',
            overflow: 'auto',
            fontSize: '12px',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        });
        this.container.appendChild(this.inner);
        return this;
    }

    /**
     * create element by type
     * @param style
     * @param type
     * @returns {Element}
     * @private
     */
    _createElement(style, type = 'div') {
        let div = document.createElement(type);
        this._setStyle(div, style);
        return div;
    }

    /**
     * output log to console div
     * @param level
     * @param data
     * @returns {ConsoleContainer}
     */
    write(level = 0, data = []) {
        let code = this._createElement({
            display: 'block',
            whiteSpace: 'pre',
            color: this._getColor(level),
            backgroundImage: 'linear-gradient(180deg, #ccc, transparent 51%)',
            backgroundSize: '100% 1px',
            backgroundRepeat: 'no-repeat'
        }, 'code');
        code.textContent = Array.prototype.map.call(data, (obj)=> {
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
                case obj instanceof ErrorEvent:
                    string = obj.error.stack;
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

    /**
     * get correspond color according to log level
     * @param level
     * @returns {string}
     * @private
     */
    _getColor(level) {
        let logLevelColorMap = logLevel.map((level)=> {
            return level.color;
        });
        // rewrite `_getColor` for higher performance
        this._getColor = (level) => {
            return logLevelColorMap[level];
        };
        return this._getColor(level);
    }

    /**
     * set z-index to log container
     * @param index
     * @returns {ConsoleContainer}
     */
    setZIndex(index) {
        let currentZIndex = this._getZIndex(this.container);
        let maxZIndex = Math.max(index, currentZIndex - 1);
        this.container.style.zIndex = maxZIndex + 1;
        return this;
    }

    /**
     * get element z-index
     * @param ele
     * @returns {*}
     * @private
     */
    _getZIndex(ele) {
        return this._getInteger(ele.style.zIndex);
    }

    /**
     * get integer from style value
     * 0 => 0
     * 1 => 1
     * auto => 0
     * inherit => 0
     * @param value
     * @returns {Number|number}
     * @private
     */
    _getInteger(value) {
        return parseInt(value) || 0;
    }

    /**
     * get max z-index of all elements
     * @returns {number}
     * @private
     */
    _getMaxZIndex() {
        return Math.max.apply(Math, Array.prototype.map.call(document.querySelectorAll('*'), (ele)=> {
            return ele === this.container ? 0 : this._getZIndex(ele);
        }));
    }

    /**
     * use `MutationObserver` to find element z-index change, to keep log container always on top
     * @returns {ConsoleContainer}
     * @private
     */
    _listenToZIndexChange() {
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if (MutationObserver) {
            let _this = this;
            let observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.target !== _this.container && mutation.attributeName === 'style') {
                        _this.setZIndex(_this._getZIndex(mutation.target));
                    }
                });
            });
            let config = {
                attributes: true,
                subtree: true
            };
            observer.observe(document, config);
            //observer.disconnect();
        }
        return this;
    }

    /**
     * enable users to move log container
     * @returns {ConsoleContainer}
     * @private
     */
    _listenToTouch() {
        let position = {};
        let container = this.container;
        ['top', 'left', 'right', 'bottom'].forEach((name) => {
            let drag = this['drag' + name[0].toUpperCase() + name.slice(1)];
            //let container = this.container;
            //let inner = this.inner;
            //inner.addEventListener('touchmove', (e)=> {
            //    e.stopPropagation();
            //}, false);
            drag.addEventListener('touchstart', (e)=> {
                e.preventDefault();
                e.stopPropagation();
                position = this._getTouchPosition(e);
            }, false);
            drag.addEventListener('touchmove', (e)=> {
                e.preventDefault();
                e.stopPropagation();
                let lastPosition = position;
                position = this._getTouchPosition(e);
                let top = this._getInteger(container.style.top);
                let left = this._getInteger(container.style.left);
                container.style.left = left + position.x - lastPosition.x + 'px';
                container.style.top = top + position.y - lastPosition.y + 'px';
            }, false);
            drag.addEventListener('touchend', (e)=> {
                e.preventDefault();
                e.stopPropagation();
            }, false);
            container.appendChild(drag);
        });
        return this;
    }

    /**
     * get touch position according to window position
     * @param e
     * @returns {{x: (*|Number), y: (*|Number)}}
     * @private
     */
    _getTouchPosition(e) {
        let touch = e.changedTouches[0];
        return {
            //x: touch.pageX - e.target.offsetLeft,
            x: touch.pageX,
            //y: touch.pageY - e.target.offsetTop
            y: touch.pageY
        };
    }

    /**
     * set styles to element
     * @param ele
     * @param style
     * @private
     */
    _setStyle(ele, style) {
        for (let key in style) {
            ele.style[key] = style[key];
        }
        return this;
    }
}

export default ConsoleContainer;
