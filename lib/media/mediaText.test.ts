import { describe, expect, it } from 'vitest';

import { getLayoutClasses, shouldShowTitleAboveGrid } from './mediaText';

describe('getLayoutClasses', () => {
  it('keeps portrait layouts as two-column grids at all sizes', () => {
    const smallPhotoLeft = getLayoutClasses('portrait', true, 'small', 'photo');
    const standardPhotoLeft = getLayoutClasses('portrait', true, 'standard', 'photo');
    const largePhotoLeft = getLayoutClasses('portrait', true, 'large', 'photo');
    const smallVideoLeft = getLayoutClasses('portrait', true, 'small', 'video');
    const standardVideoLeft = getLayoutClasses('portrait', true, 'standard', 'video');
    const largeVideoLeft = getLayoutClasses('portrait', true, 'large', 'video');

    expect(smallPhotoLeft.grid).toContain('grid-cols-[');
    expect(smallPhotoLeft.grid).toContain('0.55fr');
    expect(smallPhotoLeft.grid).toContain('1.45fr');
    expect(standardPhotoLeft.grid).toContain('0.8fr');
    expect(standardPhotoLeft.grid).toContain('1.2fr');
    expect(largePhotoLeft.grid).toContain('0.95fr');
    expect(largePhotoLeft.grid).toContain('1.05fr');
    expect(smallVideoLeft.grid).toContain('0.55fr');
    expect(smallVideoLeft.grid).toContain('1.45fr');
    expect(standardVideoLeft.grid).toContain('0.8fr');
    expect(standardVideoLeft.grid).toContain('1.2fr');
    expect(largeVideoLeft.grid).toContain('0.95fr');
    expect(largeVideoLeft.grid).toContain('1.05fr');
  });

  it('keeps landscape layouts as two-column grids too', () => {
    const smallLandscapePhotoLeft = getLayoutClasses('landscape', true, 'large', 'photo', 'small');
    const smallLandscapePhotoRight = getLayoutClasses('landscape', false, 'large', 'photo', 'small');
    const largeLandscapePhotoLeft = getLayoutClasses('landscape', true, 'large', 'photo', 'large');
    const largeLandscapePhotoRight = getLayoutClasses('landscape', false, 'large', 'photo', 'large');
    const smallLandscapeVideoLeft = getLayoutClasses('landscape', true, 'large', 'video', 'small');
    const smallLandscapeVideoRight = getLayoutClasses('landscape', false, 'large', 'video', 'small');
    const largeLandscapeVideoLeft = getLayoutClasses('landscape', true, 'large', 'video', 'large');
    const largeLandscapeVideoRight = getLayoutClasses('landscape', false, 'large', 'video', 'large');

    expect(smallLandscapePhotoLeft.grid).toContain('0.7fr');
    expect(smallLandscapePhotoLeft.grid).toContain('1.3fr');
    expect(smallLandscapePhotoRight.grid).toContain('1.3fr');
    expect(smallLandscapePhotoRight.grid).toContain('0.7fr');
    expect(largeLandscapePhotoLeft.grid).toContain('1.1fr');
    expect(largeLandscapePhotoLeft.grid).toContain('0.9fr');
    expect(largeLandscapePhotoRight.grid).toContain('0.9fr');
    expect(largeLandscapePhotoRight.grid).toContain('1.1fr');
    expect(smallLandscapeVideoLeft.grid).toContain('0.9fr');
    expect(smallLandscapeVideoLeft.grid).toContain('1.1fr');
    expect(smallLandscapeVideoRight.grid).toContain('1.1fr');
    expect(smallLandscapeVideoRight.grid).toContain('0.9fr');
    expect(largeLandscapeVideoLeft.grid).toContain('1.2fr');
    expect(largeLandscapeVideoLeft.grid).toContain('0.8fr');
    expect(largeLandscapeVideoRight.grid).toContain('0.8fr');
    expect(largeLandscapeVideoRight.grid).toContain('1.2fr');
  });

  it('keeps the portrait sizes aligned with the size choice', () => {
    expect(getLayoutClasses('portrait', false).sizes).toContain('16vw');
    expect(getLayoutClasses('portrait', false, 'small', 'photo').sizes).toContain('10vw');
    expect(getLayoutClasses('portrait', false, 'standard', 'photo').sizes).toContain('16vw');
    expect(getLayoutClasses('portrait', false, 'large', 'photo').sizes).toContain('22vw');
    expect(getLayoutClasses('portrait', false, 'small', 'video').sizes).toContain('10vw');
    expect(getLayoutClasses('portrait', false, 'standard', 'video').sizes).toContain('16vw');
    expect(getLayoutClasses('portrait', false, 'large', 'video').sizes).toContain('22vw');
  });

  it('shows the title above the grid only for landscape or portrait small', () => {
    expect(shouldShowTitleAboveGrid('landscape', 'large')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'small')).toBe(true);
    expect(shouldShowTitleAboveGrid('portrait', 'standard')).toBe(false);
    expect(shouldShowTitleAboveGrid('portrait', 'large')).toBe(false);
  });
});
