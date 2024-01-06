export function binaryInsertionSortVisualized(barArray: number[]) {
  function binarySearch(
    arr: number[],
    item: number,
    start: number,
    end: number
  ) {
    if (start >= end) {
      if (arr[start] > item) return start;
      else return start + 1;
    }

    let mid = Math.floor((start + end) / 2);

    if (item < arr[mid]) {
      return binarySearch(arr, item, start, mid);
    } else {
      return binarySearch(arr, item, mid + 1, end);
    }
  }

  const steps: any[] = [];
  let arr = [...barArray];
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];

    let postition = binarySearch(arr, current, 0, i - 1);

    for (let j = i - 1; j >= postition; j--) {
      arr[j + 1] = arr[j];
    }
    arr[postition] = current;

    steps.push({
      action: null,
      segment: null,
      fullArray: [...arr],
      divideIndex: null,
    });
  }
  return steps;
}

export function quickSortVisualized(barArray: number[]) {
  let sortSteps: any = [];
  const quickSort = (arr: number[], left: number, right: number) => {
    if (left >= right) {
      return;
    }

    const partition = (
      arr: number[],
      left: number,
      right: number,
      pivot: number
    ) => {
      while (left <= right) {
        while (arr[left] < pivot) {
          left++;
        }
        while (arr[right] > pivot) {
          right--;
        }
        if (left <= right) {
          [arr[left], arr[right]] = [arr[right], arr[left]];
          left++;
          right--;
          sortSteps.push({
            action: null,
            segment: null,
            fullArray: [...arr],
            divideIndex: null,
          });
        }
      }
      return left;
    };

    let pivot = arr[Math.floor((left + right) / 2)];
    let index = partition(arr, left, right, pivot);
    quickSort(arr, left, index - 1);
    quickSort(arr, index, right);
  };

  quickSort(barArray, 0, barArray.length - 1);
  return sortSteps;
}

export function cocktailShakerSortVisualized(barArray: number[]) {
  let arr = [...barArray];
  let sortSteps: any = [];
  let noSwaps = false;
  while (!noSwaps) {
    let leftMost = 0;
    let rightMost = arr.length - 1;
    noSwaps = true;
    for (let i = leftMost; i < rightMost - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        noSwaps = false;
        //rightMost--
        sortSteps.push({
          action: null,
          segment: null,
          fullArray: [...arr],
          divideIndex: null,
        });
      }
    }

    for (let i = rightMost; i > leftMost + 1; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        noSwaps = false;
        //leftMost++
        sortSteps.push({
          action: null,
          segment: null,
          fullArray: [...arr],
          divideIndex: null,
        });
      }
    }
  }
  return sortSteps;
}

export function LSDRadixSortVisualized(barArray: number[]): any[] {
  let arr = [...barArray];
  const sortSteps: any[] = [];
  if (arr.length === 0) return sortSteps;

  const getMaxDigits = (nums: number[]): number => {
    let maxDigits = 0;
    for (let num of nums) {
      maxDigits = Math.max(maxDigits, num.toString().length);
    }
    return maxDigits;
  };

  const getDigit = (num: number, pos: number): number => {
    return Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
  };

  let maxDigits = getMaxDigits(arr);

  for (let k = 0; k < maxDigits; k++) {
    let buckets: number[][] = Array.from({ length: 10 }, () => []);
    let tempArray: number[] = [...arr]; // Initialize with the current array state

    let count = 0; // To keep track of filled elements in tempArray
    for (let i = 0; i < arr.length; i++) {
      let digit = getDigit(arr[i], k);
      buckets[digit].push(arr[i]);

      // Update tempArray with the current state of buckets
      count = 0; // Reset count for each bucket update
      for (let j = 0; j < buckets.length; j++) {
        for (let num of buckets[j]) {
          tempArray[count++] = num;
        }
      }

      sortSteps.push({
        action: null,
        segment: null,
        fullArray: [...tempArray],
        divideIndex: null,
      });
    }

    arr = buckets.flat(); // Flatten the buckets for the next pass
    // Capture state after reconstructing the array from buckets
    sortSteps.push({
      action: null,
      segment: null,
      fullArray: [...arr],
      divideIndex: null,
    });
  }

  return sortSteps;
}

export function mergeSortVisualized(arr: number[]): any[] {
  const steps: any[] = []; //This is the product of the function, a snapshot of the array at everystep
  const auxArray = [...arr]; //This array is what we use mirror the changes that are happening to the input array without directly modifying the input array

  function merge(
    left: number[], //The left array that needs to be merged
    right: number[], //The right array that needs to be merged
    leftStart: number, //This is how the function knows what index of the auxArray it should edit
    rightEnd: number
  ): void {
    let leftIndex = 0, //These are to cycle through the left and right array
      rightIndex = 0,
      mainIndex = leftStart; //The main index is again where the merge will be changed in the auxArray

    while (leftIndex < left.length && rightIndex < right.length) {
      let action; //This variable will save the type of action being done, this will make my life easier for animating

      if (left[leftIndex] <= right[rightIndex]) {
        //If left is less right push left
        auxArray[mainIndex] = left[leftIndex];
        action = 'left';
        leftIndex++;
      } else {
        //If right is less then left push right
        auxArray[mainIndex] = right[rightIndex];
        action = 'right';
        rightIndex++;
      }

      steps.push({
        leftElement: leftIndex < left.length ? left[leftIndex] : null, //Checks is the leftIndex is in the bounds of the left array and if so it sets the left element to that index
        rightElement: rightIndex < right.length ? right[rightIndex] : null,
        action: action, //This saves what type of action is taking place for animating
        updatedIndex: mainIndex, //This is what index is actually being updated
        fullArray: [...auxArray], //A copy of the array so that it is easy to visualize what is taking place
      });

      mainIndex++; //Increase the main index so that you don't accidentally add things over a already updated index
    }

    while (leftIndex < left.length) {
      //Add the remaining elements in the left array
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
      //Add the remaining elements in the right array
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
      //Save the merge completion here too so that you can see what one just got merged
      leftElement: leftIndex < left.length ? left[leftIndex] : null,
      rightElement: rightIndex < right.length ? right[rightIndex] : null,
      action: 'merge-complete',
      updatedIndex: mainIndex - 1,
      fullArray: [...auxArray],
    });
  }

  function sort(start: number, end: number): void {
    if (end <= start) {
      // Base case for when the array is fully broken down
      return;
    }

    const mid: number = Math.floor((start + end) / 2); // Sets the mid

    // Record before sorting the left and right parts
    steps.push({
      action: 'divide',
      segment: auxArray.slice(start, end + 1),
      fullArray: [...auxArray],
      divideIndex: mid,
    });

    sort(start, mid); // Breaks the array over the mid then re runs it
    sort(mid + 1, end); // Breaks the array over the mid then re runs it

    // Record after sorting left and right, before merge
    steps.push({
      action: 'before-merge',
      segment: auxArray.slice(start, end + 1),
      fullArray: [...auxArray],
      divideIndex: mid,
    });

    const left = auxArray.slice(start, mid + 1); // Takes the part of the auxArray that will be merged and saves it to left
    const right = auxArray.slice(mid + 1, end + 1); // Takes the part of the auxArray that will be merged and saves it to right
    merge(left, right, start, end); // Calls the merge function
  }

  sort(0, arr.length - 1); //Initial call
  return steps;
}
