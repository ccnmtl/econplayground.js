/* eslint-env jest */

import { getOffset } from './utils';

it('calculates correct offset', () => {
    expect(getOffset(1, 0, 2.5)).toBe(0);
    expect(getOffset(1, 1, 2.5)).toBe(1);
    expect(getOffset(-1.5, 7, 2.5)).toBe(0.75);
    expect(getOffset(-1.5, 7, 1)).toBe(4.5);
});
