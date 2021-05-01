export class SetTaskIdToEdit {
  static readonly type = '[Task List] Set Task Id To Edit';
  constructor(public taskId: string) { }
}

export class ResetState {
  static readonly type = '[Task List] Reset State';
}
