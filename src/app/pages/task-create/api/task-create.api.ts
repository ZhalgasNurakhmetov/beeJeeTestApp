import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class TaskCreateApi {

  constructor(
    private http: HttpClient,
  ) { }

  createTask(task: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}create`, task);
  }
}
