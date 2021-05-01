import { TestBed } from '@angular/core/testing';

import { TaskCreateApi } from './task-create.api';

describe('TaskCreateApiService', () => {
  let service: TaskCreateApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCreateApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
