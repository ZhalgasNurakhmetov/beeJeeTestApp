import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import {taskListPageComponents, taskListPageServices} from './index';
import {TaskListStoreModule} from './store/task-list-store.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [...taskListPageComponents],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    TaskListStoreModule,
    ReactiveFormsModule,
  ],
  providers: [...taskListPageServices]
})
export class TaskListModule { }
