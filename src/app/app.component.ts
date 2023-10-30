import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'maze';

  mazeArray: boolean[][] = [[]];

  onMazeArrayChange(updatedMazeArray: boolean[][]) {
    this.mazeArray = updatedMazeArray;
  }

  runCodeHandler() {
    console.log(this.mazeArray);

    let count = 0;
    for (let i = 1; i < this.mazeArray[0].length - 1; i++) {
      if (!this.mazeArray[0][i]) {
        count++;
      }
      if (!this.mazeArray[this.mazeArray.length - 1][i]) {
        count++;
      }
    }

    for (let i = 1; i < this.mazeArray.length - 1; i++) {
      if (!this.mazeArray[i][0]) {
        count++;
      }
      if (!this.mazeArray[i][this.mazeArray[i].length - 1]) {
        count++;
      }
    }

    if(count !== 2){
      alert("Please have 2 spaces on the perimeter")
    }

    return count;
  }
}
