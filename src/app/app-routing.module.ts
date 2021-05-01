import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from './app.routes';

const routes: Routes = [
  {
    path: AppRoutes.list,
    loadChildren: () => import('./pages/task-list/task-list.module').then(m => m.TaskListModule)
  },
  {
    path: AppRoutes.create,
    loadChildren: () => import('./pages/task-create/task-create.module').then(m => m.TaskCreateModule),
  },
  {
    path: AppRoutes.login,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.list,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
