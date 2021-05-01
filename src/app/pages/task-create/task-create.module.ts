import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskCreateRoutingModule } from './task-create-routing.module';
import {taskCreateComponents, taskCreateServices} from './index';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [...taskCreateComponents],
  imports: [
    CommonModule,
    TaskCreateRoutingModule,
    ReactiveFormsModule
  ],
  providers: [...taskCreateServices]
})
export class TaskCreateModule { }
