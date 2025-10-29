/**
 * AI Assistant - provides intelligent suggestions and optimizations
 */

import { Node } from '../core/Node';
import { ParticleNode } from '../nodes/ParticleNode';
import { GradientNode } from '../nodes/GradientNode';
import { WaveNode } from '../nodes/WaveNode';

export interface EffectSuggestion {
  type: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  confidence: number;
}

export interface ParameterOptimization {
  nodeName: string;
  parameter: string;
  currentValue: any;
  suggestedValue: any;
  reason: string;
}

export class AIAssistant {
  /**
   * Suggest effects based on context or theme
   */
  suggestEffects(theme: string = 'default'): EffectSuggestion[] {
    const suggestions: EffectSuggestion[] = [];

    switch (theme.toLowerCase()) {
      case 'space':
      case 'cosmic':
        suggestions.push({
          type: 'particle',
          name: 'Star Field',
          description: 'Twinkling stars with slow movement',
          parameters: {
            spawnRate: 5,
            particleLife: 5,
            particleSize: 2,
            velocityX: 10,
            velocityY: 0,
            colorR: 255,
            colorG: 255,
            colorB: 255
          },
          confidence: 0.95
        });
        suggestions.push({
          type: 'gradient',
          name: 'Deep Space Gradient',
          description: 'Dark blue to purple gradient',
          parameters: {
            type: 'radial',
            color1R: 10,
            color1G: 10,
            color1B: 50,
            color2R: 50,
            color2G: 0,
            color2B: 80,
            animate: true,
            animationSpeed: 0.2
          },
          confidence: 0.9
        });
        break;

      case 'ocean':
      case 'water':
        suggestions.push({
          type: 'wave',
          name: 'Ocean Waves',
          description: 'Flowing wave patterns',
          parameters: {
            amplitude: 60,
            frequency: 2,
            speed: 1.2,
            colorR: 30,
            colorG: 144,
            colorB: 255,
            numWaves: 4
          },
          confidence: 0.93
        });
        suggestions.push({
          type: 'gradient',
          name: 'Underwater Gradient',
          description: 'Blue ocean gradient',
          parameters: {
            type: 'linear',
            color1R: 0,
            color1G: 105,
            color1B: 148,
            color2R: 0,
            color2G: 191,
            color2B: 255,
            animate: false
          },
          confidence: 0.88
        });
        break;

      case 'fire':
      case 'energy':
        suggestions.push({
          type: 'particle',
          name: 'Fire Particles',
          description: 'Rising fire particles',
          parameters: {
            spawnRate: 30,
            particleLife: 1.5,
            particleSize: 4,
            velocityX: 0,
            velocityY: -80,
            spread: 45,
            gravity: -10,
            colorR: 255,
            colorG: 100,
            colorB: 0
          },
          confidence: 0.91
        });
        break;

      default:
        suggestions.push({
          type: 'gradient',
          name: 'Smooth Gradient',
          description: 'Elegant animated gradient',
          parameters: {
            type: 'linear',
            color1R: 100,
            color1G: 50,
            color1B: 200,
            color2R: 50,
            color2G: 150,
            color2B: 255,
            animate: true,
            animationSpeed: 0.5
          },
          confidence: 0.8
        });
        suggestions.push({
          type: 'particle',
          name: 'Floating Particles',
          description: 'Gentle floating particles',
          parameters: {
            spawnRate: 8,
            particleLife: 3,
            particleSize: 3,
            velocityX: 20,
            velocityY: -30,
            spread: 20,
            colorR: 200,
            colorG: 200,
            colorB: 255
          },
          confidence: 0.75
        });
    }

    return suggestions;
  }

