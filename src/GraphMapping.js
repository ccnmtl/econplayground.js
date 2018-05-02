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
        assignment_type: state.gAssignmentType,
        is_published: state.gIsPublished,
        display_feedback: state.gDisplayFeedback,
        display_shadow: state.gDisplayShadow,
        correct_feedback: state.gCorrectFeedback,
        incorrect_feedback: state.gIncorrectFeedback,
        needs_submit: state.gNeedsSubmit,

        show_intersection: state.gShowIntersection,
        intersection_label: state.gIntersectionLabel,

        intersection_2_label: state.gIntersection2Label,
        intersection_3_label: state.gIntersection3Label,

        intersection_horiz_line_label: state.gIntersectionHorizLineLabel,
        intersection_vert_line_label: state.gIntersectionVertLineLabel,
        intersection_2_horiz_line_label: state.gIntersection2HorizLineLabel,
        intersection_2_vert_line_label: state.gIntersection2VertLineLabel,
        intersection_3_horiz_line_label: state.gIntersection3HorizLineLabel,
        intersection_3_vert_line_label: state.gIntersection3VertLineLabel,

        display_intersection_1: state.gDisplayIntersection1,
        display_intersection_2: state.gDisplayIntersection2,
        display_intersection_3: state.gDisplayIntersection3,

        line_1_slope: forceFloat(state.gLine1Slope),
        line_2_slope: forceFloat(state.gLine2Slope),
        line_3_slope: forceFloat(state.gLine3Slope),
        line_1_offset_x: forceFloat(state.gLine1OffsetX),
        line_1_offset_y: forceFloat(state.gLine1OffsetY),
        line_2_offset_x: forceFloat(state.gLine2OffsetX),
        line_2_offset_y: forceFloat(state.gLine2OffsetY),
        line_3_offset_x: forceFloat(state.gLine3OffsetX),
        line_3_offset_y: forceFloat(state.gLine3OffsetY),
        line_1_label: state.gLine1Label,
        line_2_label: state.gLine2Label,
        line_3_label: state.gLine3Label,

        line_1_dashed: state.gLine1Dashed,
        line_2_dashed: state.gLine2Dashed,
        line_3_dashed: state.gLine3Dashed,

        alpha: forceFloat(state.gAlpha),
        omega: forceFloat(state.gOmega),

        a1: forceFloat(state.gA1),
        a2: forceFloat(state.gA2),
        a3: forceFloat(state.gA3),
        a4: forceFloat(state.gA4),
        a5: forceFloat(state.gA5),

        a: forceFloat(state.gA),
        k: forceFloat(state.gK),
        r: forceFloat(state.gR),
        y1: forceFloat(state.gY1),
        y2: forceFloat(state.gY2),

        x_axis_label: state.gXAxisLabel,
        y_axis_label: state.gYAxisLabel,

        // I'm using these A and K fields for the non-linear
        // demand-supply graph and the cobb-douglas graph. The names
        // should be generalized.
        cobb_douglas_a: forceFloat(state.gCobbDouglasA),
        cobb_douglas_k: forceFloat(state.gCobbDouglasK),
    }

    if (state.gType === 3) {
        // Don't send all these cobb-douglas related fields if not
        // saving a cobb-douglas graph.
        const cobb = {
            cobb_douglas_a_name: state.gCobbDouglasAName,
            cobb_douglas_l: forceFloat(state.gCobbDouglasL),
            cobb_douglas_l_name: state.gCobbDouglasLName,
            cobb_douglas_k_name: state.gCobbDouglasKName,
            cobb_douglas_alpha: forceFloat(state.gCobbDouglasAlpha),
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
        gAssignmentType: json.assignment_type,
        gIsPublished: json.is_published,
        gDisplayFeedback: json.display_feedback,
        gDisplayShadow: json.display_shadow,
        gCorrectFeedback: json.correct_feedback,
        gIncorrectFeedback: json.incorrect_feedback,
        gNeedsSubmit: json.needs_submit,

        gShowIntersection: json.show_intersection,
        gDisplayIntersection1: json.display_intersection_1,
        gDisplayIntersection2: json.display_intersection_2,
        gDisplayIntersection3: json.display_intersection_3,
        gIntersectionLabel: json.intersection_label,
        gIntersection2Label: json.intersection_2_label,
        gIntersection3Label: json.intersection_3_label,

        gIntersectionHorizLineLabel: json.intersection_horiz_line_label,
        gIntersectionVertLineLabel: json.intersection_vert_line_label,
        gIntersection2HorizLineLabel: json.intersection_2_horiz_line_label,
        gIntersection2VertLineLabel: json.intersection_2_vert_line_label,
        gIntersection3HorizLineLabel: json.intersection_3_horiz_line_label,
        gIntersection3VertLineLabel: json.intersection_3_vert_line_label,

        gLine1Slope: window.parseFloat(json.line_1_slope),
        gLine2Slope: window.parseFloat(json.line_2_slope),
        gLine3Slope: window.parseFloat(json.line_3_slope),
        gLine1OffsetX: window.parseFloat(json.line_1_offset_x),
        gLine1OffsetY: window.parseFloat(json.line_1_offset_y),
        gLine2OffsetX: window.parseFloat(json.line_2_offset_x),
        gLine2OffsetY: window.parseFloat(json.line_2_offset_y),
        gLine3OffsetX: window.parseFloat(json.line_3_offset_x),
        gLine3OffsetY: window.parseFloat(json.line_3_offset_y),
        gLine1Label: json.line_1_label,
        gLine2Label: json.line_2_label,
        gLine3Label: json.line_3_label,

        gLine1Dashed: json.line_1_dashed,
        gLine2Dashed: json.line_2_dashed,
        gLine3Dashed: json.line_3_dashed,

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
        gA2: window.parseFloat(json.a2),
        gA3: window.parseFloat(json.a3),
        gA4: window.parseFloat(json.a4),
        gA5: window.parseFloat(json.a5),

        gA: window.parseFloat(json.a),
        gK: window.parseFloat(json.k),
        gR: window.parseFloat(json.r),
        gY1: window.parseFloat(json.y1),
        gY2: window.parseFloat(json.y2),

        gXAxisLabel: json.x_axis_label,
        gYAxisLabel: json.y_axis_label,

        gCobbDouglasA: window.parseFloat(json.cobb_douglas_a),
        gCobbDouglasAName: json.cobb_douglas_a_name,
        gCobbDouglasL: window.parseFloat(json.cobb_douglas_l),
        gCobbDouglasLName: json.cobb_douglas_l_name,
        gCobbDouglasK: window.parseFloat(json.cobb_douglas_k),
        gCobbDouglasKName: json.cobb_douglas_k_name,
        gCobbDouglasAlpha: window.parseFloat(json.cobb_douglas_alpha),
        gCobbDouglasYName: json.cobb_douglas_y_name,
        gCobbDouglasCorrectScenario: json.cobb_douglas_correct_scenario
    };

    // When importing a graph for display, save the initial state of
    // everything in the global state separately. These values are
    // never updated through any sort of user interaction. Each
    // attribute will be accessible by appending "Initial" to its
    // name. This is used by both the shadow feature and assessment.
    let initialStateObj = {};
    let key = '';
    for (key in updateObj) {
        initialStateObj[key + 'Initial'] = updateObj[key];
    }

    obj.setState(Object.assign({}, updateObj, initialStateObj));
};

