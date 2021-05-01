import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TaskCreateApi} from './api/task-create.api';
import {Router} from '@angular/router';
import {AppRoutes} from '../../app.routes';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './task-create.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreatePage {

  isLoading = false;

  taskCreateForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^(?!\\s+$).*')]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    text: ['', [Validators.required, Validators.pattern('^(?!\\s+$).*')]],
  });

  constructor(
    private fb: FormBuilder,
    private taskCreateApi: TaskCreateApi,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toaster: ToastrService,
  ) { }

  createTask(): void {
    this.isLoading = true;
    const taskCreateFormData = new FormData();
    taskCreateFormData.append('username', this.taskCreateForm.controls.username.value);
    taskCreateFormData.append('email', this.taskCreateForm.controls.email.value);
    taskCreateFormData.append('text', this.taskCreateForm.controls.text.value);
    this.taskCreateApi.createTask(taskCreateFormData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe(response => {
        if (response.status === 'error') {
          if (response.message.username) {
            this.toaster.error(response.message.username, 'Ошибка', {timeOut: 3000});
          }
          if (response.message.email) {
            this.toaster.error(response.message.email, 'Ошибка', {timeOut: 3000});
          }
          if (response.message.text) {
            this.toaster.error(response.message.text, 'Ошибка', {timeOut: 3000});
          }
          return;
        }
        this.toaster.success('Задание успешно создано', 'Готов', {timeOut: 3000});
        this.goBackToTaskList();
      });
  }

  goBackToTaskList(): void {
    this.router.navigate([AppRoutes.list]);
    this.taskCreateForm.reset();
  }
}
