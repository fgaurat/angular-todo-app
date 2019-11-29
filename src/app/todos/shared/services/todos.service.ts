import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url_todos);
  }

  save(todo: Todo): Observable<Todo> {

    let ret: Observable<Todo>;

    if ('id' in todo) {
      ret = this.http.put(environment.url_todos, todo, this.httpOptions).pipe(
        map(_ => todo)
      );
    } else {
      ret = this.http.post(environment.url_todos, todo, this.httpOptions).pipe(
        map(_ => todo)
      );
    }

    return ret;
  }

  delete(todo: Todo): Observable<any> {
    const url = `${environment.url_todos}/${todo.id}`;
    return this.http.delete(url);
  }


}
