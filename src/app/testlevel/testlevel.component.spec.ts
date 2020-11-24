import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlevelComponent } from './testlevel.component';

describe('TestlevelComponent', () => {
  let component: TestlevelComponent;
  let fixture: ComponentFixture<TestlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
