/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import AUCDisplay from './AUCDisplay';

it('renders with null values', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AUCDisplay areaA={null} areaB={null} areaC={null}/>, div);
});

it('renders with real values', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AUCDisplay areaA={1.23} areaB={1.23} areaC={1.23}/>, div);
});

