import {TaskListPage} from './task-list.page';
import {TaskListApi} from './api/task-list.api';
import {taskListPageContentComponents} from './content';

export const taskListPageComponents = [
  TaskListPage,
  ...taskListPageContentComponents,
];

export const taskListPageServices = [
  TaskListApi,
];
