/* eslint-env jest */

import Assessment from './Assessment';

it('Defaults to an empty array', () => {
    const a = new Assessment();
    expect(a.assessment.length).toBe(0);
});

it('Evaluates a basic action', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1.0],
        ['line1label', 'Alternative solution', 'Correct!', 'Sorry, try again', 0.9],
        ['line1slope', 'increase', 'Correct!', 'Sorry, try again', 1.0],
        ['line1intercept', 'any', 'Are you sure you\'re moving the right line?'],
        ['line2intercept', 'decrease', 'Correct!', 'Sorry, try again', 1.0]
    ]);
    const action = {action: 'line1label', value: 'Demand'};
    const response = {feedback: 'Correct!', score: 1};
    expect(a.evalAction(action)).toEqual(response);
});