  /**
   * Analyze current setup and suggest parameter optimizations
   */
  optimizeParameters(nodes: Node[]): ParameterOptimization[] {
    const optimizations: ParameterOptimization[] = [];

    nodes.forEach(node => {
      if (node instanceof ParticleNode) {
        const spawnRate = node.getParameter('spawnRate');
        if (spawnRate > 50) {
          optimizations.push({
            nodeName: node.name,
            parameter: 'spawnRate',
            currentValue: spawnRate,
            suggestedValue: 30,
            reason: 'High spawn rate may impact performance. Consider reducing for smoother animation.'
          });
        }

        const particleLife = node.getParameter('particleLife');
        if (particleLife > 5 && spawnRate > 20) {
          optimizations.push({
            nodeName: node.name,
            parameter: 'particleLife',
            currentValue: particleLife,
            suggestedValue: 3,
            reason: 'Long particle life with high spawn rate creates many particles. Reduce for better performance.'
          });
        }
      }

      if (node instanceof GradientNode) {
        const animate = node.getParameter('animate');
        const animationSpeed = node.getParameter('animationSpeed');
        
        if (animate && animationSpeed > 3) {
          optimizations.push({
            nodeName: node.name,
            parameter: 'animationSpeed',
            currentValue: animationSpeed,
            suggestedValue: 1.5,
            reason: 'Very fast animations can be distracting. Consider slowing down for a more pleasant effect.'
          });
        }
      }

      if (node instanceof WaveNode) {
        const numWaves = node.getParameter('numWaves');
        if (numWaves > 7) {
          optimizations.push({
            nodeName: node.name,
            parameter: 'numWaves',
            currentValue: numWaves,
            suggestedValue: 5,
            reason: 'Too many waves can create visual clutter. Consider reducing for cleaner aesthetics.'
          });
        }
      }
    });

    return optimizations;
  }

  /**
   * Suggest layer composition strategies
   */
  suggestLayerComposition(effectTypes: string[]): string[] {
    const suggestions: string[] = [];

    if (effectTypes.includes('gradient')) {
      suggestions.push('Place gradient layers at the bottom (lowest z-index) as background base');
    }

    if (effectTypes.includes('wave')) {
      suggestions.push('Wave effects work well in middle layers with blend mode "screen" or "overlay"');
    }

    if (effectTypes.includes('particle')) {
      suggestions.push('Particle effects should be in top layers for maximum visibility');
      suggestions.push('Use blend mode "lighter" or "screen" for glowing particle effects');
    }

    if (effectTypes.length > 3) {
      suggestions.push('Consider using opacity < 1.0 on some layers to prevent overwhelming visuals');
    }

    return suggestions;
  }

  /**
   * Generate color palette suggestions
   */
  suggestColorPalette(mood: string = 'neutral'): Array<{ r: number; g: number; b: number }> {
    const palettes: Record<string, Array<{ r: number; g: number; b: number }>> = {
      calm: [
        { r: 173, g: 216, b: 230 }, // Light Blue
        { r: 176, g: 224, b: 230 }, // Powder Blue
        { r: 135, g: 206, b: 235 }  // Sky Blue
      ],
      energetic: [
        { r: 255, g: 69, b: 0 },    // Red-Orange
        { r: 255, g: 140, b: 0 },   // Dark Orange
        { r: 255, g: 215, b: 0 }    // Gold
      ],
      mysterious: [
        { r: 75, g: 0, b: 130 },    // Indigo
        { r: 138, g: 43, b: 226 },  // Blue Violet
        { r: 147, g: 112, b: 219 }  // Medium Purple
      ],
      nature: [
        { r: 34, g: 139, b: 34 },   // Forest Green
        { r: 144, g: 238, b: 144 }, // Light Green
        { r: 152, g: 251, b: 152 }  // Pale Green
      ],
      neutral: [
        { r: 100, g: 149, b: 237 }, // Cornflower Blue
        { r: 186, g: 85, b: 211 },  // Medium Orchid
        { r: 147, g: 112, b: 219 }  // Medium Purple
      ]
    };

    return palettes[mood.toLowerCase()] || palettes.neutral;
  }
}
