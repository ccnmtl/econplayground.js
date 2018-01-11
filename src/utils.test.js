/* eslint-env jest */

import { exportFloat, getOffset } from './utils';

it('allows many values for floats', () => {
    expect(exportFloat(null)).toBe(0);
    expect(exportFloat(0)).toBe(0);
    expect(exportFloat(undefined)).toBe(0);
    expect(exportFloat(2.4)).toBe(2.4);
    expect(exportFloat(2.46666)).toBe(2.47);
    expect(exportFloat('2.4666')).toBe(2.47);
    expect(exportFloat('100')).toBe(100);
    expect(exportFloat('whatever')).toBe(0);
});

it('calculates correct offset', () => {
    expect(getOffset(1, 0, 2.5)).toBe(0);
    expect(getOffset(1, 1, 2.5)).toBe(1);
    expect(getOffset(-1.5, 7, 2.5)).toBe(0.75);
    expect(getOffset(-1.5, 7, 1)).toBe(4.5);
});
