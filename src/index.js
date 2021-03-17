import './ezs.scss';

/**
 * @typedef {object} EzSliderOptions
 * @property {string|HTMLElement} target
 * @property {string|HTMLElement} dots
 * @property {string|HTMLElement} nav
 */

/**
 * @param {HTMLElement|string} target
 * @return {HTMLElement|boolean}
 */
function resolveElement(target) {
    if (target instanceof HTMLElement) {
        return target;
    } else if (target instanceof String) {
        target = document.querySelector(target);
        return target || false;
    }
}

/**
 * @param {EzSliderOptions} options
 */
export default function ezs(options) {
    if (!options.target) {
        throw new Error('Please specify a target identifier or element');
    }
    const target = resolveElement(options.target);
    if (!target) {
        return;
    }
    const
        items = target.children
        // dots = resolveElement(options.dots),
        // nav = resolveElement(options.nav)
    ;
    if (items.length < 2) {
        return;
    }


    document.querySelector('[data-ezs-nav="prev"]').addEventListener('click', function (event) {

    });
    document.querySelector('[data-ezs-nav="next"]').addEventListener('click', function (event) {

    });
}