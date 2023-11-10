import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Graph, ListNode } from '../graphClass';

@Component({
  selector: 'mazeBox',
  templateUrl: './maze-box.component.html',
  styleUrls: ['./maze-box.component.css'],
})
export class MazeBoxComponent implements OnInit {

  @Output() mazeGraphChange = new EventEmitter<{
    perimeter: ListNode[];
    maze: Graph;
  }>();
  @Input() shortestPath?: ListNode[];
  @Input() explorePath?: ListNode[];
  @Input() currentNode?: ListNode;







  //SET STYLES
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
      (node.value + 1) % 20 !== 0 &&
      !this.mazeGraph.nodes[node.value + 1].isWall
    ) {
      node.addNeighbor(this.mazeGraph.nodes[node.value + 1]);
    }
    //LEFT
    if (node.value % 20 !== 0 && !this.mazeGraph.nodes[node.value - 1].isWall) {
      node.addNeighbor(this.mazeGraph.nodes[node.value - 1]);
    }
    //BOTTOM
    if (
      node.value + 20 < 400 &&
      !this.mazeGraph.nodes[node.value + 20].isWall
    ) {
      node.addNeighbor(this.mazeGraph.nodes[node.value + 20]);
    }
    //TOP
    if (node.value - 20 >= 0 && !this.mazeGraph.nodes[node.value - 20].isWall) {
      node.addNeighbor(this.mazeGraph.nodes[node.value - 20]);
    }
  }

  removeAllNodeNeighbors(node: ListNode) {
    node.neighbors.forEach((neighborNode) => {
      node.removeNeighbors(neighborNode);
      neighborNode.removeNeighbors(node);
    });
  }

  perimeterArray: ListNode[] = [];

  setUpMaze(){
    for (let i = 0; i < 400; i++) {
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

  ngOnInit() {
    this.setUpMaze()   
  }


  drawMode = false;
  eraseMode = false;
  drawHandler() {
    this.eraseMode = false;
    this.drawMode = true;
  }

  eraseHandler() {
    this.drawMode = false;
    this.eraseMode = true;
  }

  resetHandler() {
    this.drawMode = false;
    this.eraseMode = false;
    this.mazeGraph = new Graph;
    this.setUpMaze()  
  }

  hoverHandler(node: ListNode){
    console.log(node)
    console.log(this.drawMode)
    if(this.drawMode){
      node.isWall = true
      this.removeAllNodeNeighbors(node);
    }
    if(this.eraseMode){
      node.isWall = false
      this.addAllNodeNeighbors(node);
      node.neighbors.forEach((nodeNeighbor) => {
        nodeNeighbor.addNeighbor(node);
      });
    }
  }

  nodeClickHandler(node: ListNode) {
    this.shortestPath = [];
    this.currentNode = new ListNode(-1)
    this.explorePath = [];
    this.drawMode = false;
    this.eraseMode = false;
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
