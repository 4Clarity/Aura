# Aura 🌟

**A Modular Background Effect Studio**

Aura combines node-based visual effects, layered rendering, and AI-assisted design to help anyone—from beginners to professionals—craft immersive background experiences.

## Overview

Aura is a next-generation visual effects platform that transforms how you create animated backgrounds. Whether you're designing for websites, games, presentations, or digital art installations, Aura provides a modular framework where effects, layers, and nodes compose into breathtaking visuals.

## Features

### 🎨 Node-Based Visual Effects
- **Modular Architecture**: Build complex effects by connecting simple nodes
- **Built-in Effect Nodes**: Particles, gradients, waves, and more
- **Extensible System**: Create custom nodes for unique effects

### 📚 Layered Rendering
- **Multi-layer Composition**: Stack effects with independent control
- **Blend Modes**: Normal, multiply, screen, overlay, add, and more
- **Opacity Control**: Fine-tune each layer's transparency
- **Z-Index Management**: Control render order precisely

### 🤖 AI-Assisted Design
- **Smart Suggestions**: Get effect recommendations based on themes
- **Parameter Optimization**: AI analyzes your setup for performance improvements
- **Color Palettes**: Generate harmonious color schemes
- **Composition Advice**: Learn best practices for layer arrangement

### ⚡ High Performance
- **Canvas-based Rendering**: Hardware-accelerated graphics
- **Frame Rate Control**: Target specific FPS for optimal performance
- **Efficient Updates**: Only render what changes

## Installation

```bash
npm install aura
```

## Quick Start

```typescript
import { Aura, ParticleNode, GradientNode, BlendMode, IdGenerator } from 'aura';

// Create canvas element
const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;

// Initialize Aura
const aura = new Aura({
  canvas,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  fps: 60,
  autoStart: true
});

// Create a gradient background layer
const bgLayer = aura.createLayer({
  id: IdGenerator.generate('layer'),
  name: 'Background',
  zIndex: 0
});

const gradient = new GradientNode(IdGenerator.generate('gradient'));
gradient.setParameter('type', 'radial');
gradient.setParameter('color1R', 100);
gradient.setParameter('color1G', 50);
gradient.setParameter('color1B', 200);
gradient.setParameter('color2R', 50);
gradient.setParameter('color2G', 150);
gradient.setParameter('color2B', 255);
gradient.setParameter('animate', true);

aura.addNodeToLayer(gradient, bgLayer.id);

// Create particle effect layer
const particleLayer = aura.createLayer({
  id: IdGenerator.generate('layer'),
  name: 'Particles',
  zIndex: 1,
  blendMode: BlendMode.Add,
  opacity: 0.8
});

const particles = new ParticleNode(IdGenerator.generate('particle'));
particles.setParameter('spawnRate', 10);
particles.setParameter('particleLife', 3);
particles.setParameter('velocityY', -50);

aura.addNodeToLayer(particles, particleLayer.id);

// Start rendering
aura.start();
```

## Core Concepts

### Nodes

Nodes are the building blocks of effects. Each node:
- Has configurable parameters
- Processes data every frame
- Can output render commands or data
- Can be connected to other nodes

**Available Node Types:**
- `ParticleNode`: Create particle systems with physics
- `GradientNode`: Generate animated gradients
- `WaveNode`: Create flowing wave patterns

### Layers

Layers organize and composite effects:
- Each layer has its own canvas for rendering
- Layers are composited in z-index order
- Support various blend modes
- Independent opacity control

### AI Assistant

The AI assistant provides intelligent recommendations:

```typescript
const ai = aura.getAI();

// Get effect suggestions for a theme
const suggestions = ai.suggestEffects('cosmic');

// Get parameter optimizations
const optimizations = ai.optimizeParameters(aura.getNodeGraph().getAllNodes());

// Get color palette suggestions
const colors = ai.suggestColorPalette('energetic');

// Get layer composition advice
const tips = ai.suggestLayerComposition(['gradient', 'particle', 'wave']);
```

