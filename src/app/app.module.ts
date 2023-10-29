import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MazeSquareComponent } from './maze-square/maze-square.component';
import { MazeBoxComponent } from './maze-box/maze-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeSquareComponent,
    MazeBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
