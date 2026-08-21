import { describe, expect, it } from '@jest/globals';

import { typingIntervalFor } from './reveal-text';

describe('typingIntervalFor', () => {
  it('keeps short and long reveals within readable limits', () => {
    expect(typingIntervalFor(3)).toBe(90);
    expect(typingIntervalFor(100)).toBe(35);
    expect(typingIntervalFor(10)).toBe(90);
  });
});
