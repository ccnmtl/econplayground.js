/**
 * Assessment.js
 *
 * Here's an example assessment configuration for a quiz graph:
 *
 * Columns:
 *    Name, Value, Feedback (fulfilled), feedback (unfulfilled), score
 *
 * [
 *   ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1.0],
 *   ['line1label', 'Alternative solution', 'Correct!', 'Sorry, try again', 0.9],
 *   ['line1slope', 'increase', 'Correct!', 'Sorry, try again', 1.0],
 *   ['line1intercept', 'any', 'Are you sure you\'re moving the right line?'],
 *   ['line2intercept', 'decrease', 'Correct!', 'Sorry, try again', 1.0]
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
     * Evaluate an action. This function takes an Action and returns a
     * Response.
     *
     * An Action consists of a name and a value.
     *
     * A Response is textual feedback and a numerical score.
     */
    evalAction(action) {
        for (let i = 0; i < this.assessment.length; i++) {
            if (this.assessment[i][0] === action.action) {
                if (action.value === this.assessment[i][1]) {
                    // Action fulfilled
                    return {
                        feedback: this.assessment[i][2],
                        score: this.assessment[i][4]
                    };
                } else {
                    // Action unfulfilled
                    return {
                        feedback: this.assessment[i][3],
                        score: 0
                    };
                }
            }
        }

        return null;
    }
}
