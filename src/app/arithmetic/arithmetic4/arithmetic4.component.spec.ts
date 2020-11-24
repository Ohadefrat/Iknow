import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arithmetic4Component } from './arithmetic4.component';

describe('Arithmetic4Component', () => {
  let component: Arithmetic4Component;
  let fixture: ComponentFixture<Arithmetic4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arithmetic4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arithmetic4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
