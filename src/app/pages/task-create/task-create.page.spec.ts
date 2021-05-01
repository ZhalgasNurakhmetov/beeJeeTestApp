import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatePage } from './task-create.page';

describe('TaskCreatePageComponent', () => {
  let component: TaskCreatePage;
  let fixture: ComponentFixture<TaskCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreatePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
