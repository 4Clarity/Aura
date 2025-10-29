/**
 * Tests for NodeGraph
 */

import { NodeGraph } from '../NodeGraph';
import { Node, NodeInput, NodeOutputDef, NodeParameter } from '../Node';

class SimpleNode extends Node {
  constructor(id: string) {
    super(id, 'Simple', 'simple');
  }

  getInputDefinitions(): NodeInput[] {
    return [{ name: 'in', type: 'number' }];
  }

  getOutputDefinitions(): NodeOutputDef[] {
    return [{ name: 'out', type: 'number' }];
  }

  getParameters(): NodeParameter[] {
    return [];
  }

  process(_time: number, _deltaTime: number): void {
    const input = this.getInput('in') || 0;
    this.setOutput('out', input * 2);
  }
}

describe('NodeGraph', () => {
  let graph: NodeGraph;

  beforeEach(() => {
    graph = new NodeGraph();
  });

  test('should add and retrieve nodes', () => {
    const node = new SimpleNode('node-1');
    graph.addNode(node);
    
    expect(graph.getNode('node-1')).toBe(node);
  });

  test('should remove nodes', () => {
    const node = new SimpleNode('node-1');
    graph.addNode(node);
    graph.removeNode('node-1');
    
    expect(graph.getNode('node-1')).toBeUndefined();
  });

  test('should get all nodes', () => {
    const node1 = new SimpleNode('node-1');
    const node2 = new SimpleNode('node-2');
    
    graph.addNode(node1);
    graph.addNode(node2);
    
    const nodes = graph.getAllNodes();
    expect(nodes).toHaveLength(2);
    expect(nodes).toContain(node1);
    expect(nodes).toContain(node2);
  });

  test('should create connections between nodes', () => {
    const node1 = new SimpleNode('node-1');
    const node2 = new SimpleNode('node-2');
    
    graph.addNode(node1);
    graph.addNode(node2);
    
    graph.connect({
      fromNodeId: 'node-1',
      fromOutput: 'out',
      toNodeId: 'node-2',
      toInput: 'in'
    });
    
    const connections = graph.getConnections();
    expect(connections).toHaveLength(1);
    expect(connections[0].fromNodeId).toBe('node-1');
  });

  test('should remove connections', () => {
    const node1 = new SimpleNode('node-1');
    const node2 = new SimpleNode('node-2');
    
    graph.addNode(node1);
    graph.addNode(node2);
    
    const connection = {
      fromNodeId: 'node-1',
      fromOutput: 'out',
      toNodeId: 'node-2',
      toInput: 'in'
    };
    
    graph.connect(connection);
    expect(graph.getConnections()).toHaveLength(1);
    
    graph.disconnect(connection);
    expect(graph.getConnections()).toHaveLength(0);
  });

  test('should process connected nodes', () => {
    const node1 = new SimpleNode('node-1');
    const node2 = new SimpleNode('node-2');
    
    graph.addNode(node1);
    graph.addNode(node2);
    
    graph.connect({
      fromNodeId: 'node-1',
      fromOutput: 'out',
      toNodeId: 'node-2',
      toInput: 'in'
    });
    
    node1.setInput('in', 5);
    graph.process(0, 16);
    
    const output1 = node1.getOutput('out');
    expect(output1?.data).toBe(10);
    
    const output2 = node2.getOutput('out');
    expect(output2?.data).toBe(20);
  });

  test('should clear graph', () => {
    const node1 = new SimpleNode('node-1');
    const node2 = new SimpleNode('node-2');
    
    graph.addNode(node1);
    graph.addNode(node2);
    graph.connect({
      fromNodeId: 'node-1',
      fromOutput: 'out',
      toNodeId: 'node-2',
      toInput: 'in'
    });
    
    graph.clear();
    
    expect(graph.getAllNodes()).toHaveLength(0);
    expect(graph.getConnections()).toHaveLength(0);
  });

  test('should throw error for invalid connection', () => {
    expect(() => {
      graph.connect({
        fromNodeId: 'non-existent',
        fromOutput: 'out',
        toNodeId: 'also-non-existent',
        toInput: 'in'
      });
    }).toThrow();
  });
});
