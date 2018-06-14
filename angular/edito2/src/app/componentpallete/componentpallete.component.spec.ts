import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentpalleteComponent } from './componentpallete.component';

describe('ComponentpalleteComponent', () => {
  let component: ComponentpalleteComponent;
  let fixture: ComponentFixture<ComponentpalleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentpalleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentpalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