const defaultGraph = {
    // Graph options
    gId: null,
    gType: null,
    gAssignmentType: 0, // Default to "Template graph" - everything editable
    gTitle: '',
    gDescription: '',
    gInstructorNotes: '',
    gNeedsSubmit: false,
    gShowIntersection: true,
    gDisplayIntersection1: true,
    gDisplayIntersection2: false,
    gDisplayIntersection3: false,
    gDisplayShadow: true,
    gDisplayFeedback: false,
    gIsPublished: false,

    gIntersectionLabel: '',
    gIntersection2Label: '',
    gIntersection3Label: '',

    gIntersectionHorizLineLabel: '',
    gIntersectionVertLineLabel: '',
    gIntersection2HorizLineLabel: '',
    gIntersection2VertLineLabel: '',
    gIntersection3HorizLineLabel: '',
    gIntersection3VertLineLabel: '',

    gLine1Slope: 1,
    gLine2Slope: -1,
    gLine3Slope: 999,
    gLine3Label: '',
    gLine1OffsetX: 0,
    gLine1OffsetY: 0,
    gLine2OffsetX: 0,
    gLine2OffsetY: 0,
    gLine3OffsetX: 0,
    gLine3OffsetY: 0,
    gLine1Label: '',
    gLine2Label: '',
    gLine1Dashed: false,
    gLine2Dashed: false,
    gLine3Dashed: false,
    gXAxisLabel: '',
    gYAxisLabel: '',
    gCorrectFeedback: '',
    gIncorrectFeedback: '',
    gLine1FeedbackIncrease: '',
    gLine1FeedbackDecrease: '',
    gLine2FeedbackIncrease: '',
    gLine2FeedbackDecrease: '',

    gAlpha: 0.3,
    gOmega: 1,

    gA1: 0,
    gA2: 0,
    gA3: 0,
    gA4: 0,
    gA5: 0,

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
    gCobbDouglasYName: 'Y',

    // Use a hard-coded proof-of-concept assessment spreadsheet for
    // now. Eventually, this will be defined using a Google
    // Spreadsheet, or some react-spreadsheet component with its data
    // stored in our database. The details of that aren't so important
    // right now. I'll remove this once I have the graphs displaying
    // feedback and setting scores based on this format here.
    assessment: []
};

export { exportGraph, importGraph, defaultGraph };
