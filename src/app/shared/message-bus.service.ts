import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  private bus = new Subject<Action>();
  public bus$ = this.bus.asObservable();

  constructor() { }

  dispatch(action: Action) {
    this.bus.next(action);
  }
}
