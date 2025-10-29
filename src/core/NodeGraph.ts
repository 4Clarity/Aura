/**
 * Node Graph - manages connections between nodes
 */

import { Node } from './Node';
import { NodeConnection } from './types';

export class NodeGraph {
  private nodes: Map<string, Node> = new Map();
  private connections: NodeConnection[] = [];

  addNode(node: Node): void {
    this.nodes.set(node.id, node);
  }

  removeNode(nodeId: string): void {
    this.nodes.delete(nodeId);
    // Remove all connections involving this node
    this.connections = this.connections.filter(
      conn => conn.fromNodeId !== nodeId && conn.toNodeId !== nodeId
    );
  }

  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  connect(connection: NodeConnection): void {
    // Validate connection
    const fromNode = this.nodes.get(connection.fromNodeId);
    const toNode = this.nodes.get(connection.toNodeId);

    if (!fromNode || !toNode) {
      throw new Error('Invalid connection: node not found');
    }

    // Check for duplicate connections
    const exists = this.connections.some(
      conn =>
        conn.fromNodeId === connection.fromNodeId &&
        conn.fromOutput === connection.fromOutput &&
        conn.toNodeId === connection.toNodeId &&
        conn.toInput === connection.toInput
    );

    if (!exists) {
      this.connections.push(connection);
    }
  }

  disconnect(connection: NodeConnection): void {
    this.connections = this.connections.filter(
      conn =>
        !(
          conn.fromNodeId === connection.fromNodeId &&
          conn.fromOutput === connection.fromOutput &&
          conn.toNodeId === connection.toNodeId &&
          conn.toInput === connection.toInput
        )
    );
  }

  getConnections(): NodeConnection[] {
    return [...this.connections];
  }

  process(time: number, deltaTime: number): void {
    // Topologically sort nodes and process in order
    const processedNodes = new Set<string>();
    const nodesToProcess = Array.from(this.nodes.keys());

    while (nodesToProcess.length > 0) {
      const nodeId = nodesToProcess.shift()!;
      
      // Check if all input dependencies are processed
      const inputConnections = this.connections.filter(
        conn => conn.toNodeId === nodeId
      );

      const allInputsReady = inputConnections.every(conn =>
        processedNodes.has(conn.fromNodeId)
      );

      if (allInputsReady) {
        const node = this.nodes.get(nodeId)!;

        // Transfer outputs from connected nodes to inputs
        inputConnections.forEach(conn => {
          const fromNode = this.nodes.get(conn.fromNodeId);
          if (fromNode) {
            const output = fromNode.getOutput(conn.fromOutput);
            if (output) {
              node.setInput(conn.toInput, output.data);
            }
          }
        });

        // Process the node
        node.process(time, deltaTime);
        processedNodes.add(nodeId);
      } else {
        // Re-add to end of queue
        nodesToProcess.push(nodeId);
      }
    }
  }

  clear(): void {
    this.nodes.clear();
    this.connections = [];
  }
}
