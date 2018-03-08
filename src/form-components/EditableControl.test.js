/* eslint-env jest */

import React from 'react';
import TestRenderer from 'react-test-renderer';
import EditableControl from './EditableControl';

it('renders without crashing', () => {
    const el = TestRenderer.create(
        <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Endowment point&apos;s horizontal line label"
            value="a"
            valueEditable={true}
            isInstructor={true}
            updateGraph={function() {}} />
    );
});
