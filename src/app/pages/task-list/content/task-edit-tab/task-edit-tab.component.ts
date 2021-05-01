import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TaskListState} from '../../store/task-list.state';
import {Select} from '@ngxs/store';
import {finalize, takeUntil} from 'rxjs/operators';
import {TaskListApi} from '../../api/task-list.api';
import {AuthService} from '../../../../core/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {ResetState} from '../../store/task-list.action';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../../app.routes';
import {TaskListRoutes} from '../../task-list.routes';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './task-edit-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditTabComponent implements OnInit, OnDestroy {

  @Select(TaskListState.taskId) taskId$: Observable<string>;

  taskId: string;
  authToken: string = this.authService.getToken();
  isLoading = false;

  taskEditForm = this.fb.group({
    text: [null, [Validators.required]],
    status: [null, [Validators.required]],
  });

  statusList = [
    {code: 0, description: 'Задача не выполнена'},
    {code: 1, description: 'Задача не выполнена, отредактирована админом'},
    {code: 10, description: 'Задача выполнена'},
    {code: 11, description: 'Задача отредактирована админом и выполнена'},
  ];
  statusDescription = 'Выбрать статус';

  private unsubscribe$ = new Subject();

  @Dispatch() resetState = () => new ResetState();

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private taskListApi: TaskListApi,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.subscribeToTaskId();
  }

  editTask(): void {
    this.isLoading = true;
    const taskEditFormData = new FormData();
    taskEditFormData.append('text', this.taskEditForm.controls.text.value);
    taskEditFormData.append('status', this.taskEditForm.controls.status.value);
    taskEditFormData.append('token', this.authToken);
    this.taskListApi.editTask(this.taskId, taskEditFormData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe(response => {
        if (response.status === 'error') {
          if (response.message.token) {
            this.toaster.error(response.message.token, 'Ошибка', {timeOut: 3000});
          }
        }
        this.goBackToTaskList();
      });
  }

  setStatus(statusCode: number, statusDescription: string): void {
    this.taskEditForm.controls.status.setValue(statusCode);
    this.statusDescription = statusDescription;
    this.cd.markForCheck();
  }

  goBackToTaskList(): void {
    this.router.navigate([AppRoutes.list, TaskListRoutes.list]);
    this.resetState();
    this.taskEditForm.reset();
  }

  private subscribeToTaskId(): void {
    this.taskId$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(taskId => {
        this.taskId = taskId;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
