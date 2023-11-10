export class ListNode {
  value: number;
  neighbors: ListNode[];
  isWall: boolean;

  constructor(value: number) {
    this.value = value;
    this.neighbors = [];
    this.isWall = false;
  }

  addNeighbor(node: ListNode): void {
    this.neighbors.push(node);
  }

  removeNeighbors(node: ListNode): void {
    this.neighbors = this.neighbors.filter((neighborNode) => {
      return neighborNode !== node;
    });
  }
}

export class Graph {
  nodes: ListNode[];

  constructor() {
    this.nodes = [];
  }

  addNode(value: number): ListNode {
    const newNode = new ListNode(value);
    this.nodes.push(newNode);
    return newNode;
  }

  findNode(value: number): ListNode | undefined {
    return this.nodes.find((node) => node.value === value);
  }

  addEdge(value1: number, value2: number): void {
    const node1 = this.findNode(value1);
    const node2 = this.findNode(value2);

    if (!node1 || !node2) {
      console.error("One or both nodes not found.");
      return;
    }

    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
  }
}
