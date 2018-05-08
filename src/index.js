import PropTypes from 'prop-types';
import React from 'react';

import {
    getStyleForTooltipArrow,
    getStyleForTooltipBody,
    getStyleForTooltipComponent,
    getStyleForTooltipContent,
    getStyleForTooltipWrapper
} from './getStyles';
import {
    TOOLTIP_LOCATION_SHAPE
} from './shapes';

import styles from './styles.scss';

class TT extends React.Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        children: PropTypes.any,
        id: PropTypes.string.isRequired,
        location: TOOLTIP_LOCATION_SHAPE,
        spacing: PropTypes.number,
        zIndex: PropTypes.number,
        sticky: PropTypes.bool
    }

    // TODO: import some stuff from the style file, but that requires figuring
    // how to load it at unit test time too
    static defaultProps = {
        backgroundColor: `#222222`,
        location: `top`,
        spacing: 14, // px
        zIndex: 0,
        sticky: false
    }

    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false
        };
        this.el = null;
        this.parentEl = null;
        this.bodyEl = null;
        this.componentEl = null;
        this.resizeTimerHandle = null;
    }

    componentDidMount() {
        this.parentEl = this.el.parentElement;

        this.applyListeners(true);

        if (this.props.sticky) {
            this.show();
        }
    }

    componentWillUnmount() {
        this.applyListeners(false);

        this.parentEl = null;
        this.el = null;
        this.bodyEl = null;
        this.componentEl = null;
        this.resizeTimerHandle = null;
    }

    onMouseEnter = () => {
        if (!this.props.sticky) {
            this.show();
        }
    }

    onMouseLeave = () => {
        if (!this.props.sticky) {
            this.hide();
        }
    }

    onResize = () => {
        console.log(`derp`);
        window.clearTimeout(this.resizeTimerHandle);

        this.resizeTimerHandle = window.setTimeout(() => {
            console.log(`resized!`);
            if (!this.state.showTooltip) {
                return;
            }

            this.forceUpdate();
        }, 250);
    }

    onScroll = (e) => {
        if (!this.state.showTooltip) {
            return;
        }

        this.forceUpdate();
    }

    applyListeners(enable) {
        if (enable) {
            this.parentEl.addEventListener(`mouseenter`, this.onMouseEnter);
            this.parentEl.addEventListener(`mouseleave`, this.onMouseLeave);
            window.addEventListener(`scroll`, this.onScroll);
            window.addEventListener(`resize`, this.onResize);
        } else {
            this.parentEl.removeEventListener(`mouseenter`, this.onMouseEnter);
            this.parentEl.removeEventListener(`mouseleave`, this.onMouseLeave);
            window.removeEventListener(`scroll`, this.onScroll);
            window.removeEventListener(`resize`, this.onResize);
        }
    }

    hide() {
        this.setState(function() {
            return {
                showTooltip: false
            };
        });
    }

    show() {
        this.setState(function() {
            return {
                showTooltip: true
            };
        });
    }

    render() {
        const {
            children,
            id,
            location
        } = this.props;
        const {
            showTooltip
        } = this.state;
        const visibilityClass = showTooltip
            ? styles.visible
            : styles.invisible;
        const arrowClassName =
            `${styles.arrow} ${styles[location]} ${visibilityClass}`;
        const bodyClassName = `${styles[location]} ${visibilityClass}`;
        const componentClassName = `${styles[location]} ${visibilityClass}`;
        const wrapperClassName =
            `${styles.wrapper} ${styles[location]} ${visibilityClass}`;
        const arrowStyle = getStyleForTooltipArrow(this.props, this.state,
            this.parentEl, this.bodyEl);
        const bodyStyle = getStyleForTooltipBody(this.props, this.state,
            this.parentEl, this.bodyEl);
        const componentStyle = getStyleForTooltipComponent(this.props,
            this.state, this.parentEl, this.bodyEl);
        const contentStyle = getStyleForTooltipContent(this.props, this.state,
            this.parentEl, this.bodyEl);
        const wrapperStyle = getStyleForTooltipWrapper(this.props, this.state,
            this.parentEl, this.bodyEl);

        /* onMouseEnter={this.onMouseLeave} is right - we want to hide the
         * tooltip if the cursor enters it */
        return (
            <div
                className={wrapperClassName}
                id={id}
                onMouseEnter={this.onMouseLeave}
                ref={(ref) => this.el = ref}
                role="tooltip"
                style={wrapperStyle}
            >
                <div
                    className={componentClassName}
                    ref={(ref) => this.componentEl = ref}
                    style={componentStyle}
                >
                    <div
                        className={bodyClassName}
                        ref={(ref) => this.bodyEl = ref}
                        style={bodyStyle}
                    >
                        <div style={contentStyle}>
                            {children}
                        </div>
                    </div>
                    <div
                        className={arrowClassName}
                        style={arrowStyle}
                    />
                </div>
            </div>
        );
    }
}

export default TT;
