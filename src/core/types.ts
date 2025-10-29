/**
 * Core types for the Aura visual effects system
 */

export interface Point {
  x: number;
  y: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum BlendMode {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Add = 'lighter',
  Darken = 'darken',
  Lighten = 'lighten'
}

export interface RenderContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  deltaTime: number;
}

export interface NodeOutput {
  data: any;
  timestamp: number;
}

export interface NodeConnection {
  fromNodeId: string;
  fromOutput: string;
  toNodeId: string;
  toInput: string;
}
