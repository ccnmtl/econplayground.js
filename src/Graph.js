/**
 * Returns the current graph settings as a persistable JSON object.
 */
let exportGraph = function(state) {
    return {
        title: state.gTitle,
        description: state.gDescription,
        instructor_notes: state.gInstructorNotes,
        graph_type: state.gType,
        show_intersection: state.gShowIntersection,
        line_1_slope: state.gLine1Slope,
        line_2_slope: state.gLine2Slope,
        line_1_label: state.gLine1Label,
        line_2_label: state.gLine2Label,
        line_1_feedback_increase: state.gLine1FeedbackIncrease,
        line_1_feedback_decrease: state.gLine1FeedbackDecrease,
        line_2_feedback_increase: state.gLine2FeedbackIncrease,
        line_2_feedback_decrease: state.gLine2FeedbackDecrease,
        x_axis_label: state.gXAxisLabel,
        y_axis_label: state.gYAxisLabel
    };
};

/**
 * Import the json graph into the current state.
 */
let importGraph = function(json, obj) {
    obj.setState({
        gTitle: json.title,
        gDescription: json.description,
        gInstructorNotes: json.instructor_notes,
        gType: json.graph_type,
        gShowIntersection: true,
        gLine1Slope: window.parseFloat(json.line_1_slope),
        gLine2Slope: window.parseFloat(json.line_2_slope),
        gLine1Label: json.line_1_label,
        gLine2Label: json.line_2_label,
        gLine1FeedbackIncrease: json.line_1_feedback_increase,
        gLine1FeedbackDecrease: json.line_1_feedback_decrease,
        gLine2FeedbackIncrease: json.line_2_feedback_increase,
        gLine2FeedbackDecrease: json.line_2_feedback_decrease,
        gXAxisLabel: json.x_axis_label,
        gYAxisLabel: json.y_axis_label
    });
};

export { exportGraph, importGraph };
