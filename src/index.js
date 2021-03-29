import './ezs.scss';

/**
 * @typedef {object} NewElementOptions
 * @property {?object} attributes
 * @property {?object} dataset
 * @property {?string} innerText
 */

/**
 * @typedef {object} EzSliderOptions
 * @property {HTMLElement|string}           target          CSS Selector or HTML element of the slider container.                       Required
 * @property {HTMLElement|string|boolean}   dots            Navigation dots configuration.                                              default: true
 * @property {'above'|'below'}              dotsPosition    Arrange the navigation dots above or below the slider?                      default: 'below'
 * @property {boolean}                      freezeFull      If all slides are visible, will free slider and hide navigation elements.   default: true
 * @property {number}                       items           Amount of items to show per slide                                           default: 1
 * @property {boolean}                      loop            Creates slide clones to loop through the slider                             default: false
 * @property {boolean}                      mouseDrag       Enable slider dragging via mouse / fine pointer device                      default: true
 * @property {HTMLElement|string|boolean}   nav             Navigation buttons configuration.                                           default: true
 * @property {'above'|'below'}              navPosition     Arrange the navigation buttons above or below the slider?                   default: 'above'
 * @property {'dots'|'nav'}                 navOrder        When dotsPosition and navPosition have the same value: Which goes first?    default: 'dots'
 * @property {boolean}                      rewind          Return to opposite edge upon navigation past the first or last slide        default: false
 * @property {number}                       startIndex      What slide the slider to start on                                           default: 1
 * @property {boolean}                      touchDrag       Enable slider dragging via touch                                            default: true
 */


const defaultOptions = {
    dots: true,
    dotsPosition: 'below',
    freezeFull: true,
    items: 1,
    loop: false,
    mouseDrag: true,
    nav: true,
    navPosition: 'above',
    navOrder: 'dots',
    rewind: false,
    startIndex: 1,
    touchDrag: true,
};

class EzSliderUtils {
    /**
     * @param {string} tagName
     * @param {NewElementOptions} options
     */
    static createElement(tagName, options= {}) {
        const elem = document.createElement(tagName);
        if (options.attributes) {
            for (let key of (Object.keys(options.attributes))) {
                elem.setAttribute(key, options.attributes[key]);
            }
        }
        if (options.dataset) {
            for (let key of (Object.keys(options.dataset))) {
                elem.dataset[key] = options.dataset[key];
            }
        }
        if (options.innerText) {
            elem.innerText = options.innerText;
        }
        return elem;
    }
    static resolveElement(identification) {
        if (identification instanceof HTMLElement) {
            return identification;
        } else if (typeof identification === 'string') {
            identification = document.querySelector(identification);
            return identification || false;
        }
    }
    static createContainer(target) {
        target.classList.add('ezs');
        target.innerHTML = `<div class="ezs-core">${Array.from(target.children).map(elem => `<div class="ezs-item">${elem.outerHTML}</div>`).join('')}</div>`;
        return target;
    }
    static createDefaultNav(active) {
        const nav = EzSliderUtils.createElement('div', {
            attributes: { 'class': 'ezs-nav' }
        });
        nav.appendChild(EzSliderUtils.createElement('button', {
            attributes: { 'aria-label': 'Prev' },
            dataset: { ezsNav: 'prev' },
            innerText: 'Prev'
        }));
        nav.appendChild(EzSliderUtils.createElement('button', {
            attributes: { 'aria-label': 'Next' },
            dataset: { ezsNav: 'next' },
            innerText: 'Next'
        }));
        if (!active) {
            nav.dataset['ezsEnabled'] = '0';
        }
        return nav;
    }
    static createDefaultDots(childCount, active, startIndex) {
        const dots = EzSliderUtils.createElement('div', {
            attributes: { 'class': 'ezs-dots' }
        });
        for (let i = 1; i <= childCount; i++) {
            const btn = document.createElement('button');
            btn.classList.add('ezs-dot');
            btn.dataset['ezsDot'] = i.toString(10);
            btn.setAttribute('aria-label', `Slide ${i}`);
            if (i === startIndex) {
                btn.classList.add('current');
            }
            // btn.addEventListener('click', this.slideTo);
            dots.appendChild(btn);
        }
        if (!active) {
            dots.dataset['ezsEnabled'] = '0';
        }
        return dots;
    }
    static validateOptions(options) {
        const fullOpts = Object.assign(defaultOptions, options);
        if (!fullOpts.target) {
            throw new Error('Please specify a target identifier or element');
        }
        const target = this.resolveElement(fullOpts.target);
        if (!target) {
            throw new Error(`No target element found for ${fullOpts.target}`);
        }
        return fullOpts;
    }
}

export default class EzSlider {
    /**
     * @param {EzSliderOptions} options
     */
    constructor(options) {
        options = EzSliderUtils.validateOptions(options);
        this.initTarget(options);
        this.initDots(options);
        this.initNav(options);
        this.initListeners();
    }
    initTarget(options) {
        const target = EzSliderUtils.resolveElement(options.target);
        if (!target) {
            throw new Error(`No target element found for ${options.target}`);
        }
        this.target = EzSliderUtils.createContainer(target);
        this.childCount = this.target.querySelector('.ezs-core').children.length;
    }
    initNav(options) {
        if (typeof options.nav !== 'boolean' && !!options.nav) {
            this.nav = EzSliderUtils.resolveElement(options.nav);
            if (!this.nav) {
                throw new Error(`No nav element found for ${options.nav}`);
            }
        } else {
            this.nav = EzSliderUtils.createDefaultNav(options.nav);
        }
        if (options.dotsPosition === options.navPosition) {
            this.dots.insertAdjacentElement(options.navOrder === 'nav' ? 'beforebegin' : 'afterend', this.nav);
        } else {
            this.target.insertAdjacentElement(options.navPosition === 'above' ? 'afterbegin' : 'beforeend', this.nav);
        }
    }
    initDots(options) {
        if (typeof options.dots !== 'boolean' && !!options.dots) {
            this.dots = EzSliderUtils.resolveElement(options.dots);
            if (!this.dots) {
                throw new Error(`No dots element found for ${options.dots}`);
            }
        } else {
            this.dots = EzSliderUtils.createDefaultDots(this.childCount, options.dots, options.startIndex);
        }
        this.target.insertAdjacentElement(options.dotsPosition === 'above' ? 'afterbegin' : 'beforeend', this.dots);
    }
    initListeners() {
        this.nav.querySelector('[data-ezs-nav="prev"]').addEventListener('click', function (event) {

        });
        this.nav.querySelector('[data-ezs-nav="next"]').addEventListener('click', function (event) {

        });
        this.dots.querySelector('[data-ezs-dot]').addEventListener('click', function (event) {
            if (event.target.classList.contains('current')) {
                return;
            }
        });
    }
}