import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
{
  path: 'add',
  pathMatch: 'full',
  component: AddTodoComponent
},
{
  path:'',
  pathMatch: 'full',
  component: ListTodosComponent
},
{
  path:'edit/:id',
  pathMatch: 'full',
  component: EditTodoComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
