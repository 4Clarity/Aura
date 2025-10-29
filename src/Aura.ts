/**
 * Main Aura class - orchestrates the entire system
 */

import { Renderer } from './renderer/Renderer';
import { LayerManager, Layer, LayerConfig } from './layers/Layer';
import { NodeGraph } from './core/NodeGraph';
import { Node } from './core/Node';
import { AIAssistant } from './ai/AIAssistant';

export interface AuraConfig {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fps?: number;
  autoStart?: boolean;
}

export class Aura {
  private renderer: Renderer;
  private layerManager: LayerManager;
  private nodeGraph: NodeGraph;
  private aiAssistant: AIAssistant;

  constructor(config: AuraConfig) {
    this.renderer = new Renderer({
      canvas: config.canvas,
      width: config.width,
      height: config.height,
      backgroundColor: config.backgroundColor,
      fps: config.fps
    });

    this.layerManager = this.renderer.getLayerManager();
    this.nodeGraph = new NodeGraph();
    this.aiAssistant = new AIAssistant();

    if (config.autoStart) {
      this.start();
    }
  }

  /**
   * Create a new layer
   */
  createLayer(config: LayerConfig): Layer {
    const layer = new Layer(
      config,
      this.renderer['width'],
      this.renderer['height']
    );

    this.layerManager.addLayer(layer);
    return layer;
  }

  /**
   * Get a layer by ID
   */
  getLayer(layerId: string): Layer | undefined {
    return this.layerManager.getLayer(layerId);
  }

  /**
   * Remove a layer
   */
  removeLayer(layerId: string): void {
    this.layerManager.removeLayer(layerId);
  }

  /**
   * Add a node to a layer
   */
  addNodeToLayer(node: Node, layerId: string): void {
    const layer = this.layerManager.getLayer(layerId);
    if (layer) {
      layer.addNode(node);
      this.nodeGraph.addNode(node);
    }
  }

  /**
   * Get the node graph
   */
  getNodeGraph(): NodeGraph {
    return this.nodeGraph;
  }

  /**
   * Get the AI assistant
   */
  getAI(): AIAssistant {
    return this.aiAssistant;
  }

  /**
   * Start rendering
   */
  start(): void {
    this.renderer.start();
  }

  /**
   * Stop rendering
   */
  stop(): void {
    this.renderer.stop();
  }

  /**
   * Resize the canvas
   */
  resize(width: number, height: number): void {
    this.renderer.resize(width, height);
  }

  /**
   * Set background color
   */
  setBackgroundColor(color: string): void {
    this.renderer.setBackgroundColor(color);
  }

  /**
   * Clear everything
   */
  clear(): void {
    this.renderer.clear();
    this.layerManager.clear();
    this.nodeGraph.clear();
  }

  /**
   * Export current configuration
   */
  exportConfig(): any {
    const layers = this.layerManager.getAllLayers().map(layer => ({
      id: layer.id,
      name: layer.name,
      visible: layer.visible,
      opacity: layer.opacity,
      blendMode: layer.blendMode,
      zIndex: layer.zIndex,
      nodes: layer.getNodes().map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        parameters: this.serializeNodeParameters(node)
      }))
    }));

    return {
      version: '1.0.0',
      layers,
      connections: this.nodeGraph.getConnections()
    };
  }

  private serializeNodeParameters(node: Node): Record<string, any> {
    const params: Record<string, any> = {};
    node.getParameters().forEach(param => {
      params[param.name] = node.getParameter(param.name);
    });
    return params;
  }
}
