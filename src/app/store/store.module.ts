import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../../environments/environment';
import {ngxsConfig} from './ngxs.config';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {AppState} from './state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([AppState], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production || environment.test, maxAge: 50}),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ]
})
export class StoreModule { }
