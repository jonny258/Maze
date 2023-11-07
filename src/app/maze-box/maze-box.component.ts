import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

class ListNode {
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

class Graph {
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
      console.error('One or both nodes not found.');
      return;
    }

    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
  }
}

@Component({
  selector: 'mazeBox',
  templateUrl: './maze-box.component.html',
  styleUrls: ['./maze-box.component.css'],
})
export class MazeBoxComponent implements OnInit {
  // yIds: number[] = [];
  // xIds: number[] = [];

  @Output() mazeGraphChange = new EventEmitter<{
    perimeter: ListNode[];
    maze: Graph;
  }>();
  @Input() shortestPath?: ListNode[];
  @Input() explorePath?: ListNode[];
  @Input() currentNode?: ListNode;

  // isMouseDown: boolean = false;

  isNodeInShortestPath(node: ListNode): boolean {
    return this.shortestPath
      ? this.shortestPath.some((pathNode) => pathNode.value === node.value)
      : false;
  }
  isNodeInExplorePath(node: ListNode): boolean {
    return this.explorePath
      ? this.explorePath.some((pathNode) => pathNode.value === node.value)
      : false;
  }
  isNodeTheCurrentExploreNode(node: ListNode): boolean {
    const isCurrent = node === this.currentNode;
    return isCurrent;
  }

  mazeGraph = new Graph();

  addAllNodeNeighbors(node: ListNode) {
    //RIGHT
    if (
      (node.value + 1) % 12 !== 0 &&
      !this.mazeGraph.nodes[node.value + 1].isWall
    ) {
      node.addNeighbor(this.mazeGraph.nodes[node.value + 1]);
    }
    //LEFT
    if (node.value % 12 !== 0 && !this.mazeGraph.nodes[node.value - 1].isWall) {
      node.addNeighbor(this.mazeGraph.nodes[node.value - 1]);
    }
    //BOTTOM
    if (
      node.value + 12 < 144 &&
      !this.mazeGraph.nodes[node.value + 12].isWall
    ) {
      node.addNeighbor(this.mazeGraph.nodes[node.value + 12]);
    }
    //TOP
    if (node.value - 12 >= 0 && !this.mazeGraph.nodes[node.value - 12].isWall) {
      node.addNeighbor(this.mazeGraph.nodes[node.value - 12]);
    }
  }

  removeAllNodeNeighbors(node: ListNode) {
    node.neighbors.forEach((neighborNode) => {
      node.removeNeighbors(neighborNode);
      neighborNode.removeNeighbors(node);
    });
  }

  perimeterArray: ListNode[] = [];

  ngOnInit() {
    // for (let i = 0; i <= 11; i++) {
    //   this.yIds.push(i);
    //   this.xIds.push(i);
    // }

    for (let i = 0; i < 144; i++) {
      this.mazeGraph.addNode(i);
    }

    for (let i = 0; i < this.mazeGraph.nodes.length; i++) {
      this.addAllNodeNeighbors(this.mazeGraph.nodes[i]);
    }

    for (let i = 0; i < this.mazeGraph.nodes.length; i++) {
      if (this.mazeGraph.nodes[i].neighbors.length !== 4) {
        this.perimeterArray.push(this.mazeGraph.nodes[i]);
      }
    }

    for (let i = 0; i < this.perimeterArray.length; i++) {
      this.removeAllNodeNeighbors(this.perimeterArray[i]);
      this.perimeterArray[i].isWall = true;
    }
  }

  nodeClickHandler(node: ListNode) {
    this.shortestPath = [];
    this.currentNode = new ListNode(-1)
    this.explorePath = [];
    console.log(this.shortestPath);
    node.isWall = !node.isWall;
    if (node.isWall) {
      this.removeAllNodeNeighbors(node);
    } else {
      this.addAllNodeNeighbors(node);
      node.neighbors.forEach((nodeNeighbor) => {
        nodeNeighbor.addNeighbor(node);
      });
    }
    console.log(node);
    this.mazeGraphChange.emit({
      perimeter: this.perimeterArray,
      maze: this.mazeGraph,
    });
  }
}
