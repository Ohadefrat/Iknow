import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level4threeComponent } from './level4three.component';

describe('Level4threeComponent', () => {
  let component: Level4threeComponent;
  let fixture: ComponentFixture<Level4threeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level4threeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level4threeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
