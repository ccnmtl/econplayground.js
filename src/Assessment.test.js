/* eslint-env jest */

import Assessment from './Assessment';

it('Defaults to an empty array', () => {
    const a = new Assessment();
    expect(a.assessment.length).toBe(0);
});

it('Evaluates a label action', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
        ['line1label', 'Alternative solution', 'Correct!', 'Sorry, try again', 0.9],
        ['line1slope', 'increase', 'Correct!', 'Sorry, try again', 1],
        ['line1intercept', 'any', 'Are you sure you\'re moving the right line?'],
        ['line2intercept', 'decrease', 'Correct!', 'Sorry, try again', 1]
    ]);
    let action = {name: 'line1label', value: 'Demand'};
    let response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: 'demand'};
    response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: ' demand  '};
    response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: 'nope'};
    response = {feedback: 'Sorry, try again', score: 0, fulfilled: false};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'not found', value: 'abc'};
    expect(a.evalAction(action)).toEqual(null);
});
