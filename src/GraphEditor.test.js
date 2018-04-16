/* eslint-env jest */

import React from 'react';
import TestRenderer from 'react-test-renderer';
import GraphEditor from './GraphEditor';

it('renders without crashing', () => {
    TestRenderer.create(
        <GraphEditor
            gType={0}
            gTitle={'title'}
            gDescription={'description'}
            showing={true}
            updateDisplayIntersection={function() {}}
            updateGraph={function() {}}
            gInstructorNotes={'My notes'}
            gDisplayShadow={true}
            gDisplayFeedback={false}
            gIsPublished={true}
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
            gIntersectionHorizLineLabel={''}
            gIntersectionVertLineLabel={''}
            gIntersectionLabel={''}
            saveGraph={function() {}} />
    );
});
