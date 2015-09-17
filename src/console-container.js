/**
 * @since 2015-09-17 17:51
 * @author vivaxy
 */
'use strict';
import setStyle from './set-style.js';

class ConsoleContainer {
    constructor() {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;
        this.parent = document.body;
        this.inner = this._createElement({
            width: '100%',
            height: '100%',
            overflow: 'auto',
            fontSize: '12px',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        });
        this.container = this._createElement({
            top: height * 50 / 100 + 'px',
            left: 0,
            width: width + 'px',
            height: height * 50 / 100 + 'px',
            padding: width / 100 + 'px',
            paddingTop: width * 10 / 100 + 'px',
            position: 'absolute',
            boxSizing: 'border-box',
            backgroundColor: '#888'
        });
        this.container.appendChild(this.inner);
        this.parent.appendChild(this.container);
        this.setZIndex(this._getMaxZIndex());
        this._listenToZIndexChange();
        this._listenToTouch();
    }

    _createElement(style, type = 'div') {
        let div = document.createElement(type);
        setStyle(div, style);
        return div;
    }

    write(level, data) {
        let code = this._createElement({
            display: 'block',
            //whiteSpace: 'pre-wrap',
            whiteSpace: 'nowrap',
            color: this._getColor(level)
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
                default:
                    string = JSON.stringify(obj);
            }
            return string;
        }).join(' ');
        this.inner.appendChild(code);
        code.scrollIntoView(true);
        return this;
    }

    _getColor(level) {
        let colorMap = ['#333', '#3c3', '#33c', '#cc3', '#c33'];
        return colorMap[level];
    }

    setZIndex(index) {
        let currentZIndex = this._getZIndex(this.container);
        let maxZIndex = Math.max(index, currentZIndex - 1);
        this.container.style.zIndex = maxZIndex + 1;
        return this;
    }

    _getZIndex(ele) {
        return this._getInteger(ele.style.zIndex);
    }

    _getInteger(value) {
        return parseInt(value) || 0;
    }

    _getMaxZIndex() {
        return Math.max.apply(Math, Array.prototype.map.call(document.querySelectorAll('*'), (ele)=> {
            return ele === this.container ? 0 : this._getZIndex(ele);
        }));
    }

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

    _listenToTouch() {
        let position = {};
        let container = this.container;
        let inner = this.inner;
        inner.addEventListener('touchmove', (e)=> {
            //e.stopPropagation();
        }, false);
        container.addEventListener('touchstart', (e)=> {
            e.preventDefault();
            e.stopPropagation();
            position = this._getTouchPosition(e);
        }, false);
        container.addEventListener('touchmove', (e)=> {
            e.preventDefault();
            e.stopPropagation();
            let lastPosition = position;
            position = this._getTouchPosition(e);
            let top = this._getInteger(container.style.top);
            let left = this._getInteger(container.style.left);
            container.style.left = left + position.x - lastPosition.x + 'px';
            container.style.top = top + position.y - lastPosition.y + 'px';
        }, false);
        container.addEventListener('touchend', (e)=> {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    }

    _getTouchPosition(e) {
        let touch = e.changedTouches[0];
        return {
            x: touch.pageX - e.target.offsetLeft,
            y: touch.pageY - e.target.offsetTop
        };
    }
}

export default ConsoleContainer;
