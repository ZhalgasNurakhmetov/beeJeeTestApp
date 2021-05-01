import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {TaskListApiResponseModel} from './task-list-api.response.model';

@Injectable()
export class TaskListApi {

  constructor(
    private http: HttpClient,
  ) { }

  getTaskList(sortField: string, sortDirection: string, page: number): Observable<TaskListApiResponseModel> {
    return this.http.get<TaskListApiResponseModel>(`${environment.apiUrl}`, {params: {
        sort_field: sortField,
        sort_direction: sortDirection,
        page: page.toString(),
      }});
  }

  editTask(taskId: string, task: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}edit/${taskId}`, task);
  }
}
