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

it('Displays checkbox for instructors', () => {
    const el = TestRenderer.create(
        <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Endowment point&apos;s horizontal line label"
            value="a"
            valueEditable={true}
            isInstructor={true}
            updateGraph={function() {}} />
    ).root;
    const checkbox = el.findByProps({className: 'form-check'});
    expect(checkbox.type).toEqual('div');
});

it('Hides checkbox for students', () => {
    const el = TestRenderer.create(
        <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Endowment point&apos;s horizontal line label"
            value="a"
            valueEditable={true}
            isInstructor={false}
            updateGraph={function() {}} />
    ).root;
    expect(() => {
        el.findByProps({className: 'form-check'});
    }).toThrow('No instances found with props: {"className":"form-check"}');
});
