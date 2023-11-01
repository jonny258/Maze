import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MazeBoxComponent } from './maze-box/maze-box.component';
import { BinarysearchtreeComponent } from './binarysearchtree/binarysearchtree.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeBoxComponent,
    BinarysearchtreeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
