import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1fourComponent } from './level1four.component';

describe('Level1fourComponent', () => {
  let component: Level1fourComponent;
  let fixture: ComponentFixture<Level1fourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1fourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1fourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
