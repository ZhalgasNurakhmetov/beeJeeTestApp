import { TestBed } from '@angular/core/testing';

import { LoginApi } from './login.api';

describe('LoginApiService', () => {
  let service: LoginApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
