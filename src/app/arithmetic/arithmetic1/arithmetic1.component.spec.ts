import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arithmetic1Component } from './arithmetic1.component';

describe('Arithmetic1Component', () => {
  let component: Arithmetic1Component;
  let fixture: ComponentFixture<Arithmetic1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arithmetic1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arithmetic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
