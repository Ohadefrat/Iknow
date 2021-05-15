import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2fourComponent } from './level2four.component';

describe('Level2fourComponent', () => {
  let component: Level2fourComponent;
  let fixture: ComponentFixture<Level2fourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2fourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2fourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
