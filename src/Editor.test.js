/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Editor />, div);
});

it('renders with children in the expected visibility state', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Editor />, div, function() {
        expect(this.backbutton.props.showing).toBe(false);
        expect(this.gp.props.showing).toBe(true);
        expect(this.ge.props.showing).toBe(false);

        expect(ReactTestUtils.isCompositeComponent(this.backbutton)).toBe(true);
        expect(ReactTestUtils.isCompositeComponent(this.gp)).toBe(true);
        expect(ReactTestUtils.isCompositeComponent(this.ge)).toBe(true);

        expect(this.state.step).toBe(0);
        expect(this.state.gType).toBe(null);
        ReactTestUtils.Simulate.click(this.gp.b1);
        // expect(this.state.step).toBe(1);
    });
});

it('exports its graph state', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Editor />, div, function() {
        let o = this.exportGraph();
        expect(o.graph_type).toBe(null);
        expect(o.show_intersection).toBe(true);
        expect(o.line_1_slope).toBe(1);
        expect(o.line_2_slope).toBe(-1);
        expect(o.line_1_label).toBe('');
        expect(o.line_2_label).toBe('');
        expect(o.line_1_feedback_increase).toBe('');
        expect(o.line_1_feedback_decrease).toBe('');
        expect(o.line_2_feedback_increase).toBe('');
        expect(o.line_2_feedback_decrease).toBe('');
        expect(o.y_axis_label).toBe('');
        expect(o.x_axis_label).toBe('');
        expect(o.y_axis_label).toBe('');
    });
})
