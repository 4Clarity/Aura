/**
 * Utility functions for Aura
 */

import { Color, Point } from '../core/types';

export class ColorUtils {
  static rgbToHex(color: Color): string {
    const r = Math.floor(color.r).toString(16).padStart(2, '0');
    const g = Math.floor(color.g).toString(16).padStart(2, '0');
    const b = Math.floor(color.b).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  static hexToRgb(hex: string): Color {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1
        }
      : { r: 0, g: 0, b: 0, a: 1 };
  }

  static lerp(color1: Color, color2: Color, t: number): Color {
    return {
      r: color1.r + (color2.r - color1.r) * t,
      g: color1.g + (color2.g - color1.g) * t,
      b: color1.b + (color2.b - color1.b) * t,
      a: color1.a + (color2.a - color1.a) * t
    };
  }
}

export class MathUtils {
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

export class IdGenerator {
  private static counter = 0;

  static generate(prefix: string = 'node'): string {
    return `${prefix}_${Date.now()}_${++this.counter}`;
  }
}
