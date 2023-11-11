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

  barArray = Array.from({ length: 30 }, (_, i) => i + 1);

  ngOnInit() {
    this.shuffleArray(this.barArray);
  }

  resetArrayHandler() {
    this.shuffleArray(this.barArray);
  }

  mergeSortArray() {
    const delay = 100;
    let iteration = 0;
    let totalMerges = 0;

    const merge = (leftArr: number[], rightArr: number[], start: number) => {
        const sortedArr: number[] = [];
        let leftIndex = 0, rightIndex = 0;
        totalMerges++;

        const executeMerge = () => {
            if (leftIndex < leftArr.length && rightIndex < rightArr.length) {
                if (leftArr[leftIndex] <= rightArr[rightIndex]) {
                    sortedArr.push(leftArr[leftIndex++]);
                } else {
                    sortedArr.push(rightArr[rightIndex++]);
                }

                setTimeout(executeMerge, delay);
            } else {
                sortedArr.push(...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex));

                setTimeout(() => {
                    for (let i = 0; i < sortedArr.length; i++) {
                        this.barArray[start + i] = sortedArr[i];
                    }
                    totalMerges--;
                    if (totalMerges === 0) {
                        console.log('Sorting complete:', this.barArray);
                    }
                }, delay);
            }
        };

        setTimeout(executeMerge, delay * iteration++);
    };

    const mergeSort = (arr: number[], start = 0): number[] => {
        if (arr.length < 2) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const leftArr = mergeSort(arr.slice(0, mid), start);
        const rightArr = mergeSort(arr.slice(mid), start + mid);

        merge(leftArr, rightArr, start);
        return arr; // Return the original array reference
    };

    mergeSort([...this.barArray]);
}


}
