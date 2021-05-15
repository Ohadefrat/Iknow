import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1threeComponent } from './level1three.component';

describe('Level1threeComponent', () => {
  let component: Level1threeComponent;
  let fixture: ComponentFixture<Level1threeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1threeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1threeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
