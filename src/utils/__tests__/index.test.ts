/**
 * Tests for utility functions
 */

import { ColorUtils, MathUtils, IdGenerator } from '../index';

describe('ColorUtils', () => {
  test('should convert RGB to hex', () => {
    const color = { r: 255, g: 100, b: 50, a: 1 };
    const hex = ColorUtils.rgbToHex(color);
    expect(hex).toBe('#ff6432');
  });

  test('should convert hex to RGB', () => {
    const rgb = ColorUtils.hexToRgb('#ff6432');
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(100);
    expect(rgb.b).toBe(50);
  });

  test('should lerp between colors', () => {
    const color1 = { r: 0, g: 0, b: 0, a: 0 };
    const color2 = { r: 100, g: 100, b: 100, a: 1 };
    const result = ColorUtils.lerp(color1, color2, 0.5);
    
    expect(result.r).toBe(50);
    expect(result.g).toBe(50);
    expect(result.b).toBe(50);
    expect(result.a).toBe(0.5);
  });
});

describe('MathUtils', () => {
  test('should clamp values', () => {
    expect(MathUtils.clamp(5, 0, 10)).toBe(5);
    expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
    expect(MathUtils.clamp(15, 0, 10)).toBe(10);
  });

  test('should lerp between numbers', () => {
    expect(MathUtils.lerp(0, 100, 0.5)).toBe(50);
    expect(MathUtils.lerp(10, 20, 0.25)).toBe(12.5);
  });

  test('should calculate distance between points', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 3, y: 4 };
    expect(MathUtils.distance(p1, p2)).toBe(5);
  });

  test('should generate random values in range', () => {
    for (let i = 0; i < 100; i++) {
      const value = MathUtils.randomRange(10, 20);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(20);
    }
  });

  test('should map values between ranges', () => {
    expect(MathUtils.map(5, 0, 10, 0, 100)).toBe(50);
    expect(MathUtils.map(0, 0, 10, 0, 100)).toBe(0);
    expect(MathUtils.map(10, 0, 10, 0, 100)).toBe(100);
  });
});

describe('IdGenerator', () => {
  test('should generate unique IDs', () => {
    const id1 = IdGenerator.generate();
    const id2 = IdGenerator.generate();
    
    expect(id1).not.toBe(id2);
  });

  test('should use custom prefix', () => {
    const id = IdGenerator.generate('custom');
    expect(id).toMatch(/^custom_/);
  });

  test('should include timestamp', () => {
    const id = IdGenerator.generate('test');
    expect(id).toMatch(/test_\d+_\d+/);
  });
});
