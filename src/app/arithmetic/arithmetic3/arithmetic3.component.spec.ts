import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arithmetic3Component } from './arithmetic3.component';

describe('Arithmetic3Component', () => {
  let component: Arithmetic3Component;
  let fixture: ComponentFixture<Arithmetic3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arithmetic3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arithmetic3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
