import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { Todo } from '../shared/models/todo';
import { TodosService } from '../shared/services/todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, filter } from 'rxjs/operators';
import { MessageBusService } from 'src/app/shared/message-bus.service';
import { Action } from 'src/app/shared/action';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit, AfterViewInit {

  todos$: Observable<Todo[]>;
  todos: Todo[];
  displayedColumns = ['title', 'dueDate', 'completed', 'actions'];


  constructor(
    private todosService: TodosService,
    private snackBar: MatSnackBar,
    private messageService: MessageBusService
  ) { }

  ngOnInit() {
    // Rudy



    const obs1$ = this.messageService.bus$.pipe(
      filter((action: Action) => action.type === 'INIT_TODO')
    );


    const obs2$ = this.messageService.bus$.pipe(
      filter((action: Action) => action.type === 'NEW_TODO')
    );

    const obs3$ = this.messageService.bus$.pipe(
      filter((action: Action) => action.type === 'DELETE_TODO')
    );

    // Rudy
    this.todos$ = merge(obs1$, obs2$, obs3$).pipe(
      switchMap(_ => this.todosService.findAll())
    );

    // Nadia
    merge(obs1$, obs2$, obs3$).pipe(
      switchMap(_ => this.todosService.findAll())
    ).subscribe(todos => this.todos = todos);


  }

  ngAfterViewInit() {
    this.messageService.dispatch({ type: 'INIT_TODO' });
  }


  changeState(todo: Todo) {
    this.todosService.save(todo).subscribe((returnTodo: Todo) => {

      this.snackBar.open('changeState successful', null, {
        duration: 2000,
      });
      console.log(returnTodo);
    });
  }

  delete(todo: Todo) {
    // Rudy
    this.todosService.delete(todo).subscribe(_ => this.messageService.dispatch({ type: 'DELETE_TODO' }));

    // Nadia
    this.todosService.delete(todo).pipe(
      switchMap(_ => this.todosService.findAll())
    ).subscribe(todos => this.todos = todos);


  }
}
