import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level4fourComponent } from './level4four.component';

describe('Level4fourComponent', () => {
  let component: Level4fourComponent;
  let fixture: ComponentFixture<Level4fourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level4fourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level4fourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
