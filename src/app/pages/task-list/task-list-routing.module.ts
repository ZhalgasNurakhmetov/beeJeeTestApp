import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListPage} from './task-list.page';
import {TaskListRoutes} from './task-list.routes';
import {TaskListTabComponent} from './content/task-list-tab/task-list-tab.component';
import {TaskEditTabComponent} from './content/task-edit-tab/task-edit-tab.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage,
    children: [
      {
        path: TaskListRoutes.list,
        component: TaskListTabComponent,
      },
      {
        path: TaskListRoutes.edit,
        component: TaskEditTabComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: TaskListRoutes.list,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule { }
