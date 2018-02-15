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
            gDisplayShadow={true}
            gNeedsSubmit={false}
            gShowIntersection={true}
            gLine1Label={''}
            gLine2Label={''}
            gXAxisLabel={'X'}
            gYAxisLabel={'Y'}
            gLine1Slope={-1}
            gLine2Slope={1}
            gLine1OffsetX={0}
            gLine1OffsetY={0}
            gLine2OffsetX={0}
            gLine2OffsetY={0}
            gLine1FeedbackDecrease={''}
            gLine1FeedbackIncrease={''}
            gLine2FeedbackDecrease={''}
            gLine2FeedbackIncrease={''}
            saveGraph={function() {}} />,
        div);
});
