import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreecomponentComponent } from './treecomponent.component';

describe('TreecomponentComponent', () => {
  let component: TreecomponentComponent;
  let fixture: ComponentFixture<TreecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
