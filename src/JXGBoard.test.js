/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import JXGBoard from './JXGBoard.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <JXGBoard
             id={'id-test'}
             type={0}
             showIntersection={true} />,
        div);
});
