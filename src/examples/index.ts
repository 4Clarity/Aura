/**
 * Example: Creating a cosmic background effect
 */

import { Aura } from '../Aura';
import { ParticleNode } from '../nodes/ParticleNode';
import { GradientNode } from '../nodes/GradientNode';
import { WaveNode } from '../nodes/WaveNode';
import { BlendMode } from '../core/types';
import { IdGenerator } from '../utils';

export function createCosmicBackground(canvas: HTMLCanvasElement): Aura {
  // Initialize Aura
  const aura = new Aura({
    canvas,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    fps: 60,
    autoStart: false
  });

  // Get AI suggestions for cosmic theme
  const ai = aura.getAI();
  const suggestions = ai.suggestEffects('cosmic');
  console.log('AI Suggestions:', suggestions);

  // Create background gradient layer
  const bgLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Background Gradient',
    zIndex: 0,
    blendMode: BlendMode.Normal,
    opacity: 1.0
  });

  const gradientNode = new GradientNode(IdGenerator.generate('gradient'));
  gradientNode.setParameter('type', 'radial');
  gradientNode.setParameter('color1R', 10);
  gradientNode.setParameter('color1G', 10);
  gradientNode.setParameter('color1B', 50);
  gradientNode.setParameter('color2R', 50);
  gradientNode.setParameter('color2G', 0);
  gradientNode.setParameter('color2B', 80);
  gradientNode.setParameter('animate', true);
  gradientNode.setParameter('animationSpeed', 0.2);

  aura.addNodeToLayer(gradientNode, bgLayer.id);

  // Create star field layer
  const starLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Star Field',
    zIndex: 1,
    blendMode: BlendMode.Add,
    opacity: 0.8
  });

  const starNode = new ParticleNode(IdGenerator.generate('particle'));
  starNode.setParameter('spawnRate', 5);
  starNode.setParameter('particleLife', 5);
  starNode.setParameter('particleSize', 2);
  starNode.setParameter('velocityX', 10);
  starNode.setParameter('velocityY', 0);
  starNode.setParameter('spread', 10);
  starNode.setParameter('gravity', 0);
  starNode.setParameter('colorR', 255);
  starNode.setParameter('colorG', 255);
  starNode.setParameter('colorB', 255);

  aura.addNodeToLayer(starNode, starLayer.id);

  // Create nebula wave layer
  const nebulaLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Nebula Waves',
    zIndex: 2,
    blendMode: BlendMode.Screen,
    opacity: 0.4
  });

  const waveNode = new WaveNode(IdGenerator.generate('wave'));
  waveNode.setParameter('amplitude', 80);
  waveNode.setParameter('frequency', 1.5);
  waveNode.setParameter('speed', 0.5);
  waveNode.setParameter('lineWidth', 3);
  waveNode.setParameter('colorR', 138);
  waveNode.setParameter('colorG', 43);
  waveNode.setParameter('colorB', 226);
  waveNode.setParameter('numWaves', 3);

  aura.addNodeToLayer(waveNode, nebulaLayer.id);

  // Get optimization suggestions
  const allNodes = aura.getNodeGraph().getAllNodes();
  const optimizations = ai.optimizeParameters(allNodes);
  if (optimizations.length > 0) {
    console.log('Performance Optimizations:', optimizations);
  }

  // Export configuration
  const config = aura.exportConfig();
  console.log('Scene Configuration:', JSON.stringify(config, null, 2));

  return aura;
}

export function createOceanBackground(canvas: HTMLCanvasElement): Aura {
  const aura = new Aura({
    canvas,
    width: 800,
    height: 600,
    backgroundColor: '#001a33',
    fps: 60,
    autoStart: false
  });

  const ai = aura.getAI();
  const suggestions = ai.suggestEffects('ocean');
  console.log('AI Suggestions:', suggestions);

  // Background gradient
  const bgLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Ocean Gradient',
    zIndex: 0,
    opacity: 1.0
  });

  const gradientNode = new GradientNode(IdGenerator.generate('gradient'));
  gradientNode.setParameter('type', 'linear');
  gradientNode.setParameter('startY', 0);
  gradientNode.setParameter('endY', 100);
  gradientNode.setParameter('color1R', 0);
  gradientNode.setParameter('color1G', 105);
  gradientNode.setParameter('color1B', 148);
  gradientNode.setParameter('color2R', 0);
  gradientNode.setParameter('color2G', 191);
  gradientNode.setParameter('color2B', 255);

  aura.addNodeToLayer(gradientNode, bgLayer.id);

  // Ocean waves
  const waveLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Waves',
    zIndex: 1,
    blendMode: BlendMode.Overlay,
    opacity: 0.6
  });

  const waveNode = new WaveNode(IdGenerator.generate('wave'));
  waveNode.setParameter('amplitude', 60);
  waveNode.setParameter('frequency', 2);
  waveNode.setParameter('speed', 1.2);
  waveNode.setParameter('colorR', 30);
  waveNode.setParameter('colorG', 144);
  waveNode.setParameter('colorB', 255);
  waveNode.setParameter('numWaves', 4);

  aura.addNodeToLayer(waveNode, waveLayer.id);

  // Bubbles
  const bubbleLayer = aura.createLayer({
    id: IdGenerator.generate('layer'),
    name: 'Bubbles',
    zIndex: 2,
    blendMode: BlendMode.Add,
    opacity: 0.5
  });

  const bubbleNode = new ParticleNode(IdGenerator.generate('particle'));
  bubbleNode.setParameter('spawnRate', 3);
  bubbleNode.setParameter('particleLife', 4);
  bubbleNode.setParameter('particleSize', 5);
  bubbleNode.setParameter('velocityX', 5);
  bubbleNode.setParameter('velocityY', -40);
  bubbleNode.setParameter('spread', 15);
  bubbleNode.setParameter('gravity', -5);
  bubbleNode.setParameter('colorR', 173);
  bubbleNode.setParameter('colorG', 216);
  bubbleNode.setParameter('colorB', 230);

  aura.addNodeToLayer(bubbleNode, bubbleLayer.id);

  return aura;
}
