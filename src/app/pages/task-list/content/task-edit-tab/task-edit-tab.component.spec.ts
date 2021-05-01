import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditTabComponent } from './task-edit-tab.component';

describe('TaskEditTabComponent', () => {
  let component: TaskEditTabComponent;
  let fixture: ComponentFixture<TaskEditTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
