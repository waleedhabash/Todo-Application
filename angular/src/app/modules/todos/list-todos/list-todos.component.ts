import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetTodoListDto, TodosDto, TodoService } from 'src/app/proxy/todos';
import {  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { query } from '@angular/animations';
import { Observable } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { ConfirmationService,Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-list-todos',
  imports: [[ ReactiveFormsModule,NgxDatatableModule,CommonModule]],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.scss',
  providers:[ListService]

})
export class ListTodosComponent implements OnInit {
  todos$:Observable<PagedResultDto<TodosDto>>;
  todos: TodosDto[]=[];
  input:PagedAndSortedResultRequestDto = {maxResultCount:10,sorting:'',skipCount:0}
  searchForm:FormGroup;
constructor(private todoService : TodoService,private router:Router ,private formBuilder:FormBuilder,public readonly listt : ListService<GetTodoListDto>,private confirmationService : ConfirmationService)
{
this.buildForm()
}
buildForm(){
  this.searchForm=this.formBuilder.group(
    {
      filter:new FormControl(''),
maxResultCount:new FormControl(50,Validators.required)
    }
  );
}
ngOnInit(): void {
  this.searchTodos();
}
addTodo(){
  this.router.navigateByUrl('/todos/add');
}
searchTodos(){
  const productStreamCreator=query=>this.todoService.getList({...query,...this.searchForm.value});
  this.todos$=this.listt.hookToQuery(productStreamCreator);
}
deleteTodo(id:string){
this.confirmationService.warn('::Are You Sure To Delete','::AreYouSure').subscribe((statuss)=>{
if (statuss===Confirmation.Status.confirm){
this.todoService.deleteTodo(id).subscribe(()=> this.listt.get())
}
});
}
editTodo(id:string){
  this.router.navigate(['/todos/edit',id]);
}
}
