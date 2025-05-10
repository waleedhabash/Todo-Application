import { mapEnumToOptions } from '@abp/ng.core';

export enum Todo_TodoStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
}

export const todo_TodoStatusOptions = mapEnumToOptions(Todo_TodoStatus);
