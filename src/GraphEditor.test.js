/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import GraphEditor from './GraphEditor';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <GraphEditor
             gType={0}
             showing={true}
             updateDisplayIntersection={function() {}}
             updateGraph={function() {}}
             gShowIntersection={true}
             gLine1Label={''}
             gLine2Label={''}
             gLine1Slope={-1}
             gLine2Slope={1}
             saveGraph={function() {}} />,
        div);
});
