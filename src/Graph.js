/**
 * Returns the current graph settings as a persistable JSON object.
 */
let exportGraph = function(state) {
    return {
        title: state.gTitle,
        description: state.gDescription,
        instructor_notes: state.gInstructorNotes,
        graph_type: state.gType,
        is_published: state.gIsPublished,
        needs_submit: state.gNeedsSubmit,
        show_intersection: state.gShowIntersection,
        line_1_slope: state.gLine1Slope,
        line_2_slope: state.gLine2Slope,
        line_1_label: state.gLine1Label,
        line_2_label: state.gLine2Label,
        line_1_feedback_increase: state.gLine1FeedbackIncrease,
        line_1_increase_score: state.gLine1IncreaseScore,
        line_1_feedback_decrease: state.gLine1FeedbackDecrease,
        line_1_decrease_score: state.gLine1DecreaseScore,
        line_2_feedback_increase: state.gLine2FeedbackIncrease,
        line_2_increase_score: state.gLine2IncreaseScore,
        line_2_feedback_decrease: state.gLine2FeedbackDecrease,
        line_2_decrease_score: state.gLine2DecreaseScore,
        x_axis_label: state.gXAxisLabel,
        y_axis_label: state.gYAxisLabel
    };
};

/**
 * Import the json graph into the current state.
 */
let importGraph = function(json, obj) {
    obj.setState({
        gId: json.id,
        gTitle: json.title,
        gDescription: json.description,
        gInstructorNotes: json.instructor_notes,
        gType: json.graph_type,
        gIsPublished: json.is_published,
        gNeedsSubmit: json.needs_submit,
        gShowIntersection: json.show_intersection,
        gLine1Slope: window.parseFloat(json.line_1_slope),
        gLine2Slope: window.parseFloat(json.line_2_slope),
        gLine1Label: json.line_1_label,
        gLine2Label: json.line_2_label,
        gLine1FeedbackIncrease: json.line_1_feedback_increase,
        gLine1IncreaseScore: window.parseFloat(json.line_1_increase_score),
        gLine1FeedbackDecrease: json.line_1_feedback_decrease,
        gLine1DecreaseScore: window.parseFloat(json.line_1_decrease_score),
        gLine2FeedbackIncrease: json.line_2_feedback_increase,
        gLine2IncreaseScore: window.parseFloat(json.line_2_increase_score),
        gLine2FeedbackDecrease: json.line_2_feedback_decrease,
        gLine2DecreaseScore: window.parseFloat(json.line_2_decrease_score),
        gXAxisLabel: json.x_axis_label,
        gYAxisLabel: json.y_axis_label
    });
};

export { exportGraph, importGraph };
