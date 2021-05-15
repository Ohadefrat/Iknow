import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3twoComponent } from './level3two.component';

describe('Level3twoComponent', () => {
  let component: Level3twoComponent;
  let fixture: ComponentFixture<Level3twoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level3twoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level3twoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
