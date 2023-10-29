import { Component } from '@angular/core';

@Component({
  selector: 'mazeSquare',
  templateUrl: './maze-square.component.html',
  styleUrls: ['./maze-square.component.css']
})
export class MazeSquareComponent {
  boxElement = document.querySelectorAll('.box');

  mazeSquareClickHandler(){
    const boxElements = document.querySelectorAll('.box');
    console.log(Array.from(boxElements));
  }
}
