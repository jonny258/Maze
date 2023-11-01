import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarysearchtreeComponent } from './binarysearchtree.component';

describe('BinarysearchtreeComponent', () => {
  let component: BinarysearchtreeComponent;
  let fixture: ComponentFixture<BinarysearchtreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinarysearchtreeComponent]
    });
    fixture = TestBed.createComponent(BinarysearchtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
