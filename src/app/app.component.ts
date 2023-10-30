import { Component } from '@angular/core';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'maze';
  perimeterArray: ListNode[] = [];
  mazeGraph: Graph = new Graph();

  setParimiterArray(event: { perimeter: ListNode[]; maze: Graph }) {
    this.perimeterArray = event.perimeter;
    this.mazeGraph = event.maze;
  }

  shortestPath: ListNode[] = [];  

  solveGraph(startNode: ListNode, endNode: ListNode) {
    console.log('RUNNING DFS');
    const isVisitedArray = Array(144).fill(false);
    let allPaths: ListNode[][] = [];
    this.shortestPath = [];

    const dfs = (node: ListNode, currentPath: ListNode[]) => {
      
      currentPath.push(node)
      if (node === endNode) {
        allPaths.push([...currentPath])
        if(this.shortestPath.length === 0 || currentPath.length < this.shortestPath.length){
          this.shortestPath = [...currentPath]
        }
      }else{
        isVisitedArray[node.value] = true;
        node.neighbors.forEach(neighborNode => {
          if (!isVisitedArray[neighborNode.value]) {
            dfs(neighborNode, currentPath);
          }
        });
        isVisitedArray[node.value] = false;
      }

      currentPath.pop();
    };

    dfs(startNode, []);

    console.log("All paths:", allPaths);
    console.log("Shortest path:", this.shortestPath);
  }

  runCodeHandler() {
    let notWallOrCornerArray = [];

    for (let i = 0; i < this.perimeterArray.length; i++) {
      if (!this.perimeterArray[i].isWall) {
        if (
          this.perimeterArray[i].value !== 0 &&
          this.perimeterArray[i].value !== 11 &&
          this.perimeterArray[i].value !== 132 &&
          this.perimeterArray[i].value !== 143
        ) {
          notWallOrCornerArray.push(this.perimeterArray[i]);
        }
      }
    }

    if (notWallOrCornerArray.length > 2) {
      alert(
        'Please select 2 points on the perimeter not including corners for an entrence and an exit'
      );
    } else if (notWallOrCornerArray.length < 2) {
      alert(
        'Please select only 2 points on the perimeter not including corners for an entrence and an exit'
      );
    } else if (notWallOrCornerArray.length === 2) {
      // console.log(notWallOrCornerArray);
      this.solveGraph(notWallOrCornerArray[0], notWallOrCornerArray[1]);
    }
    // console.log(this.mazeArray);

    // let count = 0;
    // for (let i = 1; i < this.mazeArray[0].length - 1; i++) {
    //   if (!this.mazeArray[0][i]) {
    //     count++;
    //   }
    //   if (!this.mazeArray[this.mazeArray.length - 1][i]) {
    //     count++;
    //   }
    // }

    // for (let i = 1; i < this.mazeArray.length - 1; i++) {
    //   if (!this.mazeArray[i][0]) {
    //     count++;
    //   }
    //   if (!this.mazeArray[i][this.mazeArray[i].length - 1]) {
    //     count++;
    //   }
    // }

    // if(count !== 2){
    //   alert("Please have 2 spaces on the perimeter")
    // }

    // return count;
  }
}
