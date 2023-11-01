import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from "../../../helpers/treeNode";

@Component({
  selector: 'binarysearchtree',
  templateUrl: './binarysearchtree.component.html',
  styleUrls: ['./binarysearchtree.component.css'],
})
export class BinarysearchtreeComponent {

  userInput: string = '';
  userNumber: number = 0;

  addNumberString: string = '';
  addNumberNumber: number = 0;

  rootNode: TreeNode;
  leftNode: TreeNode;
  rightNode: TreeNode;

  constructor() {
    this.rootNode = new TreeNode(20);
    this.leftNode = new TreeNode(10);
    this.rightNode = new TreeNode(30);
    this.rootNode.left = this.leftNode;
    this.rootNode.right = this.rightNode;
    let leftChildOfLeftNode = new TreeNode(5);
    let rightChildOfLeftNode = new TreeNode(15);
    this.leftNode.left = leftChildOfLeftNode;
    this.leftNode.right = rightChildOfLeftNode;
    let leftChildOfRightNode = new TreeNode(25);
    let rightChildOfRightNode = new TreeNode(35);
    this.rightNode.left = leftChildOfRightNode;
    this.rightNode.right = rightChildOfRightNode;
  }

  search(key: number): TreeNode | null {
    return this.searchRecursively(this.rootNode, key);
  }

  private searchRecursively(node: TreeNode | null, key: number): TreeNode | null {
    if (!node) {
      console.log("Reached a null node; Key not found in this branch.");
      return null;
    }
    console.log("Current node key:", node.key);
    if (key === node.key) {
      console.log("Key matches current node key!");
      return node;
    }
    if (key < node.key) {
      console.log("Key is smaller than current node key. Moving to the left child...");
      return this.searchRecursively(node.left, key);
    } else {
      console.log("Key is larger than current node key. Moving to the right child...");
      return this.searchRecursively(node.right, key);
    }
  }

  getInput(event: any) {
    this.userInput = event.target.value;
    this.userNumber = this.getIntegerFromInput(this.userInput);
    this.search(this.userNumber);
  }

  addNumber(event: any) {
    this.addNumberString = event.target.value;
    this.addNumberNumber = this.getIntegerFromInput(this.addNumberString);
  }

  getIntegerFromInput(value: string): number {
    return parseInt(value, 10);
  }


  // addNumberFunction(): any {
  //   constructor() {

  //   }
  // }
}
