import { describe, expect, it } from 'vitest';

import { getMediaRowGridClass, getMediaRowSizes } from './mediaRow';

describe('getMediaRowGridClass', () => {
  it('maps item counts to the expected responsive grid classes', () => {
    expect(getMediaRowGridClass(1)).toBe('grid grid-cols-1');
    expect(getMediaRowGridClass(2)).toBe('grid grid-cols-1 sm:grid-cols-2');
    expect(getMediaRowGridClass(3)).toBe('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3');
    expect(getMediaRowGridClass(4)).toBe('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4');
  });
});

describe('getMediaRowSizes', () => {
  it('matches the grid width at each breakpoint', () => {
    expect(getMediaRowSizes(1)).toBe('100vw');
    expect(getMediaRowSizes(2)).toBe('(min-width: 640px) 50vw, 100vw');
    expect(getMediaRowSizes(3)).toBe('(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw');
    expect(getMediaRowSizes(4)).toBe(
      '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw',
    );
  });
});
