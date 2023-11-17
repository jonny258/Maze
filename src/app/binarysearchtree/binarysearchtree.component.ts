import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode, TreeComponent } from "../../../helpers/treeNode";

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

// This mess is obviously not scalable or efficient, but only way I know hwo to do it for now

  rootNode: TreeNode;
  leftNode: TreeNode;
  rightNode: TreeNode;
  leftChildOfLeftNode: TreeNode;
  rightChildOfLeftNode: TreeNode;
  leftChildOfRightNode: TreeNode;
  rightChildOfRightNode: TreeNode;

  constructor() {
    this.rootNode = new TreeNode(20);
    this.leftNode = new TreeNode(10);
    this.rightNode = new TreeNode(30);
    this.rootNode.left = this.leftNode;
    this.rootNode.right = this.rightNode;
    this.leftChildOfLeftNode = new TreeNode(5);
    this.rightChildOfLeftNode = new TreeNode(15);
    this.leftNode.left = this.leftChildOfLeftNode;
    this.leftNode.right = this.rightChildOfLeftNode;
    this.leftChildOfRightNode = new TreeNode(25);
    this.rightChildOfRightNode = new TreeNode(35);
    this.rightNode.left = this.leftChildOfRightNode;
    this.rightNode.right = this.rightChildOfRightNode;
  }

  search(key: number): TreeNode | null {
    this.setAllInactive(this.rootNode);
    return this.searchRecursively(this.rootNode, key);
  }

  setAllInactive(node: TreeNode | null) {
    if (!node) return;
    node.isActive = false;
    this.setAllInactive(node.left);
    this.setAllInactive(node.right);
  }


  activateNode(node: TreeNode) {
    node.isActive = true;
  }

  private searchRecursively(node: TreeNode | null, key: number): TreeNode | null {
    if (!node) {
      console.log("Reached a null node; Key not found in this branch.");
      return null;
    }
    console.log("Current node key:", node.key);
    if (key === node.key) {
      console.log("Key matches current node key!");
      this.activateNode(node)
      console.log(node)
      return node;
    }
    if (key < node.key) {
      console.log("Key is smaller than current node key. Moving to the left child...");
      this.activateNode(node)
      return this.searchRecursively(node.left, key);
    } else {
      console.log("Key is larger than current node key. Moving to the right child...");
      this.activateNode(node)
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
