/**
 * GraphMapping.js
 *
 * Mapping to and from a graph's react.js state and its
 * json representation in django-rest-framework.
 */
import { forceFloat } from './utils';

/**
 * Returns the current graph settings as a persistable JSON object.
 */
const exportGraph = function(state) {
    let obj = {
        title: state.gTitle,
        description: state.gDescription,
        instructor_notes: state.gInstructorNotes,
        graph_type: state.gType,
        interaction_type: state.gInteractionType,
        is_published: state.gIsPublished,
        display_feedback: state.gDisplayFeedback,
        display_shadow: state.gDisplayShadow,
        correct_feedback: state.gCorrectFeedback,
        incorrect_feedback: state.gIncorrectFeedback,
        needs_submit: state.gNeedsSubmit,

        show_intersection: state.gShowIntersection,
        intersection_label: state.gIntersectionLabel,
        intersection_label_editable: state.gIntersectionLabelEditable,
        intersection_horiz_line_label: state.gIntersectionHorizLineLabel,
        intersection_horiz_line_label_editable: state.gIntersectionHorizLineLabelEditable,
        intersection_vert_line_label: state.gIntersectionVertLineLabel,
        intersection_vert_line_label_editable: state.gIntersectionVertLineLabelEditable,

        line_1_slope: forceFloat(state.gLine1Slope),
        line_1_slope_editable: state.gLine1SlopeEditable,
        line_2_slope: forceFloat(state.gLine2Slope),
        line_2_slope_editable: state.gLine2SlopeEditable,
        line_1_offset_x: forceFloat(state.gLine1OffsetX),
        line_1_offset_y: forceFloat(state.gLine1OffsetY),
        line_2_offset_x: forceFloat(state.gLine2OffsetX),
        line_2_offset_y: forceFloat(state.gLine2OffsetY),
        line_1_label: state.gLine1Label,
        line_1_label_editable: state.gLine1LabelEditable,
        line_2_label: state.gLine2Label,
        line_2_label_editable: state.gLine2LabelEditable,

        alpha: forceFloat(state.gAlpha),
        omega: forceFloat(state.gOmega),

        a1: forceFloat(state.gA1),
        a1_editable: state.gA1Editable,
        a2: forceFloat(state.gA2),
        a2_editable: state.gA2Editable,
        a3: forceFloat(state.gA3),
        a3_editable: state.gA3Editable,
        a4: forceFloat(state.gA4),
        a4_editable: state.gA4Editable,
        a5: forceFloat(state.gA5),
        a5_editable: state.gA5Editable,

        a: forceFloat(state.gA),
        k: forceFloat(state.gK),
        r: forceFloat(state.gR),
        y1: forceFloat(state.gY1),
        y2: forceFloat(state.gY2),

        x_axis_label: state.gXAxisLabel,
        x_axis_label_editable: state.gXAxisLabelEditable,
        y_axis_label: state.gYAxisLabel,
        y_axis_label_editable: state.gYAxisLabelEditable,

        // I'm using these A and K fields for the non-linear
        // demand-supply graph and the cobb-douglas graph. The names
        // should be generalized.
        cobb_douglas_a: forceFloat(state.gCobbDouglasA),
        cobb_douglas_k: forceFloat(state.gCobbDouglasK)
    }

    if (state.gType === 3) {
        // Don't send all these cobb-douglas related fields if not
        // saving a cobb-douglas graph.
        const cobb = {
            cobb_douglas_a_name: state.gCobbDouglasAName,
            cobb_douglas_a_editable: state.gCobbDouglasAEditable,
            cobb_douglas_l: forceFloat(state.gCobbDouglasL),
            cobb_douglas_l_name: state.gCobbDouglasLName,
            cobb_douglas_l_editable: state.gCobbDouglasLEditable,
            cobb_douglas_k_name: state.gCobbDouglasKName,
            cobb_douglas_k_editable: state.gCobbDouglasKEditable,
            cobb_douglas_alpha: forceFloat(state.gCobbDouglasAlpha),
            cobb_douglas_alpha_editable: state.gCobbDouglasAlphaEditable,
            cobb_douglas_y_name: state.gCobbDouglasYName,
            cobb_douglas_correct_scenario: state.gCobbDouglasCorrectScenario
        };
        Object.assign(obj, cobb);
    } else if (state.gType === 0) {
        const demandSupplyScore = {
            line_1_feedback_increase: state.gLine1FeedbackIncrease,
            line_1_increase_score: forceFloat(state.gLine1IncreaseScore),
            line_1_feedback_decrease: state.gLine1FeedbackDecrease,
            line_1_decrease_score: forceFloat(state.gLine1DecreaseScore),
            line_2_feedback_increase: state.gLine2FeedbackIncrease,
            line_2_increase_score: forceFloat(state.gLine2IncreaseScore),
            line_2_feedback_decrease: state.gLine2FeedbackDecrease,
            line_2_decrease_score: forceFloat(state.gLine2DecreaseScore)
        };
        Object.assign(obj, demandSupplyScore);
    }

    return obj;
};

