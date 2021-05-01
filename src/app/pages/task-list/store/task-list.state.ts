import {TaskListStateModel} from './task-list.state.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ResetState, SetTaskIdToEdit} from './task-list.action';

const defaultTaskListState = (): TaskListStateModel => {
  return {
    taskId: null,
  };
};

@State<TaskListStateModel>({
  name: 'taskList',
  defaults: defaultTaskListState(),
})
@Injectable()
export class TaskListState {

  @Selector()
  static taskId(state: TaskListStateModel): string {
    return state.taskId;
  }

  @Action(SetTaskIdToEdit)
  setTaskId({patchState}: StateContext<TaskListStateModel>, {taskId}: SetTaskIdToEdit) {
    patchState({
      taskId,
    });
  }

  @Action(ResetState)
  resetState({setState}: StateContext<TaskListStateModel>) {
    setState(defaultTaskListState());
  }
}
