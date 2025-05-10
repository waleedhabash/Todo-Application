import type { CreateUpdateTodoDto, GetTodoListDto, TodosDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiName = 'Default';
  

  createTodo = (input: CreateUpdateTodoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodosDto>({
      method: 'POST',
      url: '/api/app/todo/todo',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteTodo = (guid: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: '/api/app/todo/todo',
      params: { guid },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetTodoListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TodosDto>>({
      method: 'GET',
      url: '/api/app/todo',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getTodo = (guid: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodosDto>({
      method: 'GET',
      url: '/api/app/todo/todo',
      params: { guid },
    },
    { apiName: this.apiName,...config });
  

  updateTodo = (input: CreateUpdateTodoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TodosDto>({
      method: 'PUT',
      url: '/api/app/todo/todo',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
