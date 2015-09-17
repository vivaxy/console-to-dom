/**
 * @since 2015-09-17 17:51
 * @author vivaxy
 */
'use strict';
import setStyle from './set-style.js';

class ConsoleContainer {
    constructor() {
        this.parent = document.body;
        this.inner = this._createElement({
            height: '100%',
            overflow: 'auto',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        });
        this.container = this._createElement({
            bottom: 0,
            padding: '2%',
            height: '50%',
            width: '100%',
            position: 'absolute',
            boxSizing: 'border-box',
            backgroundColor: '#999'
        });
        this.container.appendChild(this.inner);
        this.parent.appendChild(this.container);
        this.setZIndex(this._getMaxZIndex());
        this._listenToZIndexChange();
    }

    _createElement(style, type = 'div') {
        let div = document.createElement(type);
        setStyle(div, style);
        return div;
    }

    write(level, data) {
        let code = this._createElement({
            display: 'block',
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
        return parseInt(ele.style.zIndex) || 0;
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
}

export default ConsoleContainer;
