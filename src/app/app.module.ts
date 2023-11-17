import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MazeBoxComponent } from './maze-box/maze-box.component';
import { BinarysearchtreeComponent } from './binarysearchtree/binarysearchtree.component';
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeBoxComponent,
    BinarysearchtreeComponent,
    SortingVisualizerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
