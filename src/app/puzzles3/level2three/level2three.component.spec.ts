import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2threeComponent } from './level2three.component';

describe('Level2threeComponent', () => {
  let component: Level2threeComponent;
  let fixture: ComponentFixture<Level2threeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2threeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2threeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
