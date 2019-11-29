import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosReactiveFormComponent } from './todos-reactive-form.component';

describe('TodosReactiveFormComponent', () => {
  let component: TodosReactiveFormComponent;
  let fixture: ComponentFixture<TodosReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
