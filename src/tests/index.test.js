/* eslint-env browser,jest */

import checkPropTypes from 'check-prop-types';
import {
    mount,
    shallow
} from 'enzyme';
import React from 'react';

import Tooltip from '../index';

describe(`the tooltip component`, function() {
    it(`renders as expected`, function() {
        const wrapper = shallow(
            <Tooltip id="test-tooltip">
                hello
            </Tooltip>
            , { disableLifecycleMethods: true }
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe(`on scroll`, function() {
        const addEventListener = window.addEventListener;
        let eventListeners = {};

        beforeAll(function() {
            window.addEventListener = jest.fn(function(event, cb) {
                eventListeners[event] = jest.fn(cb);
            });
        });
        beforeEach(function() {
            eventListeners = {};
        });
        afterAll(function() {
            window.addEventListener = addEventListener;
        });

        it(`does nothing if tooltip is hidden`, function() {
            const wrapper = mount(
                <Tooltip id="test-tooltip">
                    hello
                </Tooltip>
            );

            wrapper.setState({ showTooltip: false });

            const forceUpdate = jest.spyOn(wrapper.instance(), `forceUpdate`);

            eventListeners.scroll();

            expect(forceUpdate).not.toBeCalled();
        });

        it(`redraws if tooltip is visible`, function() {
            const wrapper = mount(
                <Tooltip id="test-tooltip">
                    hello
                </Tooltip>
            );

            wrapper.setState({ showTooltip: true });

            const forceUpdate = jest.spyOn(wrapper.instance(), `forceUpdate`);

            eventListeners.scroll();

            expect(forceUpdate).toBeCalled();
        });
    });

    it(`shows itself upon parent mouse enter`, function() {
        const wrapper = mount(
            <Tooltip id="test-tooltip">
                hello
            </Tooltip>
        );
        const parentEl = wrapper.instance().parentEl;

        parentEl.dispatchEvent(new Event(`mouseenter`));

        expect(wrapper.render()).toMatchSnapshot();
    });

    it(`hides itself upon parent mouse leave`, function() {
        const wrapper = mount(
            <Tooltip id="test-tooltip">
                hello
            </Tooltip>
        );
        const parentEl = wrapper.instance().parentEl;

        parentEl.dispatchEvent(new Event(`mouseleave`));

        expect(wrapper.render()).toMatchSnapshot();
    });

    it(`hides itself upon mouse enter`, function() {
        const wrapper = mount(
            <Tooltip id="test-tooltip">
                hello
            </Tooltip>
        );

        wrapper.setState({ showTooltip: true });
        wrapper.simulate(`mouseEnter`);

        expect(wrapper.render()).toMatchSnapshot();
    });

    it(`shows itself by default if sticky is enabled`, function() {
        const wrapper = mount(
            <Tooltip id="test-tooltip" sticky>
                hello
            </Tooltip>
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    describe(`API contract`, function() {
        const mockPropTypes = {
            id: `foo`
        };

        it(`declares the expected required props`, function() {
            expect(checkPropTypes(Tooltip.propTypes, mockPropTypes)).toBe(undefined);
        });

        it(`declares the expected propTypes`, function() {
            expect(checkPropTypes(Tooltip.propTypes, {
                ...mockPropTypes,
                backgroundColor: `red`
            })).toBe(undefined);
            expect(checkPropTypes(Tooltip.propTypes, {
                ...mockPropTypes,
                children: [ `x`, <div /> ]
            })).toBe(undefined);
            expect(checkPropTypes(Tooltip.propTypes, {
                ...mockPropTypes,
                location: `bottom`
            })).toBe(undefined);
            expect(checkPropTypes(Tooltip.propTypes, {
                ...mockPropTypes,
                spacing: 1
            })).toBe(undefined);
            expect(checkPropTypes(Tooltip.propTypes, {
                ...mockPropTypes,
                zIndex: 0
            })).toBe(undefined);
        });

        it(`declares the expected defaultProps`, function() {
            expect(Tooltip.defaultProps).toEqual({
                backgroundColor: `#222222`,
                location: `top`,
                spacing: 14,
                zIndex: 0,
                sticky: false
            });
        });
    });
});
