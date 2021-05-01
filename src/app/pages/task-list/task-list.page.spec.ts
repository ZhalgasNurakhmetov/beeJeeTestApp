import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListPage } from './task-list.page';

describe('TaskListPageComponent', () => {
  let component: TaskListPage;
  let fixture: ComponentFixture<TaskListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
