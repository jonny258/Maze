import { Component, Input } from '@angular/core';

@Component({
  selector: 'mazeSquare',
  templateUrl: './maze-square.component.html',
  styleUrls: ['./maze-square.component.css']
})
export class MazeSquareComponent {
  @Input() xId: number | undefined
  @Input() yId: number | undefined

  // boxStyleNotWall = "bg-gray w-10 h-10 border-[1px]";
  // boxStyleWall = "bg-black w-10 h-10 border-[1px]";
  isWall = false

  style = "bg-white w-10 h-10 border-[1px]"


  boxClickHandler(){
    console.log(this.xId)
    console.log(this.yId)
    this.isWall ? this.style = "bg-white w-10 h-10 border-[1px]" : this.style = "bg-black w-10 h-10 border-[1px]"
    this.isWall = !this.isWall
  }
}
