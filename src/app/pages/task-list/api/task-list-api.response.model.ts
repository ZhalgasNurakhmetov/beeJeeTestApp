import {Task} from '../../../core/models/task.model';

export interface TaskListApiResponseModel {
  status: string;
  message: PageableTaskListResponse;
}

export interface PageableTaskListResponse {
  tasks: Task[];
  total_task_count: string;
}
