import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeBoxComponent } from './maze-box.component';

describe('MazeBoxComponent', () => {
  let component: MazeBoxComponent;
  let fixture: ComponentFixture<MazeBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MazeBoxComponent]
    });
    fixture = TestBed.createComponent(MazeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
