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

  // sortIntervalId: any;
  barArray = Array.from({ length: 100 }, (_, i) => i + 1);

  ngOnInit() {
    this.shuffleArray(this.barArray);
  }

  resetArrayHandler() {
    this.isSorting = false;
    this.shuffleArray(this.barArray);
  }

  activeRight: number | null = null;
  activeLeft: number | null = null;
  activeIndex: number | null = null;
  barColorClass: string[] = Array(100).fill('bg-white');
  isSorting: boolean = false;
  currentIndex: number = 0;
  stepArray: any[] = []; // Add this line
  intervalLength: number = 50;

  visualizeSort(stepArray: any, interval: number) {
    this.isSorting = true;
    this.stepArray = stepArray; // Store the stepArray
    this.barColorClass = Array(100).fill('bg-white');

    const executeStep = () => {
      if (this.currentIndex < stepArray.length && this.isSorting) {
        const step = stepArray[this.currentIndex];

        // Update barArray for the current step
        this.barArray = step.fullArray;

        // Reset barColorClass for the current visualization
        this.barColorClass = Array(100).fill('bg-white');

        this.currentIndex++;
        if (this.currentIndex < stepArray.length) {
          setTimeout(executeStep, interval);
        }
      }
    };

    executeStep();
  }

  startStopSort() {
    if (this.isSorting) {
      this.isSorting = false;
    } else {
      if (this.currentIndex < this.stepArray.length) {
        this.isSorting = true;
        this.visualizeSort(this.stepArray, this.intervalLength);
      }
    }
  }
  // stopSort() {
  //   this.isSorting = false;
  // }

  // resumeSort() {
  //   if (this.currentIndex < this.stepArray.length) {
  //     this.isSorting = true;
  //     this.visualizeSort(this.stepArray, this.intervalLength);
  //   }
  // }
  setSpeed(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.intervalLength = Number(inputElement.value);
  }

  resetSortVariables() {
    this.currentIndex = 0;
    this.isSorting = false;
  }

  mergeSortHandler() {
    if (this.isSorting) {
      this.isSorting = false;
    } else {
      const sortSteps = mergeSortVisualized(this.barArray);
      console.log(sortSteps);
      this.resetSortVariables();
      this.visualizeSort(sortSteps, this.intervalLength);
    }
  }

  binaryInsertionSortHandler() {
    const sortSteps = binaryInsertionSortVisualized(this.barArray);
    console.log(sortSteps);
    this.resetSortVariables();
    this.visualizeSort(sortSteps, this.intervalLength);
  }
  quickSortHandler() {
    if (this.isSorting) {
      this.isSorting = false;
    } else {
      const sortSteps = quickSortVisualized(this.barArray);
      console.log(sortSteps);
      this.resetSortVariables();
      this.visualizeSort(sortSteps, this.intervalLength);
    }
  }

  cocktailShakerSortHandler() {
    const sortSteps = cocktailShakerSortVisualized(this.barArray);
    console.log(sortSteps);
    this.resetSortVariables();
    this.visualizeSort(sortSteps, this.intervalLength);
  }

  LSDRadixSortHandler() {
    const sortSteps = LSDRadixSortVisualized(this.barArray);
    console.log(sortSteps);
    this.resetSortVariables();
    this.visualizeSort(sortSteps, this.intervalLength);
  }
}