## Examples

### Cosmic Background

```typescript
import { createCosmicBackground } from 'aura/examples';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const aura = createCosmicBackground(canvas);
aura.start();
```

### Ocean Scene

```typescript
import { createOceanBackground } from 'aura/examples';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const aura = createOceanBackground(canvas);
aura.start();
```

## Advanced Usage

### Custom Nodes

Create your own effect nodes:

```typescript
import { Node, NodeInput, NodeOutputDef, NodeParameter } from 'aura';

class CustomNode extends Node {
  constructor(id: string) {
    super(id, 'Custom Effect', 'custom');
  }

  getInputDefinitions(): NodeInput[] {
    return [
      { name: 'input1', type: 'number' }
    ];
  }

  getOutputDefinitions(): NodeOutputDef[] {
    return [
      { name: 'render', type: 'canvas' }
    ];
  }

  getParameters(): NodeParameter[] {
    return [
      { name: 'intensity', type: 'number', defaultValue: 1, min: 0, max: 10 }
    ];
  }

  process(time: number, deltaTime: number): void {
    // Your custom logic here
    this.setOutput('render', (ctx, context) => {
      // Custom rendering
    });
  }
}
```

### Export/Import Configurations

```typescript
// Export current setup
const config = aura.exportConfig();
localStorage.setItem('auraConfig', JSON.stringify(config));

// Later, import it
const savedConfig = JSON.parse(localStorage.getItem('auraConfig'));
// Reconstruct scene from config
```

### Dynamic Parameter Control

```typescript
// Update parameters in real-time
const node = aura.getNodeGraph().getNode('nodeId');
node.setParameter('spawnRate', 50);

// Respond to user input
canvas.addEventListener('mousemove', (e) => {
  const intensity = (e.clientX / canvas.width) * 100;
  particleNode.setParameter('spawnRate', intensity);
});
```

## API Reference

### Aura

Main class for orchestrating the system.

**Constructor:**
```typescript
new Aura(config: AuraConfig)
```

**Methods:**
- `createLayer(config)`: Create a new layer
- `getLayer(id)`: Get layer by ID
- `removeLayer(id)`: Remove a layer
- `addNodeToLayer(node, layerId)`: Add node to specific layer
- `getNodeGraph()`: Access the node graph
- `getAI()`: Access the AI assistant
- `start()`: Start rendering
- `stop()`: Stop rendering
- `resize(width, height)`: Resize canvas
- `exportConfig()`: Export current configuration

### Layer

Represents a compositing layer.

**Properties:**
- `id`: Unique identifier
- `name`: Layer name
- `visible`: Visibility flag
- `opacity`: Transparency (0-1)
- `blendMode`: Compositing mode
- `zIndex`: Render order

### Node

Base class for all effect nodes.

**Methods:**
- `getParameter(name)`: Get parameter value
- `setParameter(name, value)`: Set parameter value
- `process(time, deltaTime)`: Process node logic

## Use Cases

- **Websites**: Engaging hero backgrounds, interactive landing pages
- **Games**: Menu backgrounds, loading screens, ambient effects
- **Presentations**: Dynamic slides, attention-grabbing visuals
- **Digital Art**: Generative art, installations, exhibitions
- **Video Production**: Motion backgrounds, overlays, effects

## Performance Tips

1. **Limit Particle Count**: Use AI suggestions to optimize spawn rates
2. **Layer Wisely**: Don't create unnecessary layers
3. **Blend Modes**: Some blend modes are more expensive than others
4. **Frame Rate**: Lower FPS for mobile devices
5. **Canvas Size**: Match canvas size to display requirements

## Browser Support

Aura works in all modern browsers that support:
- Canvas API
- ES2020+
- RequestAnimationFrame

## Contributing

Contributions welcome! Please read our contributing guidelines.

## License

MIT License - see LICENSE file for details

## Credits

Built with ❤️ for the creative community