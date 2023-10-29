import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mazeBox',
  templateUrl: './maze-box.component.html',
  styleUrls: ['./maze-box.component.css']
})
export class MazeBoxComponent implements OnInit {
  
  yIds: number[] = [];
  xIds: number[] = [];

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.yIds.push(i);
      this.xIds.push(i)
    }
  }

}
