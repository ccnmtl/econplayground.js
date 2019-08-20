/* eslint-env jest */

import {
    forceFloat, getOffset,
    getGraphId, getCohortId
} from './utils';

it('allows many values for floats', () => {
    expect(forceFloat(null)).toBe(0);
    expect(forceFloat(0)).toBe(0);
    expect(forceFloat(undefined)).toBe(0);
    expect(forceFloat(2.4)).toBe(2.4);
    expect(forceFloat(2.46666)).toBe(2.47);
    expect(forceFloat('2.4666')).toBe(2.47);
    expect(forceFloat('100')).toBe(100);
    expect(forceFloat('whatever')).toBe(0);
});

it('calculates correct offset', () => {
    expect(getOffset(1, 0, 2.5)).toBe(0);
    expect(getOffset(1, 1, 2.5)).toBe(1);
    expect(getOffset(-1.5, 7, 2.5)).toBe(0.75);
    expect(getOffset(-1.5, 7, 1)).toBe(4.5);
});

it('gets the graph ID', () => {
    expect(getGraphId('/graph/24/')).toBe(24);
    expect(getGraphId('/course/14/graph/24/')).toBe(24);
    expect(getGraphId('/course/14/graph/1/')).toBe(1);

    expect(getGraphId('/')).toBe(null);
});

it('gets the cohort ID', () => {
    expect(getCohortId('/course/21/graph/24/')).toBe(21);
    expect(getCohortId('/course/21/')).toBe(21);
    expect(getCohortId('/course/21/edit/')).toBe(21);

    expect(getCohortId('/')).toBe(null);
});
