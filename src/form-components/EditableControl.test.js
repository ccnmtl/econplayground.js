/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import EditableControl from './EditableControl';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Endowment point&apos;s horizontal line label"
            value="a"
            valueEditable={true}
            isInstructor={true}
            updateGraph={function() {}} />,
        div);
});
