/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import AreaDisplay from './AreaDisplay';

it('renders with null values', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <AreaDisplay areaA={null} areaB={null} areaC={null} />, div);
});

it('renders with real values', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <AreaDisplay areaA={1.23} areaB={1.23} areaC={1.23} />, div);
});

