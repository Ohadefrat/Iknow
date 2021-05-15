import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3fourComponent } from './level3four.component';

describe('Level3fourComponent', () => {
  let component: Level3fourComponent;
  let fixture: ComponentFixture<Level3fourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level3fourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level3fourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
