import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level4twoComponent } from './level4two.component';

describe('Level4twoComponent', () => {
  let component: Level4twoComponent;
  let fixture: ComponentFixture<Level4twoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level4twoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level4twoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
