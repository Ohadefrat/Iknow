import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPuzzleComponent } from './select-puzzle.component';

describe('SelectPuzzleComponent', () => {
  let component: SelectPuzzleComponent;
  let fixture: ComponentFixture<SelectPuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
