/**
 * GraphMapping.js
 *
 * Mapping to and from a graph's react.js state and its
 * json representation in django-rest-framework.
 */
import { exportFloat } from './utils';

/**
 * Returns the current graph settings as a persistable JSON object.
 */
let exportGraph = function(state) {
    let obj = {
        title: state.gTitle,
        description: state.gDescription,
        instructor_notes: state.gInstructorNotes,
        graph_type: state.gType,
        interaction_type: state.gInteractionType,
        is_published: state.gIsPublished,
        display_feedback: state.gDisplayFeedback,
        needs_submit: state.gNeedsSubmit,

        show_intersection: state.gShowIntersection,
        intersection_label: state.gIntersectionLabel,
        intersection_label_editable: state.gIntersectionLabelEditable,
        intersection_horiz_line_label: state.gIntersectionHorizLineLabel,
        intersection_horiz_line_label_editable: state.gIntersectionHorizLineLabelEditable,
        intersection_vert_line_label: state.gIntersectionVertLineLabel,
        intersection_vert_line_label_editable: state.gIntersectionVertLineLabelEditable,

        line_1_slope: exportFloat(state.gLine1Slope),
        line_1_slope_editable: state.gLine1SlopeEditable,
        line_2_slope: exportFloat(state.gLine2Slope),
        line_2_slope_editable: state.gLine2SlopeEditable,
        line_1_offset: exportFloat(state.gLine1Offset),
        line_2_offset: exportFloat(state.gLine2Offset),
        line_1_label: state.gLine1Label,
        line_1_label_editable: state.gLine1LabelEditable,
        line_2_label: state.gLine2Label,
        line_2_label_editable: state.gLine2LabelEditable,

        x_axis_label: state.gXAxisLabel,
        x_axis_label_editable: state.gXAxisLabelEditable,
        y_axis_label: state.gYAxisLabel,
        y_axis_label_editable: state.gYAxisLabelEditable
    }

    if (state.gType === 3) {
        // Don't send all these cobb-douglas related fields if not
        // saving a cobb-douglas graph.
        const cobb = {
            cobb_douglas_a: exportFloat(state.gCobbDouglasA),
            cobb_douglas_a_name: state.gCobbDouglasAName,
            cobb_douglas_a_editable: state.gCobbDouglasAEditable,
            cobb_douglas_l: exportFloat(state.gCobbDouglasL),
            cobb_douglas_l_name: state.gCobbDouglasLName,
            cobb_douglas_l_editable: state.gCobbDouglasLEditable,
            cobb_douglas_k: exportFloat(state.gCobbDouglasK),
            cobb_douglas_k_name: state.gCobbDouglasKName,
            cobb_douglas_k_editable: state.gCobbDouglasKEditable,
            cobb_douglas_alpha: exportFloat(state.gCobbDouglasAlpha),
            cobb_douglas_alpha_name: state.gCobbDouglasAlphaName,
            cobb_douglas_alpha_editable: state.gCobbDouglasAlphaEditable,
            cobb_douglas_correct_scenario: state.gCobbDouglasCorrectScenario
        };
        Object.assign(obj, cobb);
    } else {
        const demandSupplyScore = {
            line_1_feedback_increase: state.gLine1FeedbackIncrease,
            line_1_increase_score: exportFloat(state.gLine1IncreaseScore),
            line_1_feedback_decrease: state.gLine1FeedbackDecrease,
            line_1_decrease_score: exportFloat(state.gLine1DecreaseScore),
            line_2_feedback_increase: state.gLine2FeedbackIncrease,
            line_2_increase_score: exportFloat(state.gLine2IncreaseScore),
            line_2_feedback_decrease: state.gLine2FeedbackDecrease,
            line_2_decrease_score: exportFloat(state.gLine2DecreaseScore)
        };
        Object.assign(obj, demandSupplyScore);
    }

    return obj;
};

/**
 * Import the json graph into the current state.
 */
let importGraph = function(json, obj) {
    const updateObj = {
        gId: json.id,
        gTitle: json.title,
        gDescription: json.description,
        gInstructorNotes: json.instructor_notes,
        gType: json.graph_type,
        gInteractionType: json.interaction_type,
        gIsPublished: json.is_published,
        gDisplayFeedback: json.display_feedback,
        gNeedsSubmit: json.needs_submit,

        gShowIntersection: json.show_intersection,
        gIntersectionLabel: json.intersection_label,
        gIntersectionLabelEditable: json.intersection_label_editable,
        gIntersectionHorizLineLabel: json.intersection_horiz_line_label,
        gIntersectionHorizLineLabelEditable: json.intersection_horiz_line_label_editable,
        gIntersectionVertLineLabel: json.intersection_vert_line_label,
        gIntersectionVertLineLabelEditable: json.intersection_vert_line_label_editable,

        gLine1Slope: window.parseFloat(json.line_1_slope),
        gLine1SlopeEditable: json.line_1_slope_editable,
        gLine2Slope: window.parseFloat(json.line_2_slope),
        gLine2SlopeEditable: json.line_2_slope_editable,
        gLine1Offset: window.parseFloat(json.line_1_offset),
        gLine2Offset: window.parseFloat(json.line_2_offset),
        gLine1Label: json.line_1_label,
        gLine1LabelEditable: json.line_1_label_editable,
        gLine2Label: json.line_2_label,
        gLine2LabelEditable: json.line_2_label_editable,
        gLine1FeedbackIncrease: json.line_1_feedback_increase,
        gLine1IncreaseScore: window.parseFloat(json.line_1_increase_score),
        gLine1FeedbackDecrease: json.line_1_feedback_decrease,
        gLine1DecreaseScore: window.parseFloat(json.line_1_decrease_score),
        gLine2FeedbackIncrease: json.line_2_feedback_increase,
        gLine2IncreaseScore: window.parseFloat(json.line_2_increase_score),
        gLine2FeedbackDecrease: json.line_2_feedback_decrease,
        gLine2DecreaseScore: window.parseFloat(json.line_2_decrease_score),

        gXAxisLabel: json.x_axis_label,
        gXAxisLabelEditable: json.x_axis_label_editable,
        gYAxisLabel: json.y_axis_label,
        gYAxisLabelEditable: json.y_axis_label_editable,

        gCobbDouglasA: window.parseFloat(json.cobb_douglas_a),
        gCobbDouglasAName: json.cobb_douglas_a_name,
        gCobbDouglasAEditable: json.cobb_douglas_a_editable,
        gCobbDouglasL: window.parseFloat(json.cobb_douglas_l),
        gCobbDouglasLName: json.cobb_douglas_l_name,
        gCobbDouglasLEditable: json.cobb_douglas_l_editable,
        gCobbDouglasK: window.parseFloat(json.cobb_douglas_k),
        gCobbDouglasKName: json.cobb_douglas_k_name,
        gCobbDouglasKEditable: json.cobb_douglas_k_editable,
        gCobbDouglasAlpha: window.parseFloat(json.cobb_douglas_alpha),
        gCobbDouglasAlphaName: json.cobb_douglas_alpha_name,
        gCobbDouglasAlphaEditable: json.cobb_douglas_alpha_editable,
        gCobbDouglasCorrectScenario: json.cobb_douglas_correct_scenario
    };
    obj.setState(updateObj);
};

export { exportGraph, importGraph };
