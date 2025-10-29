/**
 * Rendering Engine - manages the animation loop and rendering
 */

import { RenderContext } from '../core/types';
import { LayerManager } from '../layers/Layer';

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fps?: number;
}

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private backgroundColor: string;
  private targetFps: number;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private layerManager: LayerManager;
  private startTime: number = 0;

  constructor(config: RendererConfig) {
    this.canvas = config.canvas;
    this.width = config.width || this.canvas.width || 800;
    this.height = config.height || this.canvas.height || 600;
    this.backgroundColor = config.backgroundColor || '#000000';
    this.targetFps = config.fps || 60;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;

    this.layerManager = new LayerManager();
  }

  getLayerManager(): LayerManager {
    return this.layerManager;
  }

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.renderLoop(this.startTime);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.layerManager.resize(width, height);
  }

  setBackgroundColor(color: string): void {
    this.backgroundColor = color;
  }

  private renderLoop(timestamp: number): void {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    const time = timestamp - this.startTime;

    // Frame rate limiting
    const frameInterval = 1000 / this.targetFps;
    if (deltaTime >= frameInterval) {
      this.render(time, deltaTime);
      this.lastFrameTime = timestamp - (deltaTime % frameInterval);
    }

    this.animationFrameId = requestAnimationFrame((ts) => this.renderLoop(ts));
  }

  private render(time: number, deltaTime: number): void {
    // Clear canvas
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Create render context
    const renderContext: RenderContext = {
      canvas: this.canvas,
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      time,
      deltaTime
    };

    // Render all layers
    this.layerManager.render(renderContext);
  }

  clear(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
