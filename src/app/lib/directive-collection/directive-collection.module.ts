import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDirective } from './datepicker/datepicker.directive';
import { Datepicker2Directive } from './datepicker2/datepicker2.directive';



@NgModule({
  declarations: [
    DatepickerDirective,
    Datepicker2Directive
  ],
  imports: [
    CommonModule
  ],
  exports:[DatepickerDirective,Datepicker2Directive]
})
export class DirectiveCollectionModule { }
