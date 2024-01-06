import { Component } from '@angular/core';
import {
  binaryInsertionSortVisualized,
  quickSortVisualized,
  cocktailShakerSortVisualized,
  mergeSortVisualized,
  LSDRadixSortVisualized,
} from '../sortFunctions';

@Component({
  selector: 'sortingVisualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css'],
})
export class SortingVisualizerComponent {
  shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  barArray = Array.from({ length: 100 }, (_, i) => i + 1);

  ngOnInit() {
    this.shuffleArray(this.barArray);
  }

  resetArrayHandler() {
    this.shuffleArray(this.barArray);
  }

  activeRight: number | null = null;
  activeLeft: number | null = null;
  activeIndex: number | null = null;
  barColorClass: string[] = Array(100).fill('bg-white');

  //I NEED TO FIGURE OUT HOW TO ANIMATE THIS WELL WITH COLORS??
  visualizeSort(stepArray: any, interval: number) {
    this.barColorClass = Array(100).fill('bg-white');
    stepArray.forEach((step: any, index: number) => {
      setTimeout(() => {
        // this.barColorClass = Array(20).fill('bg-white')
        // switch (step.action) {
        //   case 'left': {
        //     // this.barColorClass[index] = 'bg-green-500';
        //     break;
        //   }
        //   case 'right': {
        //     // this.barColorClass[index] = 'bg-blue-500';
        //     break;
        //   }
        //   case 'merge-complete': {
        //     console.log('merge-complete');
        //     break;
        //   }
        //   case 'divide': {
        //     console.log('divide');
        //     break;
        //   }
        //   case 'before-merge': {
        //     console.log('before-merge');
        //     break;
        //   }
        // }
        this.barArray = step.fullArray;
      }, interval * index);
    });
  }

  mergeSortHandler() {
    const sortSteps = mergeSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps, 10);
  }

  binaryInsertionSortHandler() {
    const sortSteps = binaryInsertionSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps, 50);
  }

  quickSortHandler() {
    const sortSteps = quickSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps, 50);
  }

  cocktailShakerSortHandler() {
    const sortSteps = cocktailShakerSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps, 5);
  }

  LSDRadixSortHandler() {
    const sortSteps = LSDRadixSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps, 20);
  }
}
