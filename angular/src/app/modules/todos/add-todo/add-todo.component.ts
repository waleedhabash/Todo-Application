import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { CreateUpdateTodoDto, TodoService } from 'src/app/proxy/todos';

@Component({
  selector: 'app-add-todo',
  imports: [ ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  todoForm:FormGroup;
  id: string;
constructor (
  private todoServices : TodoService,
  private router : Router,
  private route: ActivatedRoute,
  private fb:FormBuilder 
  )
  {
    this.bulidForm();
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadTodo();
  }
  loadTodo(): void {
    this.todoServices.getTodo(this.id).subscribe(todo => {
      this.todoForm.patchValue({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().substring(0, 10) : null
      });
    });
  }
  bulidForm() {
   this.todoForm=this.fb.group({
    title: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      description: new FormControl(''),
      status: new FormControl(0),
      priority: new FormControl(0),
      dueDate: new FormControl((new Date()).toISOString().split("T")[0])
   
   })
  }
  onSubmit(){
    if (!this.todoForm.valid) {
      return;
    }
    let TodosDto = this.todoForm.value as CreateUpdateTodoDto;
    this.todoServices.createTodo(TodosDto).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/todos');
      }
    });
  }
  back(){
    this.router.navigateByUrl('/todos');
  }
}
