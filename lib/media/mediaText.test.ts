import { describe, expect, it } from 'vitest';

import type { PortableTextBlock } from '@/types/sections';
import {
  getLayoutClasses,
  getMediaTextContentDensity,
  getMediaTextVideoAspectClass,
  getMediaTextVideoZoom,
} from './mediaText';

const block = (text: string): PortableTextBlock => ({
  _key: text,
  _type: 'block',
  children: [
    {
      _key: `${text}-span`,
      _type: 'span',
      text,
    },
  ],
  markDefs: [],
});

describe('getMediaTextContentDensity', () => {
  it('categorizes short content as compact', () => {
    expect(getMediaTextContentDensity([block('Short sentence.')])).toBe('compact');
  });

  it('categorizes medium content as balanced', () => {
    expect(
      getMediaTextContentDensity([
        block(
          'A medium length paragraph with enough copy to feel balanced, give the layout some breathing room, and let the image sit alongside a confident block of text.',
        ),
        block(
          'A second paragraph adds just a little more substance so the section feels editorial rather than compact without becoming overly text heavy.',
        ),
      ]),
    ).toBe('balanced');
  });

  it('categorizes long content as expanded', () => {
    expect(
      getMediaTextContentDensity([
        block(
          'This is a long paragraph designed to push the section into the expanded range by increasing the weighted character count significantly, creating enough copy to justify a wider text column and a more generous editorial rhythm across the split layout.',
        ),
        block(
          'A second long paragraph continues the pattern and makes the text column deserve more room alongside the media, while also keeping the content visually grounded and editorial rather than cramped.',
        ),
        block(
          'A third paragraph extends the copy again so the layout can comfortably open up on larger screens without feeling like the media is being forced to compete for attention.',
        ),
        block(
          'A fourth paragraph pushes the total length clearly into the expanded range and gives the renderer a strong signal that the text should lead with more width and more breathing room.',
        ),
      ]),
    ).toBe('expanded');
  });
});

describe('getLayoutClasses', () => {
  it('uses wider media columns for compact landscape content', () => {
    const layout = getLayoutClasses('landscape', true, [block('Short sentence.')]);

    expect(layout.grid).toContain('grid-cols-1');
    expect(layout.grid).toContain('md:[grid-template-columns:var(--media-text-cols)]');
    expect(layout.grid).toContain('md:items-stretch');
    expect(layout.textOrder).toBe('md:order-2');
    expect(layout.mediaOrder).toBe('md:order-1');
    expect(layout.style['--media-text-cols']).toBe('minmax(0,1.18fr) minmax(0,0.82fr)');
    expect(layout.sizes).toContain('56vw');
  });

  it('gives portrait layouts more room for text as copy grows', () => {
    const layout = getLayoutClasses('portrait', false, [
      block(
        'This section uses a substantially longer paragraph so the portrait media can sit beside a more spacious text column without feeling cramped or visually compressed.',
      ),
      block(
        'A second paragraph reinforces the layout decision and keeps the grid balanced while still feeling calm and editorial.',
      ),
    ]);

    expect(layout.textOrder).toBe('md:order-1');
    expect(layout.mediaOrder).toBe('md:order-2');
    expect(layout.style['--media-text-cols']).toBe('minmax(0,1.1fr) minmax(0,0.9fr)');
    expect(layout.sizes).toContain('40vw');
  });
});

describe('getMediaTextVideoAspectClass', () => {
  it('uses a shorter portrait video frame in media text sections', () => {
    expect(getMediaTextVideoAspectClass('landscape')).toBe('aspect-video');
    expect(getMediaTextVideoAspectClass('portrait')).toBe('aspect-[4/5]');
  });
});

describe('getMediaTextVideoZoom', () => {
  it('zooms portrait videos a bit more to avoid edge whitespace', () => {
    expect(getMediaTextVideoZoom('landscape')).toBe(1.16);
    expect(getMediaTextVideoZoom('portrait')).toBe(1.48);
  });
});
