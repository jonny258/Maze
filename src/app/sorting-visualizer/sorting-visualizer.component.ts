import { Component } from '@angular/core';

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

  visualizeSort(stepArray: any) {
    stepArray.forEach((step: any, index: number) => {
      setTimeout(() => {
        this.barArray = step.fullArray;
      }, 20 * index);
    });
  }

  mergeSortVisualized(arr: number[]): any[] {
    const steps: any[] = [];
    const auxArray = [...arr];

    function merge(
      left: number[],
      right: number[],
      leftStart: number,
      rightEnd: number
    ): void {
      let leftIndex = 0,
        rightIndex = 0,
        mainIndex = leftStart;

      while (leftIndex < left.length && rightIndex < right.length) {
        let action;

        if (left[leftIndex] <= right[rightIndex]) {
          auxArray[mainIndex] = left[leftIndex];
          action = 'left';
          leftIndex++;
        } else {
          auxArray[mainIndex] = right[rightIndex];
          action = 'right';
          rightIndex++;
        }

        steps.push({
          leftElement: leftIndex < left.length ? left[leftIndex] : null,
          rightElement: rightIndex < right.length ? right[rightIndex] : null,
          action: action,
          updatedIndex: mainIndex,
          fullArray: [...auxArray],
        });

        mainIndex++;
      }

      while (leftIndex < left.length) {
        auxArray[mainIndex] = left[leftIndex];

        steps.push({
          leftElement: left[leftIndex],
          rightElement: null,
          action: 'left',
          updatedIndex: mainIndex,
          fullArray: [...auxArray],
        });

        leftIndex++;
        mainIndex++;
      }

      while (rightIndex < right.length) {
        auxArray[mainIndex] = right[rightIndex];

        steps.push({
          leftElement: null,
          rightElement: right[rightIndex],
          action: 'right',
          updatedIndex: mainIndex,
          fullArray: [...auxArray],
        });

        rightIndex++;
        mainIndex++;
      }

      steps.push({
        leftElement: leftIndex < left.length ? left[leftIndex] : null,
        rightElement: rightIndex < right.length ? right[rightIndex] : null,
        action: 'merge-complete',
        updatedIndex: mainIndex - 1,
        fullArray: [...auxArray],
      });
    }

    function sort(start: number, end: number): void {
      if (end <= start) {
        return;
      }

      const mid: number = Math.floor((start + end) / 2);
      sort(start, mid);
      sort(mid + 1, end);

      const left = auxArray.slice(start, mid + 1);
      const right = auxArray.slice(mid + 1, end + 1);
      merge(left, right, start, end);
    }

    sort(0, arr.length - 1);
    return steps;
  }

  mergeSortHandler() {
    const sortSteps = this.mergeSortVisualized(this.barArray);
    console.log(sortSteps);
    this.visualizeSort(sortSteps);
  }
}
