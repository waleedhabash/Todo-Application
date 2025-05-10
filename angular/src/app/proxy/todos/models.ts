import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { Todo_TodoStatus } from './todo-todo-status.enum';
import type { Todo_TodoPriority } from './todo-todo-priority.enum';

export interface CreateUpdateTodoDto extends EntityDto<string> {
  title: string;
  description?: string;
  status?: Todo_TodoStatus;
  priority?: Todo_TodoPriority;
  dueDate?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface GetTodoListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface TodosDto extends FullAuditedEntityDto<string> {
  title: string;
  description?: string;
  status?: Todo_TodoStatus;
  priority?: Todo_TodoPriority;
  dueDate?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}
