import styles from './styles.scss';

const minSpacing = parseInt(styles.spacing, 10); /* "<#>px" -> <#> */

/**
 * builds a CSS style object to be applied to the tooltip arrow
 * @param {Object} props
 * @param {Object} state
 * @param {Element} parentEl
 * @param {Element} bodyEl
 * @return {Object} CSS style object
 */
export function getStyleForTooltipArrow(props) {
    const {
        location,
        backgroundColor
    } = props;
    const side = `${location.charAt(0).toUpperCase()}${location.slice(1)}`;

    return {
        [`border${side}Color`]: backgroundColor
    };
}

/**
 * builds a CSS style object to be applied to the tooltip body
 * @param {Object} props
 * @param {Object} state
 * @param {Element} parentEl
 * @param {Element} bodyEl
 * @return {Object} CSS style object
 */
export function getStyleForTooltipBody(props, state, parentEl, bodyEl) {
    if (!parentEl || !bodyEl) {
        return {};
    }

    /* calculate a translateX other than -50% if needed to prevent tooltip
     * contents from being clipped by the viewport */
    const parentBB = parentEl.getBoundingClientRect();
    const bodyBB = bodyEl.getBoundingClientRect();
    const parentCenter = parentBB.left + (parentBB.width / 2);
    /* default translate will center the tooltip over the arrow (which is itself
     * centered over the tooltip's parent element) */
    let translateX = bodyBB.width / 2;

    if (translateX > parentCenter) {
        /* centering the tooltip body would cause it to extend past the left
         * edge of the viewport */
        translateX = parentCenter;
    } else if (parentCenter + translateX > document.documentElement.clientWidth) {
        /* centering the tooltip body would cause it to extend past the right
         * edge of the (effective) viewport */
        translateX = parentCenter + bodyBB.width -
            document.documentElement.scrollWidth;
    }

    return {
        transform: `translateX(-${translateX}px)`
    };
}

/**
 * builds a CSS style object to be applied to the tooltip content container
 * @param {Object} props
 * @param {Object} state
 * @param {Element} parentEl
 * @param {Element} bodyEl
 * @return {Object} CSS style object
 */
export function getStyleForTooltipComponent(props, state) {
    return {
        visibility: state.showTooltip
            ? `visible`
            : `hidden`
    };
}

/**
 * builds a CSS style object to be applied to the tooltip content
 * @param {Object} props
 * @param {Object} state
 * @param {Element} parentEl
 * @param {Element} bodyEl
 * @return {Object} CSS style object
 */
export function getStyleForTooltipContent(props) {
    return {
        backgroundColor: props.backgroundColor
    };
}

/**
 * builds a CSS style object to be applied to the tooltip wrapper
 * @param {Object} props
 * @param {Object} state
 * @param {Element} parentEl
 * @param {Element} bodyEl
 * @return {Object} CSS style object
 */
export function getStyleForTooltipWrapper(props, state, parentEl, bodyEl) {
    const {
        location,
        spacing,
        zIndex
    } = props;

    if (!parentEl) {
        return {};
    }

    const base = {};
    const parentBB = parentEl.getBoundingClientRect();
    const bodyBB = bodyEl.getBoundingClientRect();

    if (zIndex) {
        base.zIndex = zIndex;
    }

    switch (location) {
        case `bottom`:
            return {
                ...base,
                left: parentBB.left + (parentBB.width / 2),
                top: parentBB.top + parentBB.height + spacing + 1
            };
        case `top`:
            return {
                ...base,
                left: parentBB.left + (parentBB.width / 2),
                top: parentBB.top - bodyBB.height - spacing - 1
            };
        default:
            console.warn(`unknown tooltip direction '${location}'`);

            return base;
    }
}
