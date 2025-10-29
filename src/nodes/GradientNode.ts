/**
 * Gradient Node - generates gradient backgrounds
 */

import { Node, NodeInput, NodeOutputDef, NodeParameter } from '../core/Node';

export class GradientNode extends Node {
  constructor(id: string) {
    super(id, 'Gradient', 'gradient');
  }

  getInputDefinitions(): NodeInput[] {
    return [];
  }

  getOutputDefinitions(): NodeOutputDef[] {
    return [
      { name: 'render', type: 'canvas' }
    ];
  }

  getParameters(): NodeParameter[] {
    return [
      { 
        name: 'type', 
        type: 'select', 
        defaultValue: 'linear',
        options: ['linear', 'radial', 'conic']
      },
      { name: 'startX', type: 'number', defaultValue: 0, min: 0, max: 100 },
      { name: 'startY', type: 'number', defaultValue: 0, min: 0, max: 100 },
      { name: 'endX', type: 'number', defaultValue: 100, min: 0, max: 100 },
      { name: 'endY', type: 'number', defaultValue: 100, min: 0, max: 100 },
      { name: 'color1R', type: 'number', defaultValue: 255, min: 0, max: 255 },
      { name: 'color1G', type: 'number', defaultValue: 0, min: 0, max: 255 },
      { name: 'color1B', type: 'number', defaultValue: 150, min: 0, max: 255 },
      { name: 'color2R', type: 'number', defaultValue: 0, min: 0, max: 255 },
      { name: 'color2G', type: 'number', defaultValue: 150, min: 0, max: 255 },
      { name: 'color2B', type: 'number', defaultValue: 255, min: 0, max: 255 },
      { name: 'animate', type: 'boolean', defaultValue: true },
      { name: 'animationSpeed', type: 'number', defaultValue: 0.5, min: 0, max: 5, step: 0.1 }
    ];
  }

  process(_time: number, _deltaTime: number): void {
    this.setOutput('render', (ctx: CanvasRenderingContext2D, context: any) => {
      this.render(ctx, context);
    });
  }

  private render(ctx: CanvasRenderingContext2D, context: any): void {
    const type = this.getParameter('type');
    const startX = this.getParameter('startX') / 100;
    const startY = this.getParameter('startY') / 100;
    const endX = this.getParameter('endX') / 100;
    const endY = this.getParameter('endY') / 100;
    const color1R = this.getParameter('color1R');
    const color1G = this.getParameter('color1G');
    const color1B = this.getParameter('color1B');
    const color2R = this.getParameter('color2R');
    const color2G = this.getParameter('color2G');
    const color2B = this.getParameter('color2B');
    const animate = this.getParameter('animate');
    const animationSpeed = this.getParameter('animationSpeed');

    const width = context.width;
    const height = context.height;

    let offset = 0;
    if (animate) {
      offset = (context.time * animationSpeed * 0.001) % 1;
    }

    let gradient: CanvasGradient;

    if (type === 'linear') {
      const x1 = startX * width;
      const y1 = startY * height;
      const x2 = endX * width;
      const y2 = endY * height;
      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else if (type === 'radial') {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) * 0.7;
      gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    } else {
      // conic - with fallback for older browsers
      const centerX = width / 2;
      const centerY = height / 2;
      if (typeof ctx.createConicGradient === 'function') {
        gradient = ctx.createConicGradient(offset * Math.PI * 2, centerX, centerY);
      } else {
        // Fallback to radial gradient for browsers without conic gradient support
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.7);
      }
    }

    const color1 = `rgb(${color1R}, ${color1G}, ${color1B})`;
    const color2 = `rgb(${color2R}, ${color2G}, ${color2B})`;

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}
