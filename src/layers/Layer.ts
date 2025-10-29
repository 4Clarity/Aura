/**
 * Layer system for compositing multiple visual effects
 */

import { BlendMode, RenderContext } from '../core/types';
import { Node } from '../core/Node';

export interface LayerConfig {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  blendMode: BlendMode;
  zIndex: number;
}

export class Layer {
  public id: string;
  public name: string;
  public visible: boolean = true;
  public opacity: number = 1.0;
  public blendMode: BlendMode = BlendMode.Normal;
  public zIndex: number = 0;
  
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nodes: Node[] = [];

  constructor(config: LayerConfig, width: number, height: number) {
    this.id = config.id;
    this.name = config.name;
    this.visible = config.visible;
    this.opacity = config.opacity;
    this.blendMode = config.blendMode;
    this.zIndex = config.zIndex;

    // Create offscreen canvas for this layer
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  addNode(node: Node): void {
    this.nodes.push(node);
  }

  removeNode(nodeId: string): void {
    this.nodes = this.nodes.filter(n => n.id !== nodeId);
  }

  getNodes(): Node[] {
    return [...this.nodes];
  }

  render(context: RenderContext): void {
    if (!this.visible) return;

    // Clear layer canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Process all nodes in this layer
    this.nodes.forEach(node => {
      node.process(context.time, context.deltaTime);
      
      // If node has render output, draw it
      const renderOutput = node.getOutput('render');
      if (renderOutput && typeof renderOutput.data === 'function') {
        renderOutput.data(this.ctx, context);
      }
    });

    // Composite this layer onto the main canvas
    const prevAlpha = context.ctx.globalAlpha;
    const prevComposite = context.ctx.globalCompositeOperation;

    context.ctx.globalAlpha = this.opacity;
    context.ctx.globalCompositeOperation = this.blendMode as GlobalCompositeOperation;
    context.ctx.drawImage(this.canvas, 0, 0);

    context.ctx.globalAlpha = prevAlpha;
    context.ctx.globalCompositeOperation = prevComposite;
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

export class LayerManager {
  private layers: Map<string, Layer> = new Map();

  addLayer(layer: Layer): void {
    this.layers.set(layer.id, layer);
  }

  removeLayer(layerId: string): void {
    this.layers.delete(layerId);
  }

  getLayer(layerId: string): Layer | undefined {
    return this.layers.get(layerId);
  }

  getAllLayers(): Layer[] {
    return Array.from(this.layers.values()).sort((a, b) => a.zIndex - b.zIndex);
  }

  render(context: RenderContext): void {
    // Render layers in z-index order
    const sortedLayers = this.getAllLayers();
    sortedLayers.forEach(layer => layer.render(context));
  }

  resize(width: number, height: number): void {
    this.layers.forEach(layer => layer.resize(width, height));
  }

  clear(): void {
    this.layers.clear();
  }
}
