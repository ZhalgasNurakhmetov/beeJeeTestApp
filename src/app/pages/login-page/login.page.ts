import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LoginApi} from './api/login.api';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppRoutes} from '../../app.routes';
import {AuthService} from '../../core/auth/auth.service';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

  isLoading = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private loginApi: LoginApi,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private toaster: ToastrService,
  ) { }

  login(): void {
    this.isLoading = true;
    const loginFormData = new FormData();
    loginFormData.append('username', this.loginForm.controls.username.value);
    loginFormData.append('password', this.loginForm.controls.password.value);
    this.loginApi.login(loginFormData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe(response => {
        if (response.status === 'error') {
          this.toaster.error(response.message.password, 'Ошибка', {timeOut: 3000});
          return;
        }
        this.authService.setToken(response.message.token);
        this.goBackToTaskList();
      });
  }

  goBackToTaskList(): void {
    this.router.navigate([AppRoutes.list]);
  }
}
