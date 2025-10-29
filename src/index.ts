/**
 * Aura - A Modular Background Effect Studio
 * Main entry point
 */

export { Aura, AuraConfig } from './Aura';
export { Node, NodeInput, NodeOutputDef, NodeParameter } from './core/Node';
export { NodeGraph } from './core/NodeGraph';
export { Layer, LayerConfig, LayerManager } from './layers/Layer';
export { Renderer, RendererConfig } from './renderer/Renderer';
export { AIAssistant, EffectSuggestion, ParameterOptimization } from './ai/AIAssistant';
export { ParticleNode } from './nodes/ParticleNode';
export { GradientNode } from './nodes/GradientNode';
export { WaveNode } from './nodes/WaveNode';
export { ColorUtils, MathUtils, IdGenerator } from './utils';
export * from './core/types';
