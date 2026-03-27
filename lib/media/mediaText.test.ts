import { describe, expect, it } from 'vitest';

import { getLayoutClasses, isSmallMediaLayout, shouldShowTitleAboveGrid } from './mediaText';

describe('getLayoutClasses', () => {
  it('stacks portrait layouts on mobile and switches to two columns at md', () => {
    const smallLeft = getLayoutClasses('portrait', true, 'small');
    const standardLeft = getLayoutClasses('portrait', true, 'standard');
    const largeLeft = getLayoutClasses('portrait', true, 'large');
    const smallRight = getLayoutClasses('portrait', false, 'small');

    expect(smallLeft.grid).toContain('grid-cols-1');
    expect(smallLeft.grid).toContain('md:[grid-template-columns:var(--media-text-cols)]');
    expect(smallLeft.textOrder).toBe('md:order-2');
    expect(smallLeft.mediaOrder).toBe('md:order-1');
    expect(smallLeft.style['--media-text-cols']).toBe('minmax(0,0.6fr) minmax(0,1.4fr)');
    expect(standardLeft.style['--media-text-cols']).toBe('minmax(0,0.8fr) minmax(0,1.2fr)');
    expect(largeLeft.style['--media-text-cols']).toBe('minmax(0,1fr) minmax(0,1fr)');
    expect(smallLeft.sizes).toContain('26vw');
    expect(standardLeft.sizes).toContain('36vw');
    expect(largeLeft.sizes).toContain('44vw');
    expect(smallRight.textOrder).toBe('md:order-1');
    expect(smallRight.mediaOrder).toBe('md:order-2');
    expect(smallRight.style['--media-text-cols']).toBe('minmax(0,1.4fr) minmax(0,0.6fr)');
  });

  it('stacks landscape layouts on mobile and switches to two columns at md', () => {
    const smallLeft = getLayoutClasses('landscape', true, 'standard', 'small');
    const smallRight = getLayoutClasses('landscape', false, 'standard', 'small');
    const largeLeft = getLayoutClasses('landscape', true, 'standard', 'large');
    const largeRight = getLayoutClasses('landscape', false, 'standard', 'large');

    expect(smallLeft.grid).toContain('grid-cols-1');
    expect(smallLeft.grid).toContain('md:[grid-template-columns:var(--media-text-cols)]');
    expect(smallLeft.textOrder).toBe('md:order-2');
    expect(smallLeft.mediaOrder).toBe('md:order-1');
    expect(smallLeft.style['--media-text-cols']).toBe('minmax(0,0.75fr) minmax(0,1.25fr)');
    expect(smallRight.style['--media-text-cols']).toBe('minmax(0,1.25fr) minmax(0,0.75fr)');
    expect(largeLeft.style['--media-text-cols']).toBe('minmax(0,1.1fr) minmax(0,0.9fr)');
    expect(largeRight.style['--media-text-cols']).toBe('minmax(0,0.9fr) minmax(0,1.1fr)');
    expect(smallLeft.sizes).toContain('32vw');
    expect(largeLeft.sizes).toContain('48vw');
  });

  it('keeps the portrait sizes aligned with the size choice', () => {
    expect(getLayoutClasses('portrait', false).sizes).toContain('40vw');
    expect(getLayoutClasses('portrait', false, 'small').sizes).toContain('30vw');
    expect(getLayoutClasses('portrait', false, 'standard').sizes).toContain('40vw');
    expect(getLayoutClasses('portrait', false, 'large').sizes).toContain('48vw');
  });

  it('treats small media as right-aligned only', () => {
    expect(isSmallMediaLayout('landscape', 'standard', 'small')).toBe(true);
    expect(isSmallMediaLayout('portrait', 'small', 'large')).toBe(true);
    expect(isSmallMediaLayout('landscape', 'standard', 'large')).toBe(false);
    expect(isSmallMediaLayout('portrait', 'standard', 'large')).toBe(false);
  });

  it('shows the title above the grid only for landscape or portrait small', () => {
    expect(shouldShowTitleAboveGrid('landscape', 'large')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'small')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'standard')).toBe(false);
    expect(shouldShowTitleAboveGrid('portrait', 'large')).toBe(false);
  });
});
