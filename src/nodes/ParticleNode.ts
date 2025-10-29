/**
 * Particle System Node - generates particle effects
 */

import { Node, NodeInput, NodeOutputDef, NodeParameter } from '../core/Node';
import { Color, Point } from '../core/types';

interface Particle {
  position: Point;
  velocity: Point;
  life: number;
  maxLife: number;
  size: number;
  color: Color;
}

export class ParticleNode extends Node {
  private particles: Particle[] = [];
  private lastSpawnTime: number = 0;

  constructor(id: string) {
    super(id, 'Particle System', 'particle');
  }

  getInputDefinitions(): NodeInput[] {
    return [
      { name: 'spawn', type: 'trigger' }
    ];
  }

  getOutputDefinitions(): NodeOutputDef[] {
    return [
      { name: 'render', type: 'canvas' }
    ];
  }

  getParameters(): NodeParameter[] {
    return [
      { name: 'spawnRate', type: 'number', defaultValue: 10, min: 1, max: 100 },
      { name: 'particleLife', type: 'number', defaultValue: 2, min: 0.1, max: 10, step: 0.1 },
      { name: 'particleSize', type: 'number', defaultValue: 3, min: 1, max: 20 },
      { name: 'velocityX', type: 'number', defaultValue: 0, min: -100, max: 100 },
      { name: 'velocityY', type: 'number', defaultValue: -50, min: -100, max: 100 },
      { name: 'spread', type: 'number', defaultValue: 30, min: 0, max: 180 },
      { name: 'gravity', type: 'number', defaultValue: 20, min: -100, max: 100 },
      { name: 'colorR', type: 'number', defaultValue: 255, min: 0, max: 255 },
      { name: 'colorG', type: 'number', defaultValue: 255, min: 0, max: 255 },
      { name: 'colorB', type: 'number', defaultValue: 255, min: 0, max: 255 }
    ];
  }

  process(time: number, deltaTime: number): void {
    const spawnRate = this.getParameter('spawnRate');
    const spawnInterval = 1000 / spawnRate;

    // Spawn new particles
    if (time - this.lastSpawnTime >= spawnInterval) {
      this.spawnParticle();
      this.lastSpawnTime = time;
    }

    // Update existing particles
    this.updateParticles(deltaTime);

    // Set render output
    this.setOutput('render', (ctx: CanvasRenderingContext2D, context: any) => {
      this.render(ctx, context);
    });
  }

  private spawnParticle(): void {
    const velocityX = this.getParameter('velocityX');
    const velocityY = this.getParameter('velocityY');
    const spread = this.getParameter('spread');
    const particleLife = this.getParameter('particleLife');
    const particleSize = this.getParameter('particleSize');
    const colorR = this.getParameter('colorR');
    const colorG = this.getParameter('colorG');
    const colorB = this.getParameter('colorB');

    const angle = (Math.random() - 0.5) * spread * (Math.PI / 180);
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    const baseAngle = Math.atan2(velocityY, velocityX);

    this.particles.push({
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      velocity: {
        x: Math.cos(baseAngle + angle) * speed,
        y: Math.sin(baseAngle + angle) * speed
      },
      life: particleLife * 1000,
      maxLife: particleLife * 1000,
      size: particleSize * (0.8 + Math.random() * 0.4),
      color: { r: colorR, g: colorG, b: colorB, a: 1 }
    });
  }

  private updateParticles(deltaTime: number): void {
    const gravity = this.getParameter('gravity');

    this.particles = this.particles.filter(particle => {
      particle.life -= deltaTime;
      if (particle.life <= 0) return false;

      // Update velocity with gravity
      particle.velocity.y += gravity * (deltaTime / 1000);

      // Update position
      particle.position.x += particle.velocity.x * (deltaTime / 1000);
      particle.position.y += particle.velocity.y * (deltaTime / 1000);

      // Update alpha based on life
      particle.color.a = particle.life / particle.maxLife;

      return true;
    });
  }

  private render(ctx: CanvasRenderingContext2D, _context: any): void {
    this.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.color.a;
      ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 1)`;
      ctx.beginPath();
      ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}
