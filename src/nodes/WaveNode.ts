/**
 * Wave Node - generates wave patterns
 */

import { Node, NodeInput, NodeOutputDef, NodeParameter } from '../core/Node';

export class WaveNode extends Node {
  constructor(id: string) {
    super(id, 'Wave', 'wave');
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
      { name: 'amplitude', type: 'number', defaultValue: 50, min: 10, max: 200 },
      { name: 'frequency', type: 'number', defaultValue: 2, min: 0.1, max: 10, step: 0.1 },
      { name: 'speed', type: 'number', defaultValue: 1, min: 0.1, max: 5, step: 0.1 },
      { name: 'lineWidth', type: 'number', defaultValue: 2, min: 1, max: 10 },
      { name: 'colorR', type: 'number', defaultValue: 100, min: 0, max: 255 },
      { name: 'colorG', type: 'number', defaultValue: 200, min: 0, max: 255 },
      { name: 'colorB', type: 'number', defaultValue: 255, min: 0, max: 255 },
      { name: 'numWaves', type: 'number', defaultValue: 3, min: 1, max: 10 }
    ];
  }

  process(_time: number, _deltaTime: number): void {
    this.setOutput('render', (ctx: CanvasRenderingContext2D, context: any) => {
      this.render(ctx, context);
    });
  }

  private render(ctx: CanvasRenderingContext2D, context: any): void {
    const amplitude = this.getParameter('amplitude');
    const frequency = this.getParameter('frequency');
    const speed = this.getParameter('speed');
    const lineWidth = this.getParameter('lineWidth');
    const colorR = this.getParameter('colorR');
    const colorG = this.getParameter('colorG');
    const colorB = this.getParameter('colorB');
    const numWaves = this.getParameter('numWaves');

    const width = context.width;
    const height = context.height;
    const centerY = height / 2;
    const timeOffset = context.time * speed * 0.001;

    ctx.lineWidth = lineWidth;

    for (let w = 0; w < numWaves; w++) {
      const waveOffset = (w / numWaves) * Math.PI * 2;
      const alpha = 0.3 + (w / numWaves) * 0.4;
      
      ctx.strokeStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha})`;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const y = centerY + 
          Math.sin((x / width) * Math.PI * 2 * frequency + timeOffset + waveOffset) * amplitude +
          (w - numWaves / 2) * 20;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }
  }
}
