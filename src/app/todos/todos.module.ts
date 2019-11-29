import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosFormComponent } from './todos-form/todos-form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosReactiveFormComponent } from './todos-reactive-form/todos-reactive-form.component';



@NgModule({
  declarations: [TodosListComponent, TodosFormComponent, TodosReactiveFormComponent],
  exports: [TodosListComponent, TodosFormComponent, TodosReactiveFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class TodosModule { }
