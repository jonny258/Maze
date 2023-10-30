import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'mazeBox',
  templateUrl: './maze-box.component.html',
  styleUrls: ['./maze-box.component.css'],
})
export class MazeBoxComponent implements OnInit {
  yIds: number[] = [];
  xIds: number[] = [];

  @Output() mazeArrayChange = new EventEmitter<boolean[][]>();

  isMouseDown: boolean = false;

  ngOnInit() {
    for (let i = 0; i <= 11; i++) {
      this.yIds.push(i);
      this.xIds.push(i);
    }
  }

  mazeArray = Array(12)
    .fill(null)
    .map((_, rowIndex) =>
      Array(12)
        .fill(null)
        .map(
          (_, colIndex) =>
            rowIndex === 0 ||
            rowIndex === 11 ||
            colIndex === 0 ||
            colIndex === 11
        )
    );

  @HostListener('document:mousedown')
  onMouseDown() {
    this.isMouseDown = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  onSquareHover(y: number, x: number) {
    if (this.isMouseDown) {
      this.changeArrayHandler( y, x );
    }
  }

  changeArrayHandler(y: number, x: number) {
    this.mazeArray[y][x] = !this.mazeArray[y][x];
    this.mazeArrayChange.emit(this.mazeArray);
  }
}
