/* eslint-env jest */

import React from 'react';
import TestRenderer from 'react-test-renderer';
import RangeEditor from './RangeEditor';

it('renders without crashing', () => {
    const el = TestRenderer.create(
        <RangeEditor
            dataId="gCobbDouglasA"
            value={0}
            handler={function() {}}
            min={0} />
    );
});

it('Displays override checkbox when configured', () => {
    const el = TestRenderer.create(
        <RangeEditor
            dataId="gCobbDouglasA"
            value={0}
            handler={function() {}}
            min={0}
            max={5}
            showOverrideCheckbox={true}
            overrideLabel={'override'}
            overrideValue={10000}
            />
    ).root;
    const checkbox = el.findByProps({type: 'checkbox'});
    expect(checkbox.type).toEqual('input');
});
