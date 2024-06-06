// modThree.test.ts

import { modThree, MAX_LENGTH } from './modThree';

describe('modThree Function', () => {
  it('should return 0 for input "1111"', () => {
    expect(modThree('1111')).toBe(0);
  });

  it('should return 1 for input "1101"', () => {
    expect(modThree('1101')).toBe(1);
  });

  it('should return 2 for input "1110"', () => {
    expect(modThree('1110')).toBe(2);
  });

  it('should return 0 for input "0"', () => {
    expect(modThree('0')).toBe(0);
  });

  it('should return 2 for input "10"', () => {
    expect(modThree('10')).toBe(2);
  });

  it('should return 0 for input "11"', () => {
    expect(modThree('11')).toBe(0);
  });
  it('should return 0 for input "0011" with leading "0"s', () => {
    expect(modThree('0011')).toBe(0);
  });

  it('should return 0 for empty string input', () => {
    expect(modThree('')).toBe(0);
  });

  it('should handle long binary strings correctly', () => {
    expect(modThree('101010101010')).toBe(0);
    expect(modThree('110110110111')).toBe(1);
  });

  it('should throw an error for invalid input', () => {
    expect(() => modThree('102')).toThrow('Invalid input: 2');
  });

  it('should throw an error if input string exceeds maximum length', () => {
    expect(() => modThree('110110110111000111001')).toThrow(
      `Input string exceeds maximum length of ${MAX_LENGTH}`,
    );
  });
});
