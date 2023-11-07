import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

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

  constructor(private ngZone: NgZone, private cdRef: ChangeDetectorRef) {}

  setParimiterArray(event: { perimeter: ListNode[]; maze: Graph }) {
    this.perimeterArray = event.perimeter;
    this.mazeGraph = event.maze;
  }

  shortestPath: ListNode[] = [];
  explorePath: ListNode[] = [];
  currentNode: ListNode = new ListNode(-1);

  //This function is not in use
  solveGraphRecursive(startNode: ListNode, endNode: ListNode) {
    console.log('RUNNING DFS');
    const isVisitedArray = Array(144).fill(false);
    let allPathsCount: number = 0;
    this.shortestPath = [];

    const dfs = (node: ListNode, currentPath: ListNode[]) => {
      currentPath.push(node);
      if (node === endNode) {
        allPathsCount++;
        if (
          this.shortestPath.length === 0 ||
          currentPath.length < this.shortestPath.length
        ) {
          this.shortestPath = [...currentPath];
        }
      } else {
        isVisitedArray[node.value] = true;
        node.neighbors.forEach((neighborNode) => {
          if (!isVisitedArray[neighborNode.value]) {
            dfs(neighborNode, currentPath);
          }
        });
        isVisitedArray[node.value] = false;
      }

      currentPath.pop();
    };

    dfs(startNode, []);

    console.log('Number of paths:', allPathsCount);
    console.log('Shortest path:', this.shortestPath);
  }

  solveGraphBFS(startNode: ListNode) {
    let queue: ListNode[] = [startNode];
    let path: ListNode[] = [];
    const isVisitedArray = Array(144).fill(false);

    isVisitedArray[startNode.value] = true;

    while (queue.length > 0) {
      let dequeuedNode = queue.shift()!;
      isVisitedArray[dequeuedNode.value] = true;

      path.push(dequeuedNode);
      dequeuedNode.neighbors.forEach((neighborNode) => {
        if (!isVisitedArray[neighborNode.value]) {
          isVisitedArray[neighborNode.value] = true;
          queue.push(neighborNode);
        }
      });
    }
    this.showHowGraphExplores(path);
  }

  shortestPathBFS(startNode: ListNode, endNode: ListNode) {
    console.log("Running BFS")
    let queue: Array<{ node: ListNode; path: ListNode[] }> = [
      { node: startNode, path: [startNode] },
    ];
    const isVisitedArray = Array(144).fill(false);
    isVisitedArray[startNode.value] = true;

    while (queue.length > 0) {
      let shifted = queue.shift();
      if(shifted){
        let { node, path } = shifted;
        isVisitedArray[node.value] = true;
        if(node === endNode){
          console.log(path)
          return this.shortestPath = [...path]
        }
        node.neighbors.forEach(neighborNode => {
          isVisitedArray[neighborNode.value] = true;
          queue.push({node: neighborNode, path: [...path, neighborNode]})
        })
      }
    }
    return 
  }

  showHowGraphExplores(path: ListNode[]) {
    let temp: ListNode[] = [];
    path.forEach((node, index) => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.currentNode = node;
          temp.push(node);
          this.explorePath = [...temp];
          // If using ChangeDetectorRef
          this.cdRef.detectChanges();
        });
      }, index * 200);
    });
  }

  solveGraphStack(startNode: ListNode) {
    let stack = [startNode];
    let path: ListNode[] = [];
    const isVisitedArray = Array(144).fill(false);
    console.log(startNode);

    while (stack.length > 0) {
      let current = stack.pop();
      if (current) {
        path.push(current);
      }

      if (current !== undefined && !isVisitedArray[current.value]) {
        isVisitedArray[current.value] = true;
        let neighbors = this.mazeGraph.findNode(current.value)?.neighbors;

        if (neighbors) {
          for (let i = 0; i < neighbors.length; i++) {
            if (!isVisitedArray[neighbors[i].value]) {
              stack.push(neighbors[i]);
            }
          }
        }
      }
    }
    this.showHowGraphExplores(path);
  }

  runCodeHandler(type: string) {
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
      // if (type === 'DFS Recursive') {
      //   this.solveGraphRecursive(
      //     notWallOrCornerArray[0],
      //     notWallOrCornerArray[1]
      //   );
      // }
      if(type === 'BFS shortestPath'){
        this.shortestPathBFS(notWallOrCornerArray[0], notWallOrCornerArray[1])
      }
      if (type === 'DFS Stack') {
        this.solveGraphStack(notWallOrCornerArray[0]);
      }
      if (type === 'BFS') {
        this.solveGraphBFS(notWallOrCornerArray[0]);
      }
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
