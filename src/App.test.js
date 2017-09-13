/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('renders with children in the expected visibility state', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div, function() {
        expect(this.backbutton.props.showing).toBe(false);
        expect(this.gp.props.showing).toBe(true);
        expect(this.ge.props.showing).toBe(false);

        expect(ReactTestUtils.isCompositeComponent(this.backbutton)).toBe(true);
        expect(ReactTestUtils.isCompositeComponent(this.gp)).toBe(true);
        expect(ReactTestUtils.isCompositeComponent(this.ge)).toBe(true);

        expect(this.state.step).toBe(0);
        expect(this.state.gType).toBe(null);
        ReactTestUtils.Simulate.click(this.gp.b1);
        expect(this.state.step).toBe(1);
        expect(this.state.gType).toBe(0);
    });
});

it('exports its graph state', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div, function() {
        let o = this.exportGraph();
        expect(o.type).toBe(null);
        expect(o.showIntersection).toBe(true);
        expect(o.xAxisLabel).toBe('');
        expect(o.yAxisLabel).toBe('');
    });
})
