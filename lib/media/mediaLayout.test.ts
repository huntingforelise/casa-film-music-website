import { describe, expect, it } from 'vitest';

import { getMediaAspectClass } from './mediaLayout';

describe('getMediaAspectClass', () => {
  it('uses fixed aspect ratios for video', () => {
    expect(getMediaAspectClass('video', 'landscape')).toBe('aspect-video');
    expect(getMediaAspectClass('video', 'portrait')).toBe('aspect-[9/16]');
  });

  it('uses photo-specific aspect ratios', () => {
    expect(getMediaAspectClass('photo', 'landscape')).toBe('aspect-[4/3]');
    expect(getMediaAspectClass('photo', 'portrait')).toBe('aspect-[4/5]');
  });
});
