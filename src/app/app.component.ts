import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Graph, ListNode } from './graphClass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'maze';
  perimeterArray: ListNode[] = [];
  mazeGraph: Graph = new Graph();
  private timeoutIds: number[] = [];

  constructor(private ngZone: NgZone, private cdRef: ChangeDetectorRef) {}

  setParimiterArray(event: { perimeter: ListNode[]; maze: Graph }) {
    this.perimeterArray = event.perimeter;
    this.mazeGraph = event.maze;
  }

  findParimeterHoles() {
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

    return notWallOrCornerArray;
  }

  shortestPath: ListNode[] = [];
  explorePath: ListNode[] = [];
  currentNode: ListNode = new ListNode(-1);

  solveGraphDFS() {
    this.clearAll();
    let parimerterHoles = this.findParimeterHoles();
    if (parimerterHoles.length > 0) {
      let startNode = parimerterHoles[0];
      let path: ListNode[] = [];
      const isVisitedArray = Array(144).fill(false);
      console.log(startNode);

      const dfs = (node: ListNode) => {
        if (!isVisitedArray[node.value]) {
          isVisitedArray[node.value] = true;
          path.push(node);
          node.neighbors.forEach((neighborNode) => {
            if (!isVisitedArray[neighborNode.value]) {
              dfs(neighborNode);
            }
          });
        }
      };

      dfs(startNode);
      this.showHowGraphExplores(path);
    } else {
      alert('Please select an opening to start at');
    }
  }

  solveGraphBFS() {
    this.clearAll();
    let parimerterHoles = this.findParimeterHoles();
    if (parimerterHoles.length > 0) {
      let startNode = parimerterHoles[0];
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
    } else {
      alert('Please select an opening to start at');
    }
  }

  shortestPathBFS() {
    this.clearAll();
    let parimerterHoles = this.findParimeterHoles();
    if (parimerterHoles.length === 2) {
      let startNode = parimerterHoles[0];
      let endNode = parimerterHoles[1];
      console.log('Running BFS');
      let queue: Array<{ node: ListNode; path: ListNode[] }> = [
        { node: startNode, path: [startNode] },
      ];
      const isVisitedArray = Array(144).fill(false);
      isVisitedArray[startNode.value] = true;

      while (queue.length > 0) {
        let shifted = queue.shift();
        console.log(shifted);
        if (shifted) {
          let { node, path } = shifted;
          isVisitedArray[node.value] = true;
          if (node === endNode) {
            console.log(path);
            return (this.shortestPath = [...path]);
          }
          node.neighbors.forEach((neighborNode) => {
            if (!isVisitedArray[neighborNode.value]) {
              isVisitedArray[neighborNode.value] = true;
              console.log(neighborNode);
              queue.push({ node: neighborNode, path: [...path, neighborNode] });
            }
          });
        }
      }
      return;
    } else {
      alert('Please select exactly 2 holes on the parimeter');
    }
    return;
  }

  showHowGraphExplores(path: ListNode[]) {
    this.explorePath = [];
    path.forEach((node, index) => {
      const timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          this.currentNode = node;
          this.explorePath = [...this.explorePath, node];
          this.cdRef.detectChanges();
        });
      }, index * 200) as unknown as number;

      this.timeoutIds.push(timeoutId);
    });
  }

  private clearTimeouts() {
    this.timeoutIds.forEach(clearTimeout); // Clear each timeout
    this.timeoutIds = []; // Reset the timeout IDs array
  }

  clearAll() {
    this.shortestPath = [];
    this.explorePath = [];
    this.currentNode = new ListNode(-1);
    this.clearTimeouts();
  }
}
