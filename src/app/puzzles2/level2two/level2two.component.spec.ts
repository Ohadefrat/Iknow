import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2twoComponent } from './level2two.component';

describe('Level2twoComponent', () => {
  let component: Level2twoComponent;
  let fixture: ComponentFixture<Level2twoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2twoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2twoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
