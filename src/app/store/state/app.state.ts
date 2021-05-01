import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';

@State<{}>(
  {
    name: 'app',
    defaults: {}
  }
)
@Injectable()
export class AppState {
}
