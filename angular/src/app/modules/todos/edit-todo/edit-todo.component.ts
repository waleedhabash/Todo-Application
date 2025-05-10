import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosDto, TodoService } from 'src/app/proxy/todos';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
  imports: [ ReactiveFormsModule],
})
export class EditTodoComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  todoId: string;
  todo: TodosDto;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      status: [0],
      priority: [0],
      dueDate: [null]
    });

    this.loadTodo();
  }

  get f() { return this.editForm.controls; }

  loadTodo(): void {
    this.todoService.getTodo(this.todoId).subscribe({
      next: (todo) => {
        this.todo = todo;
        this.editForm.patchValue({
          title: todo.title,
          description: todo.description,
          status: todo.status,
          priority: todo.priority,
          dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : null
        });
      },
      error: (err) => {
        console.error('Error loading todo', err);
        // Handle error (show toast, redirect, etc.)
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    const updatedTodo: TodosDto = {
      ...this.todo,
      ...this.editForm.value,
      dueDate: this.editForm.value.dueDate ? new Date(this.editForm.value.dueDate) : null,
      lastModifiedDate: new Date()

    };

    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        
        this.router.navigateByUrl('/todos');
      },
      error: (err) => {
        console.error('Error updating todo', err);
        // Handle error
      }
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/todos');
  }
}