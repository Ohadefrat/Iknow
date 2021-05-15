import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3threeComponent } from './level3three.component';

describe('Level3threeComponent', () => {
  let component: Level3threeComponent;
  let fixture: ComponentFixture<Level3threeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level3threeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level3threeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
