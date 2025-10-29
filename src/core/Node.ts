/**
 * Base Node class for the node-based system
 */

import { NodeOutput } from './types';

export interface NodeInput {
  name: string;
  type: string;
  defaultValue?: any;
}

export interface NodeOutputDef {
  name: string;
  type: string;
}

export interface NodeParameter {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'color' | 'select';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export abstract class Node {
  public id: string;
  public name: string;
  public type: string;
  protected inputs: Map<string, any> = new Map();
  protected outputs: Map<string, NodeOutput> = new Map();
  protected parameters: Map<string, any> = new Map();

  constructor(id: string, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  abstract getInputDefinitions(): NodeInput[];
  abstract getOutputDefinitions(): NodeOutputDef[];
  abstract getParameters(): NodeParameter[];
  abstract process(time: number, deltaTime: number): void;

  setInput(name: string, value: any): void {
    this.inputs.set(name, value);
  }

  getInput(name: string): any {
    return this.inputs.get(name);
  }

  getOutput(name: string): NodeOutput | undefined {
    return this.outputs.get(name);
  }

  setParameter(name: string, value: any): void {
    this.parameters.set(name, value);
  }

  getParameter(name: string): any {
    const param = this.getParameters().find(p => p.name === name);
    if (this.parameters.has(name)) {
      return this.parameters.get(name);
    }
    return param?.defaultValue;
  }

  protected setOutput(name: string, data: any): void {
    this.outputs.set(name, {
      data,
      timestamp: Date.now()
    });
  }
}