/**
 * Import the json graph into the current state.
 */
const importGraph = function(json, obj) {
    const updateObj = {
        gId: json.id,
        gTitle: json.title,
        gDescription: json.description,
        gInstructorNotes: json.instructor_notes,
        gType: json.graph_type,
        gInteractionType: json.interaction_type,
        gIsPublished: json.is_published,
        gDisplayFeedback: json.display_feedback,
        gDisplayShadow: json.display_shadow,
        gCorrectFeedback: json.correct_feedback,
        gIncorrectFeedback: json.incorrect_feedback,
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
        gLine1OffsetX: window.parseFloat(json.line_1_offset_x),
        gLine1OffsetY: window.parseFloat(json.line_1_offset_y),
        gLine2OffsetX: window.parseFloat(json.line_2_offset_x),
        gLine2OffsetY: window.parseFloat(json.line_2_offset_y),
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

        gAlpha: window.parseFloat(json.alpha),
        gOmega: window.parseFloat(json.omega),

        gA1: window.parseFloat(json.a1),
        gA1Editable: json.a1_editable,
        gA2: window.parseFloat(json.a2),
        gA2Editable: json.a2_editable,
        gA3: window.parseFloat(json.a3),
        gA3Editable: json.a3_editable,
        gA4: window.parseFloat(json.a4),
        gA4Editable: json.a4_editable,
        gA5: window.parseFloat(json.a5),
        gA5Editable: json.a5_editable,

        gA: window.parseFloat(json.a),
        gK: window.parseFloat(json.k),
        gR: window.parseFloat(json.r),
        gY1: window.parseFloat(json.y1),
        gY2: window.parseFloat(json.y2),

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
        gCobbDouglasAlphaEditable: json.cobb_douglas_alpha_editable,
        gCobbDouglasYName: json.cobb_douglas_y_name,
        gCobbDouglasCorrectScenario: json.cobb_douglas_correct_scenari,

        // Save some initial state here for the shadow feature
        gLine1OffsetXInitial: window.parseFloat(json.line_1_offset_x),
        gLine1OffsetYInitial: window.parseFloat(json.line_1_offset_y),
        gLine1SlopeInitial: window.parseFloat(json.line_1_slope),
        gLine2OffsetXInitial: window.parseFloat(json.line_2_offset_x),
        gLine2OffsetYInitial: window.parseFloat(json.line_2_offset_y),
        gLine2SlopeInitial: window.parseFloat(json.line_2_slope),
        gA1Initial: window.parseFloat(json.a1),
        gA2Initial: window.parseFloat(json.a2),
        gA3Initial: window.parseFloat(json.a3),
        gA4Initial: window.parseFloat(json.a4),
        gCobbDouglasAInitial: window.parseFloat(json.cobb_douglas_a),
        gCobbDouglasLInitial: window.parseFloat(json.cobb_douglas_l),
        gCobbDouglasKInitial: window.parseFloat(json.cobb_douglas_k),
        gCobbDouglasAlphaInitial: window.parseFloat(json.cobb_douglas_alpha)
    };
    obj.setState(updateObj);
};

const defaultGraph = {
    // Graph options
    gId: null,
    gType: null,
    gTitle: '',
    gDescription: '',
    gInstructorNotes: '',
    gNeedsSubmit: false,
    gShowIntersection: true,
    gDisplayShadow: true,

    gIntersectionLabel: '',
    gIntersectionHorizLineLabel: '',
    gIntersectionVertLineLabel: '',
    gLine1Slope: 1,
    gLine2Slope: -1,
    gLine1OffsetX: 0,
    gLine1OffsetY: 0,
    gLine2OffsetX: 0,
    gLine2OffsetY: 0,
    gLine1Label: '',
    gLine2Label: '',
    gXAxisLabel: '',
    gYAxisLabel: '',
    gLine1FeedbackIncrease: '',
    gLine1FeedbackDecrease: '',
    gLine2FeedbackIncrease: '',
    gLine2FeedbackDecrease: '',

    gAlpha: 0.3,
    gOmega: 1,

    gA1: 0,
    gA1Editable: true,
    gA2: 0,
    gA2Editable: true,
    gA3: 0,
    gA3Editable: true,
    gA4: 0,
    gA4Editable: true,
    gA5: 0,
    gA5Editable: true,

    gA: 3,
    gK: 2,
    gR: 0,
    gY1: 0,
    gY2: 0,

    gCobbDouglasA: 2,
    gCobbDouglasAName: 'A',
    gCobbDouglasL: 5,
    gCobbDouglasLName: 'L',
    gCobbDouglasK: 1,
    gCobbDouglasKName: 'K',
    gCobbDouglasAlpha: 0.65,
    gCobbDouglasYName: 'Y'
};

export { exportGraph, importGraph, defaultGraph };
