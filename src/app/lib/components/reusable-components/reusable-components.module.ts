import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerSideTableComponent } from './server-side-table/server-side-table.component';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    ServerSideTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[TableComponent,FormComponent,ServerSideTableComponent]
})
export class ReusableComponentsModule { }
