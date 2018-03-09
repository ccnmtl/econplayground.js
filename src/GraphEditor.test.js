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
            gLine1LabelEditable={false}
            gLine2Label={''}
            gLine2LabelEditable={false}
            gXAxisLabel={'X'}
            gXAxisLabelEditable={false}
            gYAxisLabel={'Y'}
            gYAxisLabelEditable={false}
            gLine1Slope={-1}
            gLine1SlopeEditable={false}
            gLine2Slope={1}
            gLine2SlopeEditable={false}
            gLine1OffsetX={0}
            gLine1OffsetY={0}
            gLine2OffsetX={0}
            gLine2OffsetY={0}
            gLine1FeedbackDecrease={''}
            gLine1FeedbackIncrease={''}
            gLine2FeedbackDecrease={''}
            gLine2FeedbackIncrease={''}
            gIntersectionHorizLineLabel={''}
            gIntersectionHorizLineLabelEditable={false}
            gIntersectionVertLineLabel={''}
            gIntersectionVertLineLabelEditable={false}
            gIntersectionLabel={''}
            gIntersectionLabelEditable={false}
            saveGraph={function() {}} />
    );
});
