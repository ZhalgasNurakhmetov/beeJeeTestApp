import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../core/models/task.model';
import {TaskStatusEnum} from '../../enums/task-status.enum';
import {combineLatest, Subject} from 'rxjs';
import {TaskListApi} from '../../api/task-list.api';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/auth/auth.service';
import {AppRoutes} from '../../../../app.routes';
import {takeUntil} from 'rxjs/operators';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetTaskIdToEdit} from '../../store/task-list.action';
import {TaskListRoutes} from '../../task-list.routes';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './task-list-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListTabComponent implements OnInit, OnDestroy {

  taskList: Task[];
  authToken: string = this.authService.getToken();
  sortField = new FormControl('id');
  sortDirection = new FormControl('asc');
  pageNumber = new FormControl(1);
  totalPages: number[] = [];
  isFirstSearch = true;

  taskStatusEnum = TaskStatusEnum;

  private unsubscribe$ = new Subject();

  @Dispatch() setTaskIdToEdit = (taskId: string) => new SetTaskIdToEdit(taskId);

  constructor(
    private taskListApi: TaskListApi,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  goToTaskCreate(): void {
    this.router.navigate([AppRoutes.create]);
  }

  goToLogin(): void {
    this.router.navigate([AppRoutes.login]);
  }

  goToTaskEdit(taskId: string): void {
    this.setTaskIdToEdit(taskId);
    this.router.navigate([AppRoutes.list, TaskListRoutes.edit]);
  }

  logout(): void {
    this.authService.logout();
    this.authToken = this.authService.getToken();
  }

  setSortDirection(sortDirection: string): void {
    this.sortDirection.setValue(sortDirection);
  }

  setSortField(sortField: string): void {
    this.sortField.setValue(sortField);
  }

  setPageNumber(pageNumber: number): void {
    this.pageNumber.setValue(pageNumber);
  }

  private getTaskList(): void {
    combineLatest([this.sortDirection.valueChanges, this.sortField.valueChanges, this.pageNumber.valueChanges])
      .subscribe(([sortDirection, sortField, pageNumber]) => {
        this.taskListApi.getTaskList(sortField, sortDirection, pageNumber)
          .pipe(
            takeUntil(this.unsubscribe$)
          )
          .subscribe(taskList => {
            this.taskList = taskList.message.tasks;
            if (this.isFirstSearch) {
              this.calculateTotalPages(taskList?.message?.total_task_count);
              this.isFirstSearch = false;
            }
            this.cd.markForCheck();
          });
    });
    this.sortDirection.setValue(this.sortDirection.value);
    this.sortField.setValue(this.sortField.value);
    this.pageNumber.setValue(this.pageNumber.value);
  }

  private calculateTotalPages(totalTaskCount: string): void {
    const pages = Math.ceil(+totalTaskCount / 3);
    for (let i = 1; i < pages + 1; i++) {
      this.totalPages.push(i);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
