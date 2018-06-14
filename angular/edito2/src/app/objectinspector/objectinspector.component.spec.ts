import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectinspectorComponent } from './objectinspector.component';

describe('ObjectinspectorComponent', () => {
  let component: ObjectinspectorComponent;
  let fixture: ComponentFixture<ObjectinspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectinspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectinspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
