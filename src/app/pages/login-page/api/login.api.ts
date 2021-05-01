import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class LoginApi {

  constructor(
    private http: HttpClient,
  ) { }

  login(loginData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}login`, loginData);
  }
}
