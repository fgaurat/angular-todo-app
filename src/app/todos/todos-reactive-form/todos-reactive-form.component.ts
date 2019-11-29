import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodosService } from '../shared/services/todos.service';
import { Todo } from '../shared/models/todo';
import { MessageBusService } from 'src/app/shared/message-bus.service';

@Component({
  selector: 'app-todos-reactive-form',
  templateUrl: './todos-reactive-form.component.html',
  styleUrls: ['./todos-reactive-form.component.css']
})
export class TodosReactiveFormComponent implements OnInit {

  todoForm = this.fb.group({
    title: [''],
    dueDate: ['']
  });

  constructor(
    private fb: FormBuilder,
    private todoService: TodosService,
    private messageService: MessageBusService
  ) { }

  ngOnInit() {
  }

  submit() {
    const todo: Todo = {
      ...this.todoForm.value,
      completed: false,
      dueDate: this.todoForm.value.dueDate.getTime()
    };


    this.todoService.save(todo).subscribe(_ => {
      this.messageService.dispatch({ type: 'NEW_TODO' });
    });
  }


}
