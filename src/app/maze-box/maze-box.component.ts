import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

class ListNode {
  value: number;
  neighbors: ListNode[];

  constructor(value: number) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(node: ListNode): void {
    this.neighbors.push(node);
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
  yIds: number[] = [];
  xIds: number[] = [];

  @Output() mazeArrayChange = new EventEmitter<boolean[][]>();

  isMouseDown: boolean = false;

  mazeGraph = new Graph

  ngOnInit() {
    for (let i = 0; i <= 11; i++) {
      this.yIds.push(i);
      this.xIds.push(i);
    }

    for(let i=0; i<144; i++){
      this.mazeGraph.addNode(i)
    }

    for(let i=0; i<this.mazeGraph.nodes.length; i++){
      if((this.mazeGraph.nodes[i].value + 1) % 12 !== 0){
        this.mazeGraph.addEdge(i, i + 1)
      }
      if(this.mazeGraph.nodes[i].value + 12 < 144){
        this.mazeGraph.addEdge(i, i + 12)
      }
    }
    console.log(this.mazeGraph.nodes)
  }





  mazeArray = Array(12)
    .fill(null)
    .map((_, rowIndex) =>
      Array(12)
        .fill(null)
        .map(
          (_, colIndex) =>
            rowIndex === 0 ||
            rowIndex === 11 ||
            colIndex === 0 ||
            colIndex === 11
        )
    );

  @HostListener('document:mousedown')
  onMouseDown() {
    this.isMouseDown = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  onSquareHover(y: number, x: number) {
    if (this.isMouseDown) {
      this.changeArrayHandler(y, x);
    }
  }

  changeArrayHandler(y: number, x: number) {
    this.mazeArray[y][x] = !this.mazeArray[y][x];
    this.mazeArrayChange.emit(this.mazeArray);
  }


  //
  //
  //


  testButtonHandler(){
    console.log(this.mazeGraph)
  }

  nodeClickHandler(node: ListNode){
    console.log(node)
  }
}
