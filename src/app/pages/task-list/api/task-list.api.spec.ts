import { TestBed } from '@angular/core/testing';

import { TaskListApi } from './task-list.api';

describe('TaskListApiService', () => {
  let service: TaskListApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
