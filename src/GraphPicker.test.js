/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import GraphPicker from './GraphPicker';
import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <GraphPicker
             gType={0}
             showing={true}
             onSelectGraph={function() {}} />,
        div);
});

it('can be clicked', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <GraphPicker
             gType={0}
             showing={true}
             onSelectGraph={function() {}} />,
        div,
        function() {
            ReactTestUtils.Simulate.click(this.b1);
        });
});
