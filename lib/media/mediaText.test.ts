import { describe, expect, it } from 'vitest';

import { getLayoutClasses, shouldShowTitleAboveGrid } from './mediaText';

describe('getLayoutClasses', () => {
  it('keeps portrait layouts as two-column grids at all sizes', () => {
    const smallLeft = getLayoutClasses('portrait', true, 'small');
    const standardLeft = getLayoutClasses('portrait', true, 'standard');
    const largeLeft = getLayoutClasses('portrait', true, 'large');

    expect(smallLeft.grid).toContain('grid-cols-[');
    expect(smallLeft.grid).toContain('0.55fr');
    expect(smallLeft.grid).toContain('1.45fr');
    expect(standardLeft.grid).toContain('0.85fr');
    expect(standardLeft.grid).toContain('1.15fr');
    expect(largeLeft.grid).toContain('0.9fr');
  });

  it('keeps landscape layouts as two-column grids too', () => {
    expect(getLayoutClasses('landscape', false).grid).toContain('grid-cols-[');
  });

  it('keeps the portrait sizes aligned with the size choice', () => {
    expect(getLayoutClasses('portrait', false, 'small').sizes).toContain('10vw');
    expect(getLayoutClasses('portrait', false, 'standard').sizes).toContain('20vw');
    expect(getLayoutClasses('portrait', false, 'large').sizes).toContain('24vw');
  });

  it('shows the title above the grid only for landscape or portrait small', () => {
    expect(shouldShowTitleAboveGrid('landscape', 'large')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'small')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'standard')).toBe(false);
    expect(shouldShowTitleAboveGrid('portrait', 'large')).toBe(false);
  });
});
