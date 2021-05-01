import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import {loginPageComponents, loginPageServices} from './index';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [...loginPageComponents],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [...loginPageServices]
})
export class LoginPageModule { }
