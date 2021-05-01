import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {TaskListState} from './task-list.state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([TaskListState])
  ]
})
export class TaskListStoreModule { }
