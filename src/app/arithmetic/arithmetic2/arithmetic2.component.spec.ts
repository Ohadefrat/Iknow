import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arithmetic2Component } from './arithmetic2.component';

describe('Arithmetic2Component', () => {
  let component: Arithmetic2Component;
  let fixture: ComponentFixture<Arithmetic2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arithmetic2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arithmetic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
