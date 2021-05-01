import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListTabComponent } from './task-list-tab.component';

describe('TaskListTabComponent', () => {
  let component: TaskListTabComponent;
  let fixture: ComponentFixture<TaskListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
