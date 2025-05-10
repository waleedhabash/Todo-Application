import { mapEnumToOptions } from '@abp/ng.core';

export enum Todo_TodoPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export const todo_TodoPriorityOptions = mapEnumToOptions(Todo_TodoPriority);
