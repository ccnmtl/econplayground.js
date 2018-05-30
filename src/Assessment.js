/**
 * Assessment.js
 *
 * Here's an example assessment configuration for a quiz graph:
 *
 * Columns:
 *    Name, Value, Feedback (fulfilled), feedback (unfulfilled), score
 *
 * [
 *   ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
 *   ['line1label', 'Alternative solution', 'Correct!', 'Sorry, try again', 0.9],
 *   ['line1slope', 'increase', 'Correct!', 'Sorry, try again', 1],
 *   ['line1intercept', 'any', 'Are you sure you\'re moving the right line?'],
 *   ['line2intercept', 'decrease', 'Correct!', 'Sorry, try again', 1]
 * ]
 *
 * Given this data, if a student fills out Line 1's label with
 * "Demand" and submits the quiz, they get 100%. If they fill in Line
 * 1's label with "Alternative solution", they get 90%. If they
 * increase Line 1's slope from its original position, they get 100%.
 * Or, if they drag Line 2 down and submit they get 100%.
 *
 * If the student drags Line 1, they get the message "Are you sure
 * you're moving the right line?" There is no score associated with
 * this action - it's only meant for feedback.
 *
 * To facilitate situations where multiple criteria are needed to
 * achieve the correct solution, the instructor checks a box on the
 * graph that tells the system to require all rows of the data to be
 * fulfilled instead of any of them.
 */

export default class Assessment {
    constructor(assessment=[]) {
        this.assessment = assessment;
    }

    /**
     * Given an action, return its type.
     *
     * Right now, there are two different action types. I'm
     * classifying them as 'label' and 'movement'.
     *
     * To evaluate a label action, the user's input is
     * fuzzy-matched with the correct answer (case-insensitive,
     * whitespace ignored).
     *
     * A movement action can be a slope change or a y-intercept
     * change. From the user's perspective, this is a slider
     * movement or a line drag. The new value is compared with the
     * original value. The assessment system then finds out
     * whether this was in 'increase', 'decrease', or 'any' for
     * any value change.
     *
     * We can assume that any action whose name ends in 'label' is a
     * label action. For now, everything else is considered a
     * movement.
     */
    getActionType(action) {
        if (action.name.endsWith('label')) {
            return 'label';
        } else {
            return 'movement';
        }
    }

    /**
     * Extract a row (array) into an object.
     */
    extractRow(row) {
        return {
            name: row[0],
            value: row[1],
            feedback_fulfilled: row[2],
            feedback_unfulfilled: row[3],
            score: row[4]
        };
    }

    /**
     * Remove case and whitespace from text.
     *
     * Used for fuzzy-matching labels and attribute names.
     */
    stripText(s) {
        return s.toLowerCase().replace(/ /g, '');
    }

    evalActionWithType(assessment, userAction, actionType) {
        if (actionType === 'label') {
            return this.stripText(assessment.value) ===
                this.stripText(userAction.value);
        } else {
            return assessment.value === userAction.value;
        }
    }

    /**
     * Evaluate an action. This function takes an Action and returns a
     * Response.
     *
     * An Action consists of a name and a value.
     *
     * A Response is textual feedback and a numerical score.
     */
    evalAction(action) {
        for (let i = 0; i < this.assessment.length; i++) {
            let row = this.extractRow(this.assessment[i]);

            if (this.stripText(row.name) === this.stripText(action.name)) {
                if (this.evalActionWithType(row, action, this.getActionType(row))) {
                    // Action fulfilled
                    return {
                        feedback: row.feedback_fulfilled,
                        score: row.score
                    };
                } else {
                    // Action unfulfilled
                    return {
                        feedback: row.feedback_unfulfilled,
                        score: 0
                    };
                }
            }
        }

        return null;
    }

    // Remove the leading 'g' and make lowercase.
    translateKey(key) {
        return key.replace(/^g/, '').toLowerCase();
    }

    /**
     * Assess the given state.
     */
    evalState(state) {
        let result = null;

        for (let key in state) {
            if (key.endsWith('Label')) {
                result = this.evalAction({
                    name: this.translateKey(key),
                    value: state[key]
                });

                if (result) {
                    return result;
                }
            }
        }

        return {
            feedback: null,
            score: null
        };
    }
}
