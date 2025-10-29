/**
 * Tests for Node base class
 */

import { Node, NodeInput, NodeOutputDef, NodeParameter } from '../Node';

class TestNode extends Node {
  constructor(id: string) {
    super(id, 'Test Node', 'test');
  }

  getInputDefinitions(): NodeInput[] {
    return [{ name: 'input1', type: 'number' }];
  }

  getOutputDefinitions(): NodeOutputDef[] {
    return [{ name: 'output1', type: 'number' }];
  }

  getParameters(): NodeParameter[] {
    return [
      { name: 'param1', type: 'number', defaultValue: 10 },
      { name: 'param2', type: 'string', defaultValue: 'test' }
    ];
  }

  process(_time: number, _deltaTime: number): void {
    const input = this.getInput('input1') || 0;
    const param1 = this.getParameter('param1');
    this.setOutput('output1', input + param1);
  }
}

describe('Node', () => {
  let node: TestNode;

  beforeEach(() => {
    node = new TestNode('test-1');
  });

  test('should create node with correct properties', () => {
    expect(node.id).toBe('test-1');
    expect(node.name).toBe('Test Node');
    expect(node.type).toBe('test');
  });

  test('should set and get input values', () => {
    node.setInput('input1', 42);
    expect(node.getInput('input1')).toBe(42);
  });

  test('should set and get parameter values', () => {
    node.setParameter('param1', 20);
    expect(node.getParameter('param1')).toBe(20);
  });

  test('should return default parameter value', () => {
    expect(node.getParameter('param1')).toBe(10);
    expect(node.getParameter('param2')).toBe('test');
  });

  test('should process and produce output', () => {
    node.setInput('input1', 5);
    node.setParameter('param1', 15);
    node.process(0, 16);
    
    const output = node.getOutput('output1');
    expect(output).toBeDefined();
    expect(output?.data).toBe(20);
  });

  test('should have timestamp in output', () => {
    node.process(0, 16);
    const output = node.getOutput('output1');
    
    expect(output).toBeDefined();
    expect(output?.timestamp).toBeGreaterThan(0);
  });
});
